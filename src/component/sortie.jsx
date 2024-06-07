import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchVenteData , postVenteData, deleteVenteData} from '../store/venteSlice';
import { fetchProductData } from '../store/productSlice';
import { fetchAchatempoData} from '../store/achatempoSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import { FaDeleteLeft } from "react-icons/fa6";
import Switch from "@mui/material/Switch";
import { Link } from 'react-router-dom';



const Sortie = () => {
    const [demandeCode, setDemandeCode] = useState('');
    const [projetCode, setProjetCode] = useState('');
    const [quantite, setQuantite] = useState('');
    const [n_Serie, setN_Serie] = useState('');
    const [demandeDetails, setDemandeDetails] = useState(null);
    const [projetDetails, setProjetDetails] = useState(null);
    const dispatch = useDispatch();

    const { demandeData, demandeLoading, demandeError } = useSelector((state) => state.demande);
    const { productData, prjloading, prjerror } = useSelector((state) => state.product);
    const { projetData, projetLoading, projetError } = useSelector((state) => state.projet);
    const { venteData, venteLoading, venteError } = useSelector((state) => state.vente);

    useEffect(() => {
        dispatch(fetchDemandeData());
        dispatch(fetchProjetData());
        dispatch(fetchAchatempoData());
        dispatch(fetchVenteData());
        dispatch(fetchProductData());
    }, [dispatch]);

    useEffect(() => {
        if (demandeCode) {
            const selectedDemande = productData.find(demande => demande.Numéro_Article === demandeCode);
            console.log("test", selectedDemande);
            if (selectedDemande) {
                setDemandeDetails(selectedDemande);
            }
        }
    }, [demandeCode, productData]);

    useEffect(() => {
        if (projetCode) {
            const selectedProjet = projetData.find(projet => projet.code_Projet == projetCode);
            if (selectedProjet) {
                setProjetDetails(selectedProjet);
            }
        }
    }, [projetCode, projetData]);

    const handleDemandeCodeChange = (e) => {
        setDemandeCode(e.target.value);
    };

    const handleProjetCodeChange = (e) => {
        setProjetCode(e.target.value);
        const selectedProjet = projetData.find(projet => projet.code_Projet === e.target.value);
        if (selectedProjet) {
            setProjetDetails(selectedProjet);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (demandeDetails && projetDetails && quantite && n_Serie) {
            const achatPayload = {
                code_Produit: demandeDetails.Numéro_Article,
                designation_Produit: demandeDetails.Description_Article,
                qte_Produit: parseInt(quantite, 10),
                n_Serie: parseInt(n_Serie, 10),
                code_Projet: projetDetails.code_Projet,
                nom_Projet: projetDetails.nom_Projet
            };
            dispatch(postVenteData(achatPayload));
        } else {
            console.error('Demande or Projet details or quantite or n_Serie are not available');
        }
    };
    const handleDelete = (id_Vente) => {
        dispatch(deleteVenteData(id_Vente));
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container mx-auto w-full">
            <div className="text-center bg-customBlue text-white py-2 mb-4">
                <h1 className="text-2xl font-bold">OPERATION SORTIE</h1>
            </div>
            <div className="max-w-md mx-auto flex justify-center items-center">
                <div className="mb-4 flex">
                    <div className="mr-2 w-60">
                        <label className="block text-sm font-bold mb-2">Article Code:</label>
                        <input type="text" value={demandeCode} placeholder='enter code' onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
                    </div>
                    {demandeDetails && (
                        <div className="mr-2">
                            <label className="block text-sm font-bold mb-2">Description:</label>
                            <input type="text" value={demandeDetails.Description_Article} className="w-full border rounded py-2 px-3" disabled />
                        </div>
                    )}
                </div>
                <div className="mb-4 flex">
                    <div className="mr-2 w-60">
                        <label className="block text-sm font-bold mb-2">Projet Code:</label>
                        <input type="text" value={projetCode} placeholder='Code de Projet' onChange={handleProjetCodeChange} className="w-full border rounded py-2 px-3" />
                    </div>
                    {projetDetails && (
                        <div className='mr-2'>
                            <label className="block text-sm font-bold mb-2">Nom Projet:</label>
                            <input type="text" value={projetDetails.nom_Projet} className="w-full border rounded py-2 px-3 " disabled />
                        </div>
                    )}
                </div>
                <div className="mb-4 mr-2">
                    <label className="block text-sm font-bold mb-2 w-20">Quantite:</label>
                    <input type="number" value={quantite} placeholder='0' onChange={(e) => setQuantite(e.target.value)} className="w-full border rounded py-2 px-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 w-20">N° Serie:</label>
                    <input type="number" value={n_Serie} placeholder='0' onChange={(e) => setN_Serie(e.target.value)} className="w-36 border rounded py-2 px-2" />
                </div>
                <div className="mb-4 ml-3">
                    <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Create</button>
                </div>
            </div>

            <div className="mt-8">
                <table className="min-w-full table-auto bg-white border border-gray-200">
                    <thead>
                        <tr className='bg-green-600 text-white'>
                            <th className="px-4 py-2">Code</th>
                            <th className="px-4 py-2">Designation</th>
                            <th className="px-4 py-2">Quantite</th>
                            <th className="px-4 py-2">N° Serie</th>
                            <th className="px-4 py-2">Code Projet</th>
                            <th className="px-4 py-2">Nom Projet</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venteData.map((vente, index) => (
                            <tr key={vente.id_Vente} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{vente.code_Produit}</td>
                                <td className="border px-4 py-2">{vente.designation_Produit}</td>
                                <td className="border px-4 py-2">{vente.qte_Produit}</td>
                                <td className="border px-4 py-2">{vente.n_Serie}</td>
                                <td className="border px-4 py-2">{vente.code_Projet}</td>
                                <td className="border px-4 py-2">{vente.nom_Projet}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button onClick={() => handleDelete(vente.id_Vente)} className="text-red-600 hover:text-red-800">
                                        <RiDeleteBinFill />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                    <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" onClick={handlePrint}>Imprimer</button>
                    {/* <Link to="/Livraison" className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Transformer</Link> */}
                </div>
            </div>
        </div>
    );
};

export default Sortie;
