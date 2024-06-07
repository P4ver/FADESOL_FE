
import React from 'react';

const PageArticlesLivrés = () => {
  const deliveredEntries = JSON.parse(localStorage.getItem('deliveredEntries')) || [];

  return (
    <div className="container mx-auto p-4 w-full">
      <h2>Articles Livrés :</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID Achat</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Utilisateur</th>
            <th className="border border-gray-300 px-4 py-2">Quantité Livrée</th>
            <th className="border border-gray-300 px-4 py-2">Détails</th>
          </tr>
        </thead>
        <tbody>
          {deliveredEntries.map((demande, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border border-gray-300 px-4 py-2">{demande.idAchat}</td>
              <td className="border border-gray-300 px-4 py-2">{demande.date}</td>
              <td className="border border-gray-300 px-4 py-2">{demande.utilisateur}</td>
              <td className="border border-gray-300 px-4 py-2">{demande.quantiteLivre}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    // Gérer le clic pour voir les détails si nécessaire
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Voir Détails
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PageArticlesLivrés;
