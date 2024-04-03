import PropTypes from "prop-types";
import React from "react";
import CanvasLoader from "../components/CanvasLoader";
import Header from "../components/Header";
import MusicCard from "../components/MusicCard";
import { addSong, getFavoriteSongs, removeSong } from "../services/favoriteSongsAPI";
import getMusics from "../services/musicsAPI";
import "./styles/album.css";

class Album extends React.Component {
  state = {
    loading: true,
    albumInfo: {},
    albumMusics: [],
    albumFavorites: [],
  };

  componentDidMount() {
    this.getMusicsInfo();
  }

  getMusicsInfo = async () => {
    this.setState({ loading: true });

    const {
      match: {
        params: { id },
      },
    } = this.props;
    const album = await getMusics(id);
    const albumFavorites = await getFavoriteSongs();

    this.setState({
      loading: false,
      albumInfo: album[0],
      albumMusics: album.slice(1),
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
    const { loading, albumInfo, albumMusics, albumFavorites } = this.state;

    return (
      <div className='page-album-container' data-testid='page-album'>
        <Header />
        <main className='main-album'>
          {loading ? (
            <div className='canvasLoader__container'>
              <CanvasLoader id='canvas' width='250' height='250' />
            </div>
          ) : (
            <section className='album-principal'>
              <div className='top-principal-album'>
                <div className='display-top'>
                  <h2 data-testid='artist-name'>{albumInfo.artistName}</h2>
                  <h4 data-testid='album-name'>{albumInfo.collectionName}</h4>
                </div>
                <div className='img-top-album'>
                  <img src={albumInfo.artworkUrl100} alt={albumInfo.collectionName} />
                </div>
              </div>
              <div className='list-musics'>
                {albumMusics.map((music) => (
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
