import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { People } from './models/people.model';

export interface AppState {
    peoples: PeoplesState;
}

export interface PeoplesState {
    allPeoplesLoaded: boolean;
    data: People[] | null;
}

const intialState = {
    allPeoplesLoaded: false,
    data: null
}

export class ActionParent implements Action {
    type: any;
    payload: any;
}

export enum ActionTypes {
    LoadPeoplesRequested = '[Peoples API] Load Peoples Requested',
    LoadPeoples = '[Peoples API] Load Peoples'
}

export class LoadPeoplesRequested implements Action {
    readonly type = ActionTypes.LoadPeoplesRequested;
};

export class LoadPeoples implements Action {
    readonly type = ActionTypes.LoadPeoples;
    constructor(public payload: People[]) { }
}

export type PeopleActions = LoadPeoplesRequested | LoadPeoples;

export function peopleReducer(state = intialState, action: Action) {
    switch (action.type) {
        case ActionTypes.LoadPeoples:
            return {
                allPeoplesLoaded: true,
                data: action.payload
            };
        default:
            return state;
    }
}

export const getPeoples = createFeatureSelector<AppState, PeoplesState>('peoples');

export const getAllPeoples = createSelector(getPeoples, state => state.data);
export const getAllPeoplesLoaded = createSelector(getPeoples, state => state.allPeoplesLoaded);
