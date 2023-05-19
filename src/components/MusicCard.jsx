import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    loading: false,
  };

  // funcao que remove dos favoritos
  // async remove(prevProps) {
  //   const { trackId, trackInfo } = this.props;
  //   const removeSong = await removeSong(trackInfo);
  // }

  // funcao que favorita
  async componentDidMount() {
    const favList = await getFavoriteSongs();
    console.log(favList);
    const { trackId } = this.props;
    this.setState({
      isFavorite: favList.some((music) => music.trackId === trackId),
    });
  }

  handleFavorite = async ({ target }) => {
    const { trackInfo } = this.props;
    this.setState({
      loading: true,
      isFavorite: target.checked,
    });
    await addSong(trackInfo);
    this.setState({ loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, loading } = this.state;
    if (loading) return <Carregando />;
    return (
      <div className="music-card">
        <h2>{ trackName }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="">
          Favorita
          <input
            type="checkbox"
            onChange={ this.handleFavorite }
            checked={ isFavorite }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackInfo: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;