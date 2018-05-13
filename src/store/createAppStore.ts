import { applyMiddleware, compose, createStore } from 'redux';
import { createRootReducer } from './createRootReducer';


export const createAppStore = () => {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(createRootReducer(), composeEnhancers(applyMiddleware()));
};
