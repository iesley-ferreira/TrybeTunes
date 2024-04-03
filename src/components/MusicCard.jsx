/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import PropTypes from "prop-types";
import React from "react";
import { useLoading } from "../context/TrybeTunesContext";
import CanvasLoader from "./CanvasLoader";
import Liked from "./Liked";
import NoLiked from "./NoLiked";
import "./styles/musicCard.css";

function MusicCard(props) {
  const { trackName, previewUrl, trackId, trackInfo, favList, changeFavorite } = props;
  const [isFavorite, setFavorite] = React.useState(false);
  const [loading, setLoading] = useLoading(false);

  React.useEffect(() => {
    getFavorite();
  }, []);

  const getFavorite = () => {
    const isFavorite = favList.some(({ trackId }) => trackInfo.trackId === trackId);
    setFavorite(isFavorite);
  };

  const handleFavorite = () => {
    changeFavorite(trackInfo);
    getFavorite();
  };

  if (loading) return <CanvasLoader />;

  return (
    <div className='music-card-container'>
      <div className='music-card'>
        <div className='title-song'>
          <h2>{trackName}</h2>
          <label className='switch-favorito'>
            <div className='switch-wrapper'>
              <input
                type='checkbox'
                onChange={handleFavorite}
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
