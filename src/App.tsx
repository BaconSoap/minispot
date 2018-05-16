import { AuthControllerContainer } from 'authentication/AuthController';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { createAppStore } from './store/createAppStore';
import { PlayerContainer } from './store/Player';

class App extends React.Component {
  public render() {
    return (
      <Provider store={createAppStore()}>
        <BrowserRouter>
          <div className='App'>
            <header className='App-header'>
              <h1 className='App-title'>MiniSpot</h1>
            </header>
            <PlayerContainer />
            <AuthControllerContainer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
