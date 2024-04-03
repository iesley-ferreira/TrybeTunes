import React from "react";
import { Link } from "react-router-dom";
import { useAlbunsList, useArtist } from "../context/TrybeTunesContext";
import "./styles/AlbumsCard.css";

const AlbumsCard = () => {
  const [albunsList, setAlbunsList] = useAlbunsList([]);
  const [artist, setArtist] = useArtist();
  return (
    albunsList &&
    albunsList.length > 0 && (
      <div className='principal'>
        <h3 className='resultado-pesquisa'>{`Albuns de: ${artist}`}</h3>
        <ul className='album-list'>
          {albunsList.map(({ collectionId, artworkUrl100, collectionName }) => (
            <li key={collectionId} className='album-box'>
              <Link
                className='link-album'
                to={`album/${collectionId}`}
                data-testid={`link-to-album-${collectionId}`}
              >
                <img src={artworkUrl100} alt={collectionName} className='album-img' />
                <h4>{collectionName}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default AlbumsCard;
