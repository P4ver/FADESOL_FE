import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, postUserData} from '../../store/userSlice';


const AddUser = () => {
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector((state) => state.user);
    const [ formData, setFormData ] = useState({
        login_User:"",
        password_User:"",
        nom_User:"",
        prenom_User:"",
        email_User:"",
        tel_User:"",
        note_User:"",
        type_User:""
    })

    console.log("from adduser",userData)
    const checkData = ()=>{
        if (!userData[0]) return false
        return true
    }

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
                id_User:"",		
                login_User:"",
                password_User:"",
                nom_User:"",
                prenom_User:"",
                email_User:"",
                tel_User:"",
                note_User:"",
                type_User:""
            });
        } catch (error) {
            // Handle errors, if any
            console.error("Failed to add product:", error);
        }
    }

return (
    <> 

        <form class="relative space-y-3 rounded-md bg-white p-1 lg:p-5 border border-gray-100" onSubmit={handleSubmit}>
        <div>
            <h3 class="text-xl font-semibold lg:text-2xl">Ajouter un utilisateur</h3>
            <input type="text" placeholder="Login user" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" name="login_User" value={formData.login_User} onChange={(event)=>handlePostChange(event)}/>
            <input type="text" placeholder="Password" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" name ="password_User" value ={formData.password_User} onChange={(event)=>handlePostChange(event)}/>
            <input type="text" placeholder="Nom" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" name="nom_User" value={formData.nom_User} onChange={(event)=>handlePostChange(event)}/>
            <input type="text" placeholder="Prenom" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" name="prenom_User" value={formData.prenom_User} onChange={(event)=>handlePostChange(event)}/>
            <input type="text" placeholder="Email" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" name="email_User" value={formData.email_User} onChange={(event)=>handlePostChange(event)}/>
            <input type="text" placeholder="Tel" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" name="tel_User" value={formData.tel_User} onChange={(event)=>handlePostChange(event)}/>
            <input type="text" placeholder="Note" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" name="note_User" value={formData.note_User} onChange={(event)=>handlePostChange(event)}/>
            <input type="text" placeholder="Type" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" name="type_User" value={formData.type_User} onChange={(event)=>handlePostChange(event)}/>
            <button type="submit" class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring">Ajouter</button>
        </div>
    </form>


    </>
    );
}
 
export default AddUser;

