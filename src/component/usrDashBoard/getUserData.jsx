import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData} from '../../store/userSlice';




export const GetUserData = () => {
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector((state) => state.user);
    
    useEffect(() => {
        dispatch(fetchUserData()); // Dispatch the fetchProductData action when the component mounts
    }, [dispatch]);
    return (  
        <>
            {userData.length > 0 &&(
                <div className='p-10 '>
                    <p >Affichage des utilisateurs</p>
                    <ul>
                        {userData.map((user) => (
                            <li key={user.id_User}>
                                <span>Login : {user.login_User}</span><span> , Login : {user.password_User}</span>
                            </li>
                        ))}
                    </ul> 
                </div>
            )}   
        </>
    );
}