import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
