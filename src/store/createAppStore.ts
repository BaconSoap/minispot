import { applyMiddleware, compose, createStore } from 'redux';
import { createRootReducer } from './createRootReducer';

// redux enhances the existing react namespace in a way that breaks typings as of
// 2018-05-15. using require avoids importing the type defs and breaking compilation
// tslint:disable-next-line:no-var-requires
const thunk = require('redux-thunk').default;

export const createAppStore = () => {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(createRootReducer(), composeEnhancers(applyMiddleware(thunk)));
};
