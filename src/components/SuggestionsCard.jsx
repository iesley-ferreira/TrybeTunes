/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import agulha from "../assets/agulha-toca-disco.png";
import arrowSvg from "../assets/arrow.svg";
import {
  useAlbunsList,
  useArtist,
  useLoading,
  useTopArtists,
} from "../context/TrybeTunesContext";
import searchAlbumsAPI from "../services/searchAlbumsAPI";
import "./styles/SuggestionsCard.css";

const SuggestionsCard = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [albunsList, setAlbunsList] = useAlbunsList([]);
  const [loading, setLoading] = useLoading(false);
  const [topArtists, setTopArtists] = useTopArtists([]);
  const [artist, setArtist] = useArtist();

  const handleClick = async (artistName) => {
    try {
      setLoading(true);
      const albunsListData = await searchAlbumsAPI(artistName);
      setAlbunsList([...albunsListData]);
      setTopArtists([]);
      setArtist(artistName);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (cardId) => {
    setHoveredCardId(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  return (
    <div className='topArtists__card__container'>
      <h3>
        {`Artistas Recomendados`}
        <span>
          <img src={arrowSvg} alt='arrow' />
        </span>
      </h3>

      <div className='card-container'>
        {topArtists.map((artist) => (
          <div
            className='card'
            key={artist.artistId}
            onMouseEnter={() => handleMouseEnter(artist.artistId)}
            onMouseLeave={handleMouseLeave}
          >
            <div className='card-image' onClick={() => handleClick(artist.artistName)}>
              <img
                className={`rotating-image ${hoveredCardId === artist.artistId ? "hovered-image" : ""}`}
                src={artist.artworkUrl100}
                alt={artist.artistName}
              />
              {hoveredCardId === artist.artistId && (
                <img className='needle-image' src={agulha} alt='Agulha' />
              )}
            </div>
            <div className='text__content'>
              <h3>{artist.artistName}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsCard;
