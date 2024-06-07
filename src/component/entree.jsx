import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProductData } from '../store/productSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchAchatempoData, postAchatempoData } from '../store/achatempoSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Typography, Box, IconButton } from '@mui/material';

const Entree = () => {
  const [lines, setLines] = useState([{ demandeCode: '', projetCode: '', quantite: '' }]);
//   const demandeData = useSelector((state) => state.demande.demandeData);
const productData = useSelector((state) => state.product.productData);

  const projetData = useSelector((state) => state.projet.projetData);
  const [codeAchat, setCodeAchat] = useState('');
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  const dispatch = useDispatch();
console.log("entree============================>")
  useEffect(() => {
    dispatch(fetchProductData());
    dispatch(fetchProjetData());
    dispatch(fetchAchatempoData());

    // Generate a unique and random codeAchat when the component mounts
    const generateUniqueCodeAchat = () => {
      const uniqueCode = `CA-${Math.random().toString(36).substr(2, 9)}`;
      setCodeAchat(uniqueCode);
    };

    generateUniqueCodeAchat();
  }, [dispatch]);

  const handleAddLine = () => {
    setLines([...lines, { demandeCode: '', projetCode: '', quantite: '' }]);
  };

  const handleChange = (index, key, value) => {
    const newLines = [...lines];
    newLines[index][key] = value;
    setLines(newLines);
  };

  // const handleSubmit = async () => {
  //   try {
  //     const currentDate = new Date();
  //     const formattedDate = currentDate.toISOString();

  //     for (const line of lines) {
  //       if (line.demandeCode && line.projetCode && line.quantite) {
  //         const achatPayload = {
  //           code: line.demandeCode,
  //           designation: productData.find(demande => demande.Numéro_Article === line.demandeCode)?.Description_Article || '',
  //           quantite: parseInt(line.quantite, 10),
  //           // qte_En_Stock: demandeData.find(demande => demande.code === line.demandeCode)?.quantité || '',
  //           code_Projet: line.projetCode,
  //           nom_Projet: projetData.find(projet => projet.code_Projet === line.projetCode)?.nom_Projet || '',
  //           check_Delivery: false,
  //           code_Achat: codeAchat,
  //           user_Dmd: user.username,
  //           date: formattedDate,
  //           qte_Reçu: 0
  //         };
  //         // console.log("===B===>", achatPayload);
  //         const response = await dispatch(postAchatempoData(achatPayload));
  //         console.log("===A===>", response);
  //         if (response.error) {
  //           throw new Error(response.error.message);
  //         }
  //         console.log("achatPayload", achatPayload);
  //       }
  //     }
  //     setLines([{ demandeCode: '', projetCode: '', quantite: '' }]);
  //   } catch (error) {
  //     console.error('Error submitting data:', error.message);
  //   }
  // };

//   const handleSubmit = async () => {
//     try {
//         const currentDate = new Date();
//         const formattedDate = currentDate.toISOString();

//         for (const line of lines) {
//             if (line.demandeCode && line.projetCode && line.quantite) {
//                 const designation = productData.find(demande => demande.Numéro_Article === line.demandeCode)?.Description_Article || '';
//                 const nom_Projet = projetData.find(projet => projet.code_Projet === line.projetCode)?.nom_Projet || '';

//                 const achatPayload = {
//                     code: line.demandeCode,
//                     designation: designation,
//                     quantite: parseInt(line.quantite, 10),
//                     code_Projet: line.projetCode,
//                     nom_Projet: nom_Projet,
//                     check_Delivery: false,
//                     code_Achat: codeAchat,
//                     user_Dmd: user.username,
//                     date: formattedDate,
//                     qte_Reçu: 0
//                 };

//                 // Dispatch postAchatempoData thunk with achatPayload
//                 const response = await dispatch(postAchatempoData(achatPayload));

//                 // Handle response/error
//                 if (response.error) {
//                     throw new Error(response.error.message);
//                 }
//             }
//         }

//         // Reset lines after successful submission
//         setLines([{ demandeCode: '', projetCode: '', quantite: '' }]);
//     } catch (error) {
//         console.error('Error submitting data:', error.message);
//     }
// };

const handleSubmit = async () => {
  try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part

      for (const line of lines) {
          if (line.demandeCode && line.projetCode && line.quantite) {
              const designation = productData.find(demande => demande.Numéro_Article === line.demandeCode)?.Description_Article || '';
              const nom_Projet = projetData.find(projet => projet.code_Projet === line.projetCode)?.nom_Projet || '';

              const achatPayload = {
                  code: line.demandeCode,
                  designation: designation,
                  quantite: parseInt(line.quantite, 10),
                  code_Projet: line.projetCode,
                  nom_Projet: nom_Projet,
                  check_Delivery: false,
                  code_Achat: codeAchat,
                  user_Dmd: user.username,
                  date: "2024-05-13",
                  // date: formattedDate,
                  qte_Reçu: 0
              };

              console.log("===achatpayload===>", achatPayload);
              // Dispatch postAchatempoData thunk with achatPayload
              const response = await dispatch(postAchatempoData(achatPayload));
              console.log("===Res===>", response);
              // Handle response/error
              if (response.error) {
                  throw new Error(response.error.message);
              }
          }
      }

      // Reset lines after successful submission
      setLines([{ demandeCode: '', projetCode: '', quantite: '' }]);
  } catch (error) {
      console.error('Error submitting data:', error.message);
  }
};




  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' && index === lines.length - 1) {
      handleAddLine();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <Typography variant="h5" align="center" gutterBottom>Opération Magasinier</Typography>
      {lines.map((line, index) => (
        <div key={index} className="flex items-center space-x-4 mb-5">
          <input
            type="text"
            value={line.demandeCode}
            placeholder='Enter Demande Code'
            onChange={(e) => handleChange(index, 'demandeCode', e.target.value)}
            className="w-1/6 px-2 py-1 border rounded-md"
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
          <input
            type="text"
            value={productData.find(demande => demande.Numéro_Article === line.demandeCode)?.Description_Article || ''}
            className="w-1/6 px-2 py-1 border rounded-md"
            disabled
          />

          <input
            type="text"
            value={line.projetCode}
            placeholder='Enter Projet Code'
            onChange={(e) => handleChange(index, 'projetCode', e.target.value)}
            className="w-1/6 px-2 py-1 border rounded-md"
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
          <input
            type="text"
            value={projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || ''}
            className="w-1/6 px-2 py-1 border rounded-md"
            disabled
          />
          <input
            type="number"
            value={line.quantite}
            placeholder='Enter Quantité'
            onChange={(e) => handleChange(index, 'quantite', e.target.value)}
            className="w-1/6 px-2 py-1 border rounded-md"
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
          {index === lines.length - 1 && (
            <IconButton onClick={handleAddLine}>
              <div className="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full text-white hover:text-black hover:shadow ml-2">
                <AiOutlinePlusCircle />
              </div>
            </IconButton>
          )}
        </div>
      ))}
      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="bg-customGreen text-white hover:bg-green-600 px-4 py-2 rounded-md">Create</button>
      </div>
    </div>
  );
};

export default Entree;