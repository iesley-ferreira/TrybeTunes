/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AlbumsCard from "../components/AlbumsCard";
import CanvasLoader from "../components/CanvasLoader";
import Header from "../components/Header";
import SuggestionsCard from "../components/SuggestionsCard";
import {
  useAlbunsList,
  useArtist,
  useLoading,
  useTopArtists,
} from "../context/TrybeTunesContext";
import searchAlbumsAPI from "../services/searchAlbumsAPI";
import searchArtistsAPI from "../services/searchArtistsAPI";
import "./styles/search.css";

const SearchComponentPage = () => {
  const [loading, setLoading] = useLoading(true);
  const [albunsList, setAlbunsList] = useAlbunsList([]);
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [topArtists, setTopArtists] = useTopArtists([]);
  const [artist, setArtist] = useArtist();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const artists = await searchArtistsAPI();
        setTopArtists(artists);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();

    setTopArtists(null);

    setArtist(search);
    setLoading(true);
    try {
      const albunsList = await searchAlbumsAPI(search);
      setAlbunsList(albunsList);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    const condition = value.length < 2;
    setDisabled(true);

    setSearch(value);
    setDisabled(condition);
  };

  return (
    <div className='page-search-container' data-testid='page-search'>
      <Header />
      <div className='page-search'>
        <form className='form-search'>
          <label className='label-search' htmlFor='search-input'>
            <input
              className='input-search'
              spellCheck='false'
              placeholder='Search your favorite artist'
              data-testid='search-artist-input'
              type='text'
              value={search}
              onChange={handleChange}
            />
          </label>

          <button
            className='button-search'
            type='submit'
            data-testid='search-artist-button'
            disabled={disabled}
            onClick={handleClick}
          >
            Search
          </button>
        </form>

        <main className='main-search'>
          {loading ? (
            <div className='canvasLoader__container'>
              <CanvasLoader id='canvas' width='250' height='250' />
            </div>
          ) : topArtists && topArtists.length !== 0 ? (
            <SuggestionsCard />
          ) : (
            <AlbumsCard />
          )}
          {!loading && artist.length > 0 && albunsList.length === 0 && (
            <div className='artista-nao-encontrado'>
              <p>Nenhum álbum foi encontrado</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchComponentPage;
