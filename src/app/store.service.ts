import { Injectable } from '@angular/core';
import { Store, createStore, Action } from 'redux';
import { CharacterActions, CharacterActionType } from './actions/character-actions.enum';
import { Character } from './reducer/character';
import { reducer, CharacterState } from './reducer/reducer';
import { StarWarsApiService } from './star-wars-api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private store: Store<CharacterState, CharacterActions>;

  constructor(private swapi: StarWarsApiService) {
    this.store = createStore(reducer);
    this.swapi.getCharacters().subscribe(
      (character: any) => {
        this.dispatch({
          type: CharacterActionType.addAll,
          characters: [character]
        });
      }
    );
  }

  public dispatch(action: CharacterActions) {
    return this.store.dispatch(action);
  }

  public getState(): CharacterState {
    return this.store.getState();
  }

  public subscribe(subscription) {
    return this.store.subscribe(subscription);
  }
}
