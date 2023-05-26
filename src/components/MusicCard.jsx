import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import '../styles/musicCard.css';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    loading: false,
  };

  async componentDidMount() {
    this.getFavorite();
  }

  getFavorite = () => {
    const {
      trackInfo,
      favList,
    } = this.props;

    const isFavorite = favList
      .some(({ trackId }) => trackInfo.trackId === trackId);

    this.setState({
      isFavorite,
    });
  };

  handleFavorite = () => {
    const {
      trackInfo,
      changeFavorite,
    } = this.props;
    console.log(changeFavorite);
    changeFavorite(trackInfo);
    this.getFavorite();
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
  favList: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  })).isRequired,
  changeFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
