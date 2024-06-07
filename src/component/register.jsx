import React,{ useState } from "react";
import { Header } from "./oldComponent/Header";
import { FaLock, FaUser,FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope, FaEnvelopeCircleCheck, FaEnvelopesBulk, FaRegCircleCheck } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ()  =>{

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login_User: '',
    password_User: '',
    nom_User: '',
    prenom_User: '',
    tel_User: '',
    email_User: ''
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('https://fadesol-puoc.vercel.app/auth/register', formData)
    axios.post(`${API_BASE_URL}/auth/register`, formData)
      .then(response => {
        console.log(response.data); // Handle success response
        setRegistrationSuccess(true); // Open popup on successful registration
      })
      .catch(error => {
        console.error('Error:', error); // Handle error
      });
  };
  const redirectToLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  const handleLoginClick = () => {
    navigate('/login');
};


    return(
    <div className="log-main">
        <Header title="S'inscrire"/>
        <form onSubmit={handleSubmit}>
            <div className="login-section">
                <label htmlFor="login">Login d'utilisateur</label>
                <input 
                    id="login"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Login d'utilisateur"
                    name="login_User"
                    value={formData.login_User}
                    onChange={handleChange}
                    required
                    />
                    <FaUser className="icon"/>
                </div>
            <div className="login-section">
                <label htmlFor="nom">Nom</label>
                <input 
                    id="nom"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Nom d'utilisateur"
                    name="nom_User"
                    value={formData.nom_User}
                    onChange={handleChange}
                    required
                    />
                    <FaUser className="icon"/>
                </div>

            <div className="login-section">
                <label htmlFor="prenom">Prenom</label>
                <input 
                    id="prenom"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Prenom d'utilisateur"
                    name="prenom_User"
                    value={formData.prenom_User}
                    onChange={handleChange}
                    required
                    />
                    <FaUser className="icon"/>
            </div>

            <div className="login-section">
                <label htmlFor="telephone">Telephone</label>
                <input 
                    id="telephone"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Tel"
                    name="tel_User"
                    value={formData.tel_User}
                    onChange={handleChange}
                    required
                    />
                    <FaPhoneAlt className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="password">Mot de passe</label>
                <input 
                    className='password-input'
                    autoComplete="off"
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    name="password_User"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                    <FaLock className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="email">Email</label>
                <input 
                    className='login-input'
                    autoComplete="off"
                    type='email'
                    placeholder='Saisir votre email'
                    name="email_User"
                    value={formData.email_User}
                    onChange={handleChange}
                    required
                    />
                    <FaEnvelope className="icon"/>
            </div>

            <div className="log-button">
                <button type="submit">M'inscrire</button>
            </div>

            <div className="sign-up-button">
                <a href="#">J'ai déjà un compte</a>
                <button type="button" onClick={handleLoginClick} >Me connecter</button>
            </div>
    </form>

        {registrationSuccess && (
          <div class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50 py-10">
          <div class="mx-auto max-w-md overflow-hidden rounded-3xl text-gray-700 shadow-md">
          <div class=" flex justify-center items-center text-white text-[90px] bg-green-600 pt-4 sm:h-44">
            <FaRegCircleCheck />
          </div>
            <div class="flex flex-col items-center bg-white px-4 py-6">
              <h2 class="mb-2 text-3xl font-bold text-green-700 sm:text-4xl">Merci!</h2>
              <p class="mb-8 font-medium text-gray-500">Votre compte a été enregistré avec succès.</p>
              <div class="flex items-center  w-[50%]">
              <button className="p-2 w-[100%] border bg-green-600 rounded-full text-white" onClick={redirectToLogin}>OK</button>
              </div>
            </div>
          </div>
        </div>
        )}

    </div>
    )
}

export default Register;

