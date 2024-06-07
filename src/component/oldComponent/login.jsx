import React, { useState , useEffect} from 'react';
import { useNavigate  } from 'react-router-dom'; 
import { FaLock, FaUser } from "react-icons/fa";
import axios from 'axios';


// import './LoginForm.css'
import { Header } from "./Header";


const Login = ({handleLogin })=>{

    const [formData, setFormData] = useState({
        name: '',
        password: ''
      });
  
      // useEffect(() => {
      //   if (localStorage.getItem('isAuthenticated') === 'true') {
      //     navigate('/test');
      //   }
      // }, []);

      const navigate = useNavigate();
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/auth/login', formData, {
            withCredentials: true,
          });
          // After successful login, you might want to store the JWT token in local storage or a state management system.
          console.log('Login successful:', response.data);
          localStorage.setItem('isAuthenticated', 'true');
          // setIsAuthenticated(true);
          // handleLogin();
          // Redirect the user to another page, for example, the dashboard.
          navigate('/test');
        } catch (error) {
          console.error('Login failed:', error);
        }
      };


    const handleSignUpClick = () => {
        navigate('/register');
    };

    return(
    <div className='log-main'>
        <Header title='Se connecter'/>
        <form onSubmit={handleSubmit}>
            <div className="login-section">
                <label htmlFor="name">Nom d'utilisateur</label>
                <input 
                  id="login"
                  className='login-input'
                  type='text'
                  placeholder='Saisir votre nom'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  />
                  <FaUser className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="password">Mot de passe</label>
                <input 
                    className='password-input'
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                    <FaLock className="icon"/>
            </div>

            <div className="log-button">
                <button type="submit">Me connecter</button>
                <a href="#">Mot de passe oublié ?</a>
            </div>

            
            <div className="sign-up-button">
              <a href="#">Je n'ai pas de compte</a>
                    <button type="button" onClick={handleSignUpClick}>M'inscrire</button>
            </div>
    </form>
    </div>

    )
}

export default Login;



// import React, { useState } from 'react';
// import { useNavigate  } from 'react-router-dom'; 
// import axios from 'axios';

// const Access = () => {
//     // const [formData, setFormData] = useState({
//     //     name: '',
//     //     password: ''
//     //   });
//     //   const navigate = useNavigate();
//     //   const handleChange = (e) => {
//     //     setFormData({ ...formData, [e.target.name]: e.target.value });
//     //   };
    
//     //   const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //       const response = await axios.post('http://localhost:3000/auth/login', formData, {
//     //         withCredentials: true,
//     //       });
//     //       // After successful login, you might want to store the JWT token in local storage or a state management system.
//     //       console.log('Login successful:', response.data);
//     //       // Redirect the user to another page, for example, the dashboard.
//     //       // window.location.href = '/test';
//     //       navigate('/test');
//     //     } catch (error) {
//     //       console.error('Login failed:', error);
//     //     }
//     //   };
//     return (
//     <>
//         wekcil
//     </>
//      );
// }
 
// export default Access;