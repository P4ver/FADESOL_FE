import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, updateUserData, deleteUserData} from '../../store/userSlice';

const UpdateDeleteUsers = () => {
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector((state) => state.user);
    const [displayEdit, setDislayEdit] = useState(null)
    const [userToDelete, setUserToDelete] = useState(null); 
    const [showConfirmation, setShowConfirmation] = useState(false);

const [ formData, setFormData ] = useState({
    login_User:"",
    password_User:"",
    nom_User:"",
    prenom_User:"",
    tel_User:"",
    note_User:"",
    type_User:""
})

useEffect(() => {
    dispatch(fetchUserData()); // Dispatch the fetchuserData action when the component mounts
}, [dispatch]);

// const handleDelete = (id_User, event) => {
//     event.preventDefault();
//     dispatch(deleteUserData(userToDelete));
//     setShowConfirmation(true)
// }

const confirmDelete = () => {
    dispatch(deleteUserData(userToDelete));
    setShowConfirmation(false); // Hide confirmation popup after deletion
};
const askForDelete = (id_User, event) =>{
    setUserToDelete(id_User)
    // setUserToDelete(id_User)
    setShowConfirmation(true)
}


//====================== Mise à jour des produits ================================

const handleUpdateChange = (id_User, event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [id_User]: {
            ...formData[id_User],
            [name]: value
        }
    });
};

const handleUpdate = (productId) => {
    if (productId && formData[productId]) {
        dispatch(updateUserData({ id_User: productId, updateUserData: formData[productId] }));
        
    } else {
        console.error('Product ID or edited product data is missing.');
    }
};

const handleEdit = (product)=>{
    setDislayEdit(product.id_User)
}
//===============================================================================

return (
    <> 
        {userData.length > 0 &&(
            <div className='p-10'>
                <ul>
                <div className="py-1">
                    {userData.map((user) => (
                        <li key={user.id_User} className='border-b-2 pb-10'>

                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-6 p-2'>
                                <strong className="font-semibold">login:</strong> {user.login_User}
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-6 p-2'>
                                <strong className="font-semibold">password:</strong> {user.password_User}
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-6 p-2'>
                                <strong className="font-semibold">nom:</strong> {user.nom_User}
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-6 p-2'>
                                <strong className="font-semibold">prenom:</strong> {user.prenom_User}
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-6 p-2'>
                                <strong className="font-semibold">tel:</strong> {user.tel_User}
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-6 p-2'>
                                <strong className="font-semibold">note user:</strong> {user.note_User}
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-6 p-2'>
                                <strong className="font-semibold">type:</strong> {user.type_User}
                            </div>
                        
                            {displayEdit === user.id_User ? (
                                <>
                                    <input type="text" value={formData[user.id_User]?.login_User || ''} name="login_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="login" />
                                    <input type="text" value={formData[user.id_User]?.password_User || ''} name="password_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="password" />
                                    <input type="text" value={formData[user.id_User]?.nom_User || ''} name="nom_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="nom" />
                                    <input type="text" value={formData[user.id_User]?.prenom_User || ''} name="prenom_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="prenom" />
                                    <input type="text" value={formData[user.id_User]?.tel_User || ''} name="tel_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="tel" />
                                    <input type="text" value={formData[user.id_User]?.note_User || ''} name="note_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="note" />
                                    <input type="text" value={formData[user.id_User]?.type_User || ''} name="type_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="type" />
                                    <div>
                                        <button onClick={() => handleUpdate(user.id_User)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >Update</button>
                                        <button onClick={() => setDislayEdit(null)}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >Cancel</button>
                                        {/* bg-gray-500 hover:bg-gray-700 */}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <button onClick={() => handleEdit(user)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >Edit</button>
                                        {/* <button onClick={(event) => handleDelete(user.id_User, event)} */}
                                        <button onClick={(event) => askForDelete(user.id_User, event)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </div>
                </ul>

                {/* Confirmation Popup */}
                {showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                        <div className="bg-white p-7 py-10 rounded-lg">
                            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                            <div className="flex justify-between mt-4">
                                <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2">Oui</button>
                                <button onClick={() => setShowConfirmation(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">Annuler</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
    </>
    );
}


export default UpdateDeleteUsers

{/* <ul className="divide-y divide-gray-200">
    {userData.map((user) => (
        <li key={user.id_User} className="py-4">
            <div className="flex flex-wrap items-center">
                <div className="w-full sm:w-auto">
                    <strong className="font-semibold">login:</strong> {user.login_User},{' '}
                    <strong className="font-semibold">password:</strong> {user.password_User},{' '}
                    <strong className="font-semibold">nom:</strong> {user.nom_User},{' '}
                    <strong className="font-semibold">prenom:</strong> {user.prenom_User},{' '}
                    <strong className="font-semibold">tel:</strong> {user.tel_User},{' '}
                    <strong className="font-semibold">note user:</strong> {user.note_User},{' '}
                    <strong className="font-semibold">type:</strong> {user.type_User}
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-4">
                    {displayEdit === user.id_User ? (
                        <>
                            <input
                                type="text"
                                value={formData[user.id_User]?.login_User || ''}
                                name="login_User"
                                onChange={(event) => handleUpdateChange(user.id_User, event)}
                                placeholder="login"
                                className="border rounded py-1 px-2 mr-2"
                            />
                            <input
                                type="text"
                                value={formData[user.id_User]?.password_User || ''}
                                name="password_User"
                                onChange={(event) => handleUpdateChange(user.id_User, event)}
                                placeholder="password"
                                className="border rounded py-1 px-2 mr-2"
                            />
                            <button
                                onClick={() => handleUpdate(user.id_User)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setDislayEdit(null)}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleEdit(user)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.id_User)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </li>
    ))}
</ul> */}
                {/* <div className='flex p'>
                <strong className="font-semibold">login:</strong> {user.login_User}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <strong className="font-semibold">password:</strong> {user.password_User}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <strong className="font-semibold">nom:</strong> {user.nom_User}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <strong className="font-semibold">prenom:</strong> {user.prenom_User}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <strong className="font-semibold">tel:</strong> {user.tel_User}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <strong className="font-semibold">note user:</strong> {user.note_User}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <strong className="font-semibold">type:</strong> {user.type_User}
                </div> */}
                    {/* <div>
                        <strong className="font-semibold">login:</strong> {user.login_User}
                        </div>
                        <div>
                            <strong className="font-semibold">password:</strong> {user.password_User}

                        </div>
                        <div>
                            <strong className="font-semibold">nom:</strong> {user.nom_User}

                        </div>
                        <div>
                            <strong className="font-semibold">prenom:</strong> {user.prenom_User}

                        </div>
                        <div>
                            <strong className="font-semibold">tel:</strong> {user.tel_User}

                        </div>
                        <div>
                            <strong className="font-semibold">note user:</strong> {user.note_User}

                        </div>
                        <div>
                            <strong className="font-semibold">type:</strong> {user.type_User}
                        </div> */}