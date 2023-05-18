import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import '../styles/album.css';

class Album extends React.Component {
  state = {
    loading: true,
    albumInfo: [],
    albumMusics: [],
  };

  componentDidMount() {
    this.getMusicsInfo();
  }

  getMusicsInfo = async () => {
    this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({
      loading: false,
      albumInfo: album[0],
      albumMusics: album,
    });
  };

  render() {
    const { loading, albumInfo, albumMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Carregando /> : (
          <section className="album-principal">
            <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
            <h4 data-testid="album-name">{ albumInfo.collectionName }</h4>
            <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />

            <div className="musics">
              {
                albumMusics.filter((_, index) => index !== 0)
                  .map((music) => (
                    <MusicCard
                      key={ music.trackId }
                      trackId={ music.trackId }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                      trackInfo={ music }
                    />
                  ))

              }
            </div>
          </section>
        )}
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
