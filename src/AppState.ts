import { PlayerState } from 'player/PlayerState';
import { AuthState } from './authentication/AuthState';

export type AppState = {
  authentication: AuthState;
  player: PlayerState;
};
