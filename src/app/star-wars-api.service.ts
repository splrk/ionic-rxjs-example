import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from './reducer/character';
import { CharacterImages, defaultImage } from './character-images';
import { from } from 'rxjs';
import { switchMap, mergeMap, map, reduce, mergeScan, tap, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  constructor(private httpClient: HttpClient) {}

  getCharacters() {
    return this.httpClient.get('https://swapi.dev/api/people/')
      .pipe(
        // Get the first result and ignre everyting else - swich to a new observable for each characer
        switchMap((result: any) => from(result.results)),
        
        // return the result of the inner observable for each character
        mergeMap((character: any) => {
  
          // Inner observable based off films
          return from(character.films).pipe(

            // return the result of each the requests for each film into the next observable
            mergeMap((filmURL: string) => this.httpClient.get(filmURL)),

            // Only use the title
            map((film: any) => film.title),

            // Combine all titles into an array and only use the result value
            reduce((movieTitles, title) => [...movieTitles, title], []),

            // add the movie Titles to the character object and return that as the value for this inner observable
            map(movieTitles => ({ ...character, movieTitles }))
          );
        }),
        
        // Log the character for sanity sake
        tap((c) => { console.log(c); })
      );
  }

  getCharacterInfo(id: number): Promise<Character> {
    // TODO: Return Character Information.  Delete the following and return a result from an http reques
    return this.httpClient.get(`https://swapi.dev/api/characters/${id}`)
      .toPromise() as Promise<Character>;
  }

  getCharacterImage(url: string): string {
    return CharacterImages[url] || defaultImage;
  }
}
