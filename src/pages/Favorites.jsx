import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import '../styles/favorites.css';

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
    this.setState({
      loading: true,
    }, async () => {
      const { albumFavorites } = this.state;
      const isFavoriteSong = albumFavorites
        .some(({ trackId }) => track.trackId === trackId);

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
    });
  };

  render() {
    const {
      albumFavorites,
      loading,
    } = this.state;

    return (
      loading ? (
        <Carregando />)
        : (
          <div data-testid="page-favorites">
            <Header />
            <div className="header-favoritos">
              <h1>Favoritos</h1>
            </div>
            <div className="list-favorites">
              {albumFavorites.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  changeFavorite={ this.changeFavorite }
                  trackInfo={ music }
                  favList={ albumFavorites }
                />
              ))}
            </div>
          </div>
        )
    );
  }
}

export default Favorites;
