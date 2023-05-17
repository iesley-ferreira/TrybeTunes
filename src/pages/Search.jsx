import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  state = {
    disabled: true,
    artist: '',
    albunsList: [],
    loading: false,
    search: '',
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      artist: search,
      search: '',
      loading: true,
    });
    const albunsList = await searchAlbumsAPI(search);
    this.setState({
      albunsList,
      loading: false,
    });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      disabled: true,
    });
    if (value.length >= 2) {
      this.setState({
        search: value,
        disabled: false,
      });
    }
  };

  render() {
    const { disabled, albunsList, loading, artist } = this.state;
    if (loading) {
      return <Carregando />;
    }

    return (
      <div data-testid="page-search" id="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              placeholder="Digite a sua pesquisa"
              data-testid="search-artist-input"
              type="text"
              name="search"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>

        <main>
          {albunsList.length > 0 && (
            <div className="principal">
              <h3>{`Resultado de álbuns de: ${artist}`}</h3>
              <ul className="album-list">
                {albunsList.map(
                  ({ collectionId, artworkUrl100, collectionName, artistName }) => (
                    <li key={ collectionId } className="album-box">
                      <Link
                        className="link-album"
                        to={ `album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        Mais informações
                      </Link>
                      <img
                        src={ artworkUrl100 }
                        alt={ collectionName }
                        className="album-img"
                      />
                      <p>{collectionName}</p>
                      <p>{artistName}</p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {artist.length > 0 && albunsList.length === 0 && (
            <p>Nenhum álbum foi encontrado</p>
          )}
        </main>

      </div>
    );
  }
}

export default Search;
