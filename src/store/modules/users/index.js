import { ajax } from 'rxjs/ajax';
import {map, mergeMap} from 'rxjs/operators';
import {ofType} from 'redux-observable';

// action names
const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

// action creators
export const fetchUser = username => ({ type: FETCH_USER, payload: username });
const fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload });

// epic
export const fetchUserEpic = action$ => action$.pipe(
    ofType(FETCH_USER),
    mergeMap(action =>
        ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${action.payload}`).pipe(
            map(response => fetchUserFulfilled(response))
        )
    )
);

export const usersByUsername = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_FULFILLED:
            return {
                ...state,
                [action.payload.username]: action.payload
            };

        default:
            return state;
    }
};