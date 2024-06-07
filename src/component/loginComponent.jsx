import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate  } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios';
import { loginSuccess, loginFailure } from '../store/authActions';
import { Header } from './oldComponent/Header';
import { API_BASE_URL } from '../apiConfig';
  
const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://fadesol-puoc.vercel.app/auth/login', formData, {
//         withCredentials: true,
//       });
//       console.log('Login successful:', response.config.data);
//       localStorage.setItem('isAuthenticated', 'true');
// const objtext = response.config.data;
// const obj = JSON.parse(objtext)
//       dispatch(loginSuccess(obj)); // Assuming response.data contains user info
//       navigate('/dashboard'); // Assuming navigate is defined somewhere
//     } catch (error) {
//       console.error('Login failed:', error);
//       dispatch(loginFailure(error.message));
//       toast.error('La connexion a échoué. Veuillez vérifier vos informations d\'identification.');


//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
      withCredentials: true,
    });
    console.log('Login successful:', response.config.data);
    localStorage.setItem('isAuthenticated', 'true');
    const objtext = response.config.data;
    const obj = JSON.parse(objtext)
    dispatch(loginSuccess(obj)); // Assuming response.data contains user info
    navigate('/dashboard'); // Assuming navigate is defined somewhere
  } catch (error) {
    console.error('Login failed:', error);
    dispatch(loginFailure(error.message));
    toast.error('La connexion a échoué. Veuillez vérifier vos informations d\'identification.');
  }
};
  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="log-main">
      
      <Header title="Se connecter" />
      <form onSubmit={handleSubmit}>
        <div className="login-section">
          <label htmlFor="name">Nom d'utilisateur</label>
          <input
            id="login"
            className="login-input"
            type="text"
            placeholder="Saisir votre nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="password-section">
          <label htmlFor="password">Mot de passe</label>
          <input
            className="password-input"
            type="password"
            placeholder="Saisir votre mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>

        <div className="log-button">
          <button type="submit">Me connecter</button>
          <a href="#">Mot de passe oublié ?</a>
        </div>

        <div className="sign-up-button">
          <a href="#">Je n'ai pas de compte</a>
          <button type="button" onClick={handleSignUpClick}>
            M'inscrire
          </button>
        </div>
      </form>
      <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </div>
  );
};

export default LoginComponent;




// import React, { useState , useEffect} from 'react';
// import { useNavigate  } from 'react-router-dom'; 
// import { FaLock, FaUser } from "react-icons/fa";
// import axios from 'axios';


// import './LoginForm.css'
// import { Header } from "./oldComponent/Header";


// const LoginComponent = ({handleLogin })=>{

//     const [formData, setFormData] = useState({
//         name: '',
//         password: ''
//       });
  


//       const navigate = useNavigate();
//       const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//       };

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await axios.post('https://fadesol-puoc.vercel.app/auth/login', formData, {
//             withCredentials: true,
//           });
//           console.log('Login successful:', response.data);
//           localStorage.setItem('isAuthenticated', 'true');

//           navigate('/test');
//         } catch (error) {
//           console.error('Login failed:', error);
//         }
//       };


//     const handleSignUpClick = () => {
//         navigate('/register');
//     };

//     return(
//     <div className='log-main'>
//         <Header title='Se connecter'/>
//         <form onSubmit={handleSubmit}>
//             <div className="login-section">
//                 <label htmlFor="name">Nom d'utilisateur</label>
//                 <input 
//                   id="login"
//                   className='login-input'
//                   type='text'
//                   placeholder='Saisir votre nom'
//                   name='name'
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   />
//                   <FaUser className="icon"/>
//             </div>

//             <div className="password-section">
//                 <label htmlFor="password">Mot de passe</label>
//                 <input 
//                     className='password-input'
//                     type='password'
//                     placeholder='Saisir votre mot de passe'
//                     name='password'
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     />
//                     <FaLock className="icon"/>
//             </div>

//             <div className="log-button">
//                 <button type="submit">Me connecter</button>
//                 <a href="#">Mot de passe oublié ?</a>
//             </div>

            
//             <div className="sign-up-button">
//               <a href="#">Je n'ai pas de compte</a>
//                     <button type="button" onClick={handleSignUpClick}>M'inscrire</button>
//             </div>
//     </form>
//     </div>

//     )
// }

// export default LoginComponent;

//importants login component with redux


// // Login.js
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { loginAsync, selectAuth, loginSuccess } from './authSlice';
// import { loginAsync, selectAuth, loginSuccess } from '../store/authSlice';
// import { FaLock, FaUser } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import './LoginForm.css'

// const LoginComponent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector(selectAuth);

//   const [formData, setFormData] = useState({
//     name: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginAsync(formData))
//       .then(() => {
//         localStorage.setItem('isAuthenticated', 'true');
//         // Navigate to '/test' upon successful login
//         console.log("=============>", loginSuccess(formData))

//         dispatch(loginSuccess(formData)); // You might want to pass user data instead of formData
        
//         navigate('/test');
//       })
//       .catch((error) => {
//         console.error('Login failed:', error);
//       });
//   };  

//   const handleSignUpClick = () => {
//     navigate('/register');
// };


//   return (
//     <div className='log-main'>
//       <form onSubmit={handleSubmit}>
//         <div className="login-section">
//           <label htmlFor="name">Nom d'utilisateur</label>
//           <input
//             id="login"
//             className='login-input'
//             type='text'
//             placeholder='Saisir votre nom'
//             name='name'
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <FaUser className="icon" />
//         </div>

//         <div className="password-section">
//           <label htmlFor="password">Mot de passe</label>
//           <input
//             className='password-input'
//             type='password'
//             placeholder='Saisir votre mot de passe'
//             name='password'
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <FaLock className="icon" />
//         </div>

//         <div className="log-button">
//           <button type="submit" disabled={loading}>Me connecter</button>
//           {error && <div>{error}</div>}
//           <a href="#">Mot de passe oublié ?</a>
//         </div>

//         <div className="sign-up-button">
//           <a href="#">Je n'ai pas de compte</a>
//           <button type="button" onClick={handleSignUpClick}>M'inscrire</button>

//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginComponent;
