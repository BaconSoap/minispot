import { PlayerState } from 'player/PlayerState';
import { UserState } from 'user/UserState';
import { AuthState } from './authentication/AuthState';

export type AppState = {
  authentication: AuthState;
  player: PlayerState;
  user: UserState;
};
