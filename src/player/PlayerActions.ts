import { ActionWithoutPayload } from 'helpers';
import { PLAYER_READY } from './PlayerConstants';

export const playerReady = (): ActionWithoutPayload => ({
  type: PLAYER_READY
});
