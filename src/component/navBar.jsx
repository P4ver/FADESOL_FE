// import React from 'react';
// import LogoutComponent from './logoutComponent';
// import logo from '../pictures/logo.png'
// import { useSelector } from 'react-redux';


//   const NavBar = () => {
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     console.log(user.username)
//   return (
//     <div>
//     <aside class="relative flex flex-col items-center bg-white px-4 py-4 w-calc100-minus100px shadow sm:flex-row md:h-20">
//       <div class="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
//         <ul class="mx-auto mt-4 flex justify-between items-center w-full sm:mx-5 sm:mt-0">

//           <li class="w-32">
//             <img src={logo} />
//             {/* <img  alt="Logo"/> */}
//           </li>
//           {/* <li class="max-w-96">
//               <div className="relative w-full max-w-md sm:-ml-2 ">
//                 <svg
//                   aria-hidden="true"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <input
//                   type="text"
//                   role="search"
//                   placeholder="Search..."
//                   className="py-2 pl-10 pr-4 w-full border-2  placeholder-gray-400 focus:bg-gray-50 rounded-lg"
//                 />
//             </div>
//           </li> */}
//           <li>
//               {user.username}
//           </li>
//           <li class="">
//             <button class="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full  text-gray-600 hover:text-black hover:shadow">
//                 <LogoutComponent/>
//             </button>
//           </li>
//           {/* <li class="flex">
//             <div class="flex h-8 w-60 items-center justify-center rounded-l border text-gray-600 hover:text-black hover:shadow">
//                 {helloMessage()}
//             </div>
//             <div class="flex h-8 w-60 items-center justify-center rounded-l border text-gray-600 hover:text-black hover:shadow">
//                 <p className='px-4'>Role :</p> {userRole()}
//             </div>
//           </li> */}
//         </ul>
//       </div>
//     </aside>
//     </div>
//   )
// }


// export default NavBar

import React from 'react';
import LogoutComponent from './logoutComponent';
import logo from '../pictures/logo.png';
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const authState = useSelector(state => state.auth);
  const user = authState.user;

  const userState = useSelector(state => state.user)
  const userId = user.id; // Or any other unique identifier
  
  // const foundUser = userState.userData.find(u => u.id == userId);
  // console.log(foundUser.type_User)
  // const userInitials = foundUser.nom_User.slice(0, 1).toUpperCase() + foundUser.prenom_User.slice(0, 1).toUpperCase();


  return (
    <div>
      <aside className="relative flex flex-col items-center bg-white px-4 py-4 w-calc100-minus100px shadow sm:flex-row md:h-20">
        <div className="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
          <ul className="mx-auto mt-4 flex justify-between items-center w-full sm:mx-5 sm:mt-0">
            <li className="w-32">
              <img src={logo} alt="Logo" />
            </li>
            <li className="flex items-center justify-between">
              {/* {foundUser.type_User}  */}
              <div className="flex h-8 w-8 items-center justify-center bg-gray-900 rounded-full text-white hover:text-gray-400 hover:shadow ml-2">
            <FaUser />
              </div>
              <button className="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full text-gray-600 hover:text-black hover:shadow ml-2">
                <LogoutComponent />
              </button>
            </li>
            {/* <li>
            </li> */}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default NavBar;
