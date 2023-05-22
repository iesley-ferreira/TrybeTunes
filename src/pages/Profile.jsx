import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import '../styles/profile.css';

class Profile extends React.Component {
  state = {
    loading: true,
    user: {},
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    console.log(userInfo);
    this.setState({
      loading: false,
      user: userInfo,
    });
  }

  render() {
    const { loading, user } = this.state;
    const { name, email, image, description } = user;
    return (
      <div data-testid="page-profile" className="page-perfil">
        <Header />
        {
          loading ? <Carregando /> : (
            <div className="main-perfil">
              <h1>
                <i className="fa-solid fa-user" />
                &nbsp;&nbsp;&nbsp;
                {name}
              </h1>
              <div className="img-link">
                <img
                  className="img-perfil"
                  data-testid="profile-image"
                  src={ image || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' }
                  alt="foto-do-perfil"
                />
                <Link to="/profile/edit" className="link-perfil">Editar perfil</Link>
              </div>
              <div className="name-email-description">

                <h4>{name || 'nome:'}</h4>
                <h4>{email || 'email:'}</h4>
                <h4>{description || 'descrição:'}</h4>
              </div>
            </div>
          )
        }

      </div>
    );
  }
}

export default Profile;
