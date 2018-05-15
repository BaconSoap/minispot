import { applyMiddleware, compose, createStore } from 'redux';
import { createRootReducer } from './createRootReducer';
// tslint:disable-next-line:no-var-requires
const thunk = require('redux-thunk').default;

export const createAppStore = () => {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(createRootReducer(), composeEnhancers(applyMiddleware(thunk)));
};
