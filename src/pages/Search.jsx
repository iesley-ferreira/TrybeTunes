import React from 'react';
import Header from '../components/Header';
import '../styles/search.css';

class Search extends React.Component {
  state = {
    search: '',
    activeBtn: true,
  };

  handleSearch = (event) => {
    const { value } = event.target;
    const active = value.length >= 2;
    if (!active) {
      this.setState({
        activeBtn: true,
      });
    } else {
      this.setState({
        activeBtn: false,
      });
    }
  };

  render() {
    const { activeBtn } = this.state;
    return (
      <div data-testid="page-search" id="page">
        <Header />
        <form>

          <label htmlFor="search-input">
            <input
              placeholder="Digite a sua pesquisa"
              data-testid="search-artist-input"
              type="text"
              name="search-input"
              onChange={ this.handleSearch }
            />
          </label>

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ activeBtn }
            onClick={ this.search }
          >
            Pesquisar

          </button>

        </form>
      </div>
    );
  }
}

export default Search;
