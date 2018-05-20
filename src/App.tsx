import { AppState } from 'AppState';
import { AuthControllerContainer } from 'authentication/AuthController';
import { Player } from 'player/Player';
import { playerReady } from 'player/PlayerActions';
import { SpotifyPlaybackManagerContainer } from 'player/SpotifyPlaybackManager';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from 'redux';
import { createAppStore } from 'store/createAppStore';
import './App.scss';

class App extends React.Component {
  private store: Store<AppState>;

  public constructor(p: {}) {
    super(p);

    this.store = createAppStore();

    window.onSpotifyWebPlaybackSDKReady = this.onSpotifyReady.bind(this);
  }

  public render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <div className='App'>
            <header className='App-header'>
              <h1 className='App-title'>MiniSpot</h1>
            </header>
            <Player />
            <SpotifyPlaybackManagerContainer />
            <AuthControllerContainer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }

  private onSpotifyReady() {
    this.store.dispatch(playerReady());
  }

}

export default App;
