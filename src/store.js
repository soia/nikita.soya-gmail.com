/* eslint-disable import/no-cycle */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import refreshToken from './helpers/jwt';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(refreshToken, thunkMiddleware, loggerMiddleware),
);

export default store;
