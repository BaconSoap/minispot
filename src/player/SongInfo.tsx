import { AppState } from 'AppState';
import * as React from 'react';
import { connect } from 'react-redux';
import { TrackInfo } from './PlayerState';

export type SongInfoProps = {
  currentTrack: TrackInfo | null;
};

export class SongInfo extends React.PureComponent<SongInfoProps> {
  public render() {
    let track = this.props.currentTrack;
    if (!track) {
      track = {
        album: 'Blackstar',
        artist: 'David Bowie',
        imageUri: 'https://i.scdn.co/image/de1c3166528adc912b746cac1f28ccd501801218',
        name: 'Blackstar'
      };
    }

    return (
      <div className='song-info'>
        <div className='song-info__album-art'
          style={{ backgroundImage: `url(${track.imageUri})` }}
        />
        <div className='song-info__song'>
          {track.name}
        </div>
        <div className='song-info__album'>{track.album}</div>
        <div className='song-info__artist'>{track.artist}</div>
      </div>
    );
  }
}

const mapState = ({ player }: AppState): SongInfoProps => ({
  currentTrack: player.currentTrackInfo
});

export const SongInfoContainer = connect(mapState)(SongInfo);
