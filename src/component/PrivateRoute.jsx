import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () =>{
    const token = localStorage.getItem("isAuthenticated");
    // let auth = {"token": token}
    return(
        // auth.token ? <Outlet/> : <Navigate to="/login"/>
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;


// import { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";

// const PrivateRoute = () => {
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     useEffect(() => {
//         // Check if the authentication token exists in localStorage
//         const token = localStorage.getItem("isAuthenticated");

//         // If the token doesn't exist or is invalid, redirect to the login page
//         if (!token || token !== "true") {
//             // Redirect the user to the login page
//             navigate("/login");
//         }
//     }, [navigate]); // Pass navigate as a dependency to useEffect

//     return <Outlet />;
// };

// export default PrivateRoute;


