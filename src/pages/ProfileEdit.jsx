import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import '../styles/profileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    disabled: true,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    const { name, email, description, image } = userInfo;
    this.setState({
      loading: false,
      name,
      email,
      description,
      image,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateSaveBtn();
  };

  validateSaveBtn = () => {
    const { name, email, description, image } = this.state;
    const nameOk = name.length > 0;
    const descriptionOk = description.length > 0;
    const imgOk = image.length > 0;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const emailOk = email.length > 0 && emailRegex.test(email);
    if (nameOk && descriptionOk && emailOk && imgOk) {
      this.setState({
        disabled: false,
      });
    }
  };

  saveUser = async () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    const user = {
      name,
      email,
      description,
      image,
    };
    await updateUser(user);
    console.log(history);
    history.push('/profile');
  };

  render() {
    const { loading, name, email, description, image, disabled } = this.state;
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        <div className="profileEdit-content">
          {
            loading ? (
              <Carregando />
            ) : (
              <div className="profileEdit-container">
                <h1>Editar perfil</h1>
                <form className="form-container">
                  <label htmlFor="name" className="label-form-profile">
                    Alterar Nome:
                    <br />

                    <input
                      className="input-form-profile"
                      data-testid="edit-input-name"
                      type="text"
                      name="name"
                      id="name"
                      value={ name }
                      placeholder="Digite o seu nome completo"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label htmlFor="email" className="label-form-profile">
                    Email:
                    <br />

                    <input
                      className="input-form-profile"
                      data-testid="edit-input-email"
                      type="email"
                      name="email"
                      id="email"
                      value={ email }
                      placeholder="Digite o seu email"
                      onChange={ this.handleChange }

                    />
                  </label>
                  <label htmlFor="description" className="label-form-profile">
                    Descrição:
                    <br />

                    <input
                      className="input-form-profile"
                      data-testid="edit-input-description"
                      type="text"
                      name="description"
                      id="description"
                      value={ description }
                      placeholder="Digite uma descrição"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label htmlFor="image" className="label-form-profile">
                    Imagem:
                    <br />
                    <input
                      className="input-form-profile"
                      data-testid="edit-input-image"
                      type="text"
                      name="image"
                      id="image"
                      value={ image }
                      placeholder="Digite o URL da sua foto"
                      onChange={ this.handleChange }
                    />
                  </label>
                </form>
                <div className="center-button-profile">
                  <label htmlFor="save">
                    <button
                      className="button-save-profile"
                      type="submit"
                      name="save"
                      id="save"
                      data-testid="edit-button-save"
                      disabled={ disabled }
                      onClick={ this.saveUser }
                    >
                      Salvar
                    </button>
                  </label>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
