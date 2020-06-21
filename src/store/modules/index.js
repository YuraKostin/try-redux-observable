import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { fetchUserEpic, usersByUsername } from './users';

export const rootEpic = combineEpics(fetchUserEpic);

export const rootReducer = combineReducers({
  usersByUsername,
});
