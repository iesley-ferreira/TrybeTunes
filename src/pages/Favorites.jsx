import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import '../styles/favorites.css';

class Favorites extends React.Component {
  state = {
    loading: true,
    list: [],
  };

  async componentDidMount() {
    const list = await getFavoriteSongs();
    this.setState({ list, loading: false });
  }

  removeFavorite = (trackInfo) => {
    const { list } = this.state;
    const newList = list.filter((music) => music.trackId !== trackInfo.trackId);
    this.setState({ list: newList });
  };

  render() {
    const { list, loading } = this.state;

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
              {list.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackInfo={ music }
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.trackViewUrl }
                  removeFavorite={ this.removeFavorite }
                />
              ))}
            </div>
          </div>
        )
    );
  }
}

export default Favorites;
