import React from "react";
import CanvasLoader from "../components/CanvasLoader";
import Header from "../components/Header";
import MusicCard from "../components/MusicCard";
import { addSong, getFavoriteSongs, removeSong } from "../services/favoriteSongsAPI";
import "./styles/favorites.css";

class Favorites extends React.Component {
  state = {
    loading: true,
    albumFavorites: [],
  };

  componentDidMount() {
    this.getMusicsInfo();
  }

  getMusicsInfo = async () => {
    this.setState({ loading: true });

    const albumFavorites = await getFavoriteSongs();

    this.setState({
      loading: false,
      albumFavorites,
    });
  };

  changeFavorite = (track) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { albumFavorites } = this.state;
        const isFavoriteSong = albumFavorites.some(
          ({ trackId }) => track.trackId === trackId
        );

        if (isFavoriteSong) {
          await removeSong(track);
        } else {
          await addSong(track);
        }

        const stateFavoriteSongs = await getFavoriteSongs();

        this.setState({
          albumFavorites: stateFavoriteSongs,
          loading: false,
        });
      }
    );
  };

  render() {
    const { albumFavorites, loading } = this.state;

    return (
      <div className='page-favorites-container'>
        <Header />
        <main className='main-favorites'>
          {loading ? (
            <div className='canvasLoader__container'>
              <CanvasLoader id='canvas' width='250' height='250' />
            </div>
          ) : (
            <section data-testid='favorites-principal'>
              <div className='top-principal-favorites'>
                <h1>Favoritos</h1>
              </div>
              <div className='list-favorites'>
                {albumFavorites.map((music) => (
                  <MusicCard
                    key={music.trackId}
                    trackId={music.trackId}
                    trackName={music.trackName}
                    previewUrl={music.previewUrl}
                    changeFavorite={this.changeFavorite}
                    trackInfo={music}
                    favList={albumFavorites}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default Favorites;
