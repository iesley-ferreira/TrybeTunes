import React from "react";
import { Link } from "react-router-dom";
import CanvasLoader from "../components/CanvasLoader";
import Header from "../components/Header";
import { getUser } from "../services/userAPI";
import "./styles/profile.css";
import perfilImg from "/public/user2.png";

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
      <div className='page-perfil' data-testid='page-profile'>
        <Header />
        {loading ? (
          <div className='canvasLoader__container'>
            <CanvasLoader id='canvas' width='250' height='250' />
          </div>
        ) : (
          <div className='main-perfil'>
            <div className='img-link'>
              <img
                className='img-perfil'
                data-testid='profile-image'
                src={image || perfilImg}
                alt='foto-do-perfil'
              />
              <div className='p-edit'>
                <h1>{name}</h1>
                <Link to='/profile/edit' className='link-perfil'>
                  Editar perfil
                </Link>
              </div>
            </div>
            <div className='name-email-description'>
              <h4 className='nome2-profile'>{name || "nome:"}</h4>
              <h4>{email || "email:"}</h4>
              <h4>{description || "descrição:"}</h4>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
