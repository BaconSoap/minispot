import { AppState } from 'AppState';
import { AuthControllerContainer } from 'authentication/AuthController';
import { DebugInfoContainer } from 'components/DebugInfo';
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
          <div className='app'>
            <header className='app-header'>
              <div><h1>MiniSpot</h1></div>
              <AuthControllerContainer />
            </header>
            <Player />
            <DebugInfoContainer />
            <SpotifyPlaybackManagerContainer />
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
