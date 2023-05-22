import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import '../styles/musicCard.css';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    loading: false,
  };

  async componentDidMount() {
    const favList = await getFavoriteSongs();
    const { trackId } = this.props;
    this.setState({
      isFavorite: favList.some((music) => music.trackId === trackId),
    });
  }

  handleFavorite = async ({ target }) => {
    console.log(target.checked);
    const { trackInfo, removeFavorite } = this.props;

    this.setState({
      loading: true,
      isFavorite: target.checked,
    });
    await addSong(trackInfo);
    this.setState({ loading: false });

    if (target.checked === false) {
      this.setState({
        loading: true,
      });
      await removeSong(trackInfo);
      this.setState({
        loading: false,
      });
    }
    removeFavorite(trackInfo);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, loading } = this.state;
    if (loading) return <Carregando />;
    const liked = <i className="fa-sharp fa-solid fa-star" />;
    const noLiked = <i className="fa-regular fa-star" />;
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
        <label className="switch-favorito">
          <span className="switch-text">Favorita</span>
          <div className="switch-wrapper">
            <input
              type="checkbox"
              onChange={ this.handleFavorite }
              checked={ isFavorite }
              data-testid={ `checkbox-music-${trackId}` }

            />
            { isFavorite ? liked : noLiked }
          </div>
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
  removeFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
