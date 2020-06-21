import { ajax } from 'rxjs/ajax';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { empty, of } from 'rxjs';

// action names
const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

// action creators
export const fetchUser = (username, options) => ({
  type: FETCH_USER,
  payload: { username, options },
});

const fetchUserFulfilled = (payload) => ({
  type: FETCH_USER_FULFILLED,
  payload,
});

const fetchUserError = (payload) => ({
  type: FETCH_USER_ERROR,
  payload,
});

// epic
export const fetchUserEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_USER),
    mergeMap((action) => {
      const {
        payload: {
          options: { isEven, userCount },
        },
      } = action;
      const action$ = of(action);

      if (userCount > 10) {
        return empty();
      }

      return isEven ? action$.pipe(delay(3000)) : action$;
    }),
    mergeMap((action) =>
      ajax
        .getJSON(
          `https://jsonplaceholder.typicode.com/users/${action.payload.username}`
        )
        .pipe(
          map((response) => fetchUserFulfilled(response)),
          catchError((error) => {
            console.log('error: ', error);
            return of(fetchUserError(error.message));
          })
        )
    )
  );

export const usersByUsername = (state = { users: {}, error: {} }, action) => {
  switch (action.type) {
    case FETCH_USER_FULFILLED:
      return {
        error: state.error,
        users: {
          ...state.users,
          [action.payload.username]: action.payload,
        },
      };

    case FETCH_USER_ERROR:
      return {
        error: action.payload,
        users: state.users,
      };

    default:
      return state;
  }
};
