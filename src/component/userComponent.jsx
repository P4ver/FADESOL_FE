import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, postUserData, deleteUserData , updateUserData} from '../store/userSlice';

const UserComponent = () => {
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector((state) => state.user);
    const [displayEdit, setDislayEdit] = useState(null)

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


const handlePostChange = (event)=>{
    const {name, value} = event.target
    setFormData({
      ...formData,
      [name]:value
    })
    console.log(event)
}

const handleSubmit = async () =>{
    try {
    // Dispatch the postUserData action
    await dispatch(postUserData(formData));
    // Clear the form input fields
        setFormData({	
        login_User:"",
        password_User:"",
        nom_User:"",
        prenom_User:"",
        tel_User:"",
        note_User:"",
        type_User:""
    });
    } catch (error) {
    // Handle errors, if any
    console.error("Failed to add product:", error);
    }
}

const handleDelete = (id_User) => {
    dispatch(deleteUserData(id_User));
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

return (
    <> 
    <p >Affichage des utilisateurs</p>
    <ul>
        {userData.map((user) => (
            <li key={user.id_User}>
                <span>Login : {user.login_User}</span><span> , Login : {user.password_User}</span>
            </li>
        ))}
    </ul> 
    <form  onSubmit={handleSubmit}>
        <div>
        <h3>Ajouter un utilisateur</h3>
        <input type="text" placeholder="Login user" name="login_User" value={formData.login_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Password" name ="password_User" value ={formData.password_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Nom" name="nom_User" value={formData.nom_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Prenom" name="prenom_User" value={formData.prenom_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Tel" name="tel_User" value={formData.tel_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Note" name="note_User" value={formData.note_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Type" name="type_User" value={formData.type_User} onChange={(event)=>handlePostChange(event)}/>
        <button type="submit">Ajouter</button>
        </div>
    </form>

<ul>
    {userData.map((user) => (
        <li key={user.id_User}>
                        <strong>login:</strong> {user.login_User}, <strong>password:</strong> {user.password_User}, <strong>nom:</strong> {user.nom_User} 
            ,<strong>prenom:</strong> {user.prenom_User}, <strong>tel:</strong> {user.tel_User} , <strong>note user:</strong> {user.note_User} , <strong>type</strong> {user.type_User}, 

            {displayEdit === user.id_User ? (
                <>
                    <input type="text" value={formData[user.id_User]?.login_User || ''} name="login_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="login" />
                    <input type="text" value={formData[user.id_User]?.password_User || ''} name="password_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="password" />
                    <input type="text" value={formData[user.id_User]?.nom_User || ''} name="nom_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="nom" />
                    <input type="text" value={formData[user.id_User]?.prenom_User || ''} name="prenom_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="prenom" />
                    <input type="text" value={formData[user.id_User]?.tel_User || ''} name="tel_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="tel" />
                    <input type="text" value={formData[user.id_User]?.note_User || ''} name="note_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="note" />
                    <input type="text" value={formData[user.id_User]?.type_User || ''} name="type_User" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="type" />
                    <button onClick={() => handleUpdate(user.id_User)}>Update</button>
                    <button onClick={() => setDislayEdit(null)}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id_User)}>Delete</button>
                </>
            )}
        </li>
    ))}
</ul>

    </>
    );
}
 
export default UserComponent;

