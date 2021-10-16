import {combineReducers} from 'redux';

import contactReducer from './contact';

const reducers = {
  contact: contactReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
