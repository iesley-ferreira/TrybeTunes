import PropTypes from "prop-types";
import React from "react";
import Carregando from "./Carregando";
import Liked from "./Liked";
import NoLiked from "./NoLiked";
import "./styles/musicCard.css";

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    loading: false,
  };

  async componentDidMount() {
    this.getFavorite();
  }

  getFavorite = () => {
    const { trackInfo, favList } = this.props;

    const isFavorite = favList.some(({ trackId }) => trackInfo.trackId === trackId);

    this.setState({
      isFavorite,
    });
  };

  handleFavorite = () => {
    const { trackInfo, changeFavorite } = this.props;
    console.log(changeFavorite);
    changeFavorite(trackInfo);
    this.getFavorite();
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, loading } = this.state;
    if (loading) return <Carregando />;

    return (
      <div className='music-card-container'>
        <div className='music-card'>
          <div className='title-song'>
            <h2>{trackName}</h2>
            <label className='switch-favorito'>
              <div className='switch-wrapper'>
                <input
                  type='checkbox'
                  onChange={this.handleFavorite}
                  checked={isFavorite}
                  data-testid={`checkbox-music-${trackId}`}
                />
                {isFavorite ? <Liked /> : <NoLiked />}
              </div>
            </label>
          </div>
          <audio data-testid='audio-component' src={previewUrl} controls>
            <track kind='captions' />O seu navegador não suporta o elemento{" "}
            <code>audio</code>.
          </audio>
        </div>
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
  favList: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
    })
  ).isRequired,
  changeFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
