
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate('/login');
    };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-600">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">404 - Page non trouvée</h2>
        <p className="text-gray-700">Désolé, la page que vous recherchez n'existe pas.</p>
        <div className='flex justify-center'>
            <button className=" mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            onClick={handleGoBack}
            >Go To Login</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
