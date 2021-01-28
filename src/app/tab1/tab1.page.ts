import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { Character } from '../reducer/character';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public characters: Character[];
  public currentCharacter: Character;

  public comments: { [key: string]: string[] } = {};
  public currentComments: string[] = [];

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.characters = Object.values(this.store.getState());
    this.store.subscribe(() => {
      this.characters = Object.values(this.store.getState());
    });

    setTimeout(() => {
      this.currentCharacter.name += '1'
    }, 1000);
  }

  showCharacter(event: Event, character: Character) {
    this.currentCharacter = character;
    if (!this.comments[character.url]) {
      this.comments[character.url] = [];
    }
    this.currentComments = this.comments[character.url];

  }

  addComment(comment) {
    console.log("Comment ", comment);
    if (this.currentCharacter) {
      this.comments[this.currentCharacter.url].push(comment);
    }
  }

  updateCharacterName(ev) {
    this.currentCharacter.name = ev.target.value;
  }

}
