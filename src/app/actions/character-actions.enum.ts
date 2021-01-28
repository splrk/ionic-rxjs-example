import { AnyAction, Action } from 'redux';
import { Character } from '../reducer/character';

export enum CharacterActionType {
    add = 'characters/add',
    remove = 'charactes/remove',
    addAll = 'characters/addAll',
    update = 'characters/update'
}

export interface CharacterAddAllAction extends AnyAction {
    type: CharacterActionType.addAll;
    characters: Character[]
}

export type CharacterActions = CharacterAddAllAction
    | Action<CharacterActionType.add>
    | Action<CharacterActionType.remove>
    | Action<CharacterActionType.update>;
