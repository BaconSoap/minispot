import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { AuthControllerContainer } from './authentication/AuthController';
import { clientId } from './secrets';
import { createAppStore } from './store/createAppStore';

class App extends React.Component {
  public render() {
    return (
      <Provider store={createAppStore()}>
        <BrowserRouter>
          <div className='App'>
            <header className='App-header'>
              <h1 className='App-title'>MiniSpot</h1>
            </header>
            secret: {clientId}
            <AuthControllerContainer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
