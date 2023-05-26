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
                  src={ image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR086Zb6H2WMJadyKUFDK12NuMTAVm8dKV_WjtbdSAXlnzz1Z88aw9crG7zZFH8nkocjyY&usqp=CAU' }
                  alt="foto-do-perfil"
                />
                <Link to="/profile/edit" className="link-perfil">Editar perfil</Link>
              </div>
              <div className="name-email-description">

                <h4 className="nome2-profile">{name || 'nome:'}</h4>
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
