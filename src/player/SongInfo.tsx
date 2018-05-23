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
        album: 'Manners',
        artist: 'Passion Pit',
        imageUri: 'https://i.scdn.co/image/3ff9771d1c9f29990b30b52fc6b5ccb02aeac8e9',
        name: 'Little Secrets'
      };
    }

    return (
      <div className='song-info'>
        <div className='song-info__album-art z-index-base'
          style={{ backgroundImage: `url(${track.imageUri})` }}
        />
        <div className='song-info__song z-index-low'>
          {track.name}
        </div>
        <div className='song-info__album z-index-low'>{track.album}</div>
        <div className='song-info__artist z-index-low'>{track.artist}</div>
      </div>
    );
  }
}

const mapState = ({ player }: AppState): SongInfoProps => ({
  currentTrack: player.currentTrackInfo
});

export const SongInfoContainer = connect(mapState)(SongInfo);
