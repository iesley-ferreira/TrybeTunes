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
    const condition = value.length < 2;
    this.setState({
      disabled: true,
    }, () => this.setState({
      search: value,
      disabled: condition,
    }));
  };

  render() {
    const { disabled, albunsList, loading, artist } = this.state;
    if (loading) {
      return <Carregando />;
    }

    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <form className="form-search">
          <label htmlFor="search-input">
            <input
              className="input-search"
              spellCheck="false"
              placeholder="Digite a sua pesquisa"
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChange }
            />
          </label>

          <button
            className="button-search"
            type="submit"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>

        <main className="main-search">
          {albunsList.length > 0 && (
            <div className="principal">
              <h3
                className="resultado-pesquisa"
              >
                {`Resultado de álbuns de: ${artist}`}

              </h3>
              <ul className="album-list">
                {albunsList.map(
                  ({ collectionId, artworkUrl100, collectionName, artistName }) => (
                    <li key={ collectionId } className="album-box">
                      <h4>{collectionName}</h4>
                      <img
                        src={ artworkUrl100 }
                        alt={ collectionName }
                        className="album-img"
                      />
                      <p>{artistName}</p>
                      <Link
                        className="link-album"
                        to={ `album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        Mais informações
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {artist.length > 0 && albunsList.length === 0 && (
            <div className="artista-nao-encontrado">
              <p>Nenhum álbum foi encontrado</p>
            </div>
          )}
        </main>

      </div>
    );
  }
}

export default Search;
