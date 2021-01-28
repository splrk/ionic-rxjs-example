import { Action } from 'redux';
import { Character } from './character';
import { CharacterActionType, CharacterActions, CharacterAddAllAction } from '../actions/character-actions.enum';

export type CharacterState = {[key: number]: Character};

const initialState: CharacterState = {};

export function reducer(
    currentState: CharacterState = {},
    action: CharacterActions
): CharacterState {
    let newState: CharacterState = {};
    Object.assign(newState, currentState);

    switch (action.type) {
        case CharacterActionType.add:
            // TODO: Add character to the state
            break;
        case CharacterActionType.remove:
            // TODO: remove character from the state
            break;
        case CharacterActionType.addAll:
            // TODO: add a list of characters to the state
            for(let character of action.characters) {
                let match = character.url.match(/^https?:\/\/swapi\.dev\/api\/[^/]*\/(\d+)\/?$/);
                let id = 0;
                if (match) {
                    console.log(match);
                    id = Number.parseInt(match[1], 10);
                }

                newState[id] = character;
            };
            break;
        case CharacterActionType.update:
            // TODO: update an existing character in the state
            break;
        default:
            newState = currentState;
    }
    return newState;
}