import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TbTruckDelivery, TbTruckReturn, TbArrowBadgeRight } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { SlBasket, SlArrowDown, SlArrowUp } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx";

const SideBare = () => {
  const [isEntreeDropdownOpen, setIsEntreeDropdownOpen] = useState(false);
  const authState = useSelector(state => state.auth);
  const userState = useSelector(state => state.user)
  const user = authState.user;
  const userId = user.id; // Or any other unique identifier
  
  const foundUser = userState.userData.find(u => u.id == userId);
  // const userInitials = foundUser.nom_User.slice(0, 1).toUpperCase() + foundUser.prenom_User.slice(0, 1).toUpperCase();

  const toggleEntreeDropdown = () => {
    setIsEntreeDropdownOpen(!isEntreeDropdownOpen);
  };

  

  return (
    <header className="fixed z-50 md:relative">
      <input type="checkbox" className="peer hidden" id="sidebar-open" />
  
      <nav
        aria-label="Sidebar Navigation"
        className="peer-checked:w-52 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-800 text-white transition-all duration-300 md:h-screen md:w-52 lg:w-52"
      >
      
     
        <div className="flex flex-col items-center px-6 py-3 space-y-2 bg-gray-700 rounded-lg mt-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-500 rounded-full text-xl font-bold">
            {/* {userInitials} */}
          </div>
          <div className="text-lg text-center">
            {/* Welcome back, <br /> {foundUser.nom_User}  {foundUser.prenom_User} */}
          </div>
        </div>
        <ul className="mt-8 space-y-3 md:mt-20">
          <li className="relative">
            <Link to="/dashboard" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <RxDashboard className="text-2xl" />
              <span className="text-lg">Dashboard</span>
            </Link>
          </li>
          <li className="relative">
            <Link to="/users" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <FaRegUser className="text-2xl" />
              <span className="text-lg">Users</span>
            </Link>
          </li>
          <li className="relative">
            <Link to="/products" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <AiOutlineProduct className="text-2xl" />
              <span className="text-lg">Products</span>
            </Link>
          </li>
          <li className="relative">
            <button onClick={toggleEntreeDropdown} className="flex items-center justify-between w-full px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <div className="flex items-center space-x-3">
                <SlBasket className="text-2xl" />
                <span className="text-lg">Entree</span>
              </div>
              {isEntreeDropdownOpen ? <SlArrowUp className="text-xl" /> : <SlArrowDown className="text-xl" />}
            </button>
            {isEntreeDropdownOpen && (
              <ul className="mt-2 space-y-2 pl-12">
                <li>
                  <Link to="/liste-demandes" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
                    <TbArrowBadgeRight className="text-xl" />
                    <span>Demandes</span>
                  </Link>
                </li>
                <li>
                  <Link to="/entree" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
                    <TbArrowBadgeRight className="text-xl" />
                    <span>Saisie</span>
                  </Link>
                </li>
                <li>
                  <Link to="/livraison" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
                    <TbArrowBadgeRight className="text-xl" />
                    <span>Livraison</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sortie" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
                    <TbArrowBadgeRight className="text-xl" />
                    <span>Return</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <Link to="/sortie" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <BiPurchaseTagAlt className="text-2xl" />
              <span className="text-lg">Sortie</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SideBare;

// import React,{useState} from 'react';
// import { Link } from 'react-router-dom'; // Import Link from React Router
// import { TbTruckDelivery } from "react-icons/tb";
// import { TbTruckReturn } from "react-icons/tb";
// import { BiPurchaseTagAlt } from "react-icons/bi";
// import { FaRegUser } from "react-icons/fa6";
// import { AiOutlineProduct } from "react-icons/ai";
// import { SlBasket } from "react-icons/sl";
// import { RxDashboard } from "react-icons/rx";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { SlArrowDown } from "react-icons/sl";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { SlArrowUp } from "react-icons/sl";
// import { TbArrowBadgeRight } from "react-icons/tb";

// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// const SideBare = () => {
//   const [isEntreeDropdownOpen, setIsEntreeDropdownOpen] = useState(false);

//   const toggleEntreeDropdown = () => {
//     setIsEntreeDropdownOpen(!isEntreeDropdownOpen);
//   };
//   return (
//     <header className="fixed z-50 md:relative ">
//       <input type="checkbox" className="peer hidden" id="sidebar-open" />
//       <label
//         className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
//         htmlFor="sidebar-open"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </label>
//       <nav
//         aria-label="Sidebar Navigation"
//         className="peer-checked:w-52 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-white text-white transition-all md:h-screen md:w-52 lg:w-52"
//       >
//         <div className="bg-white mt-5 py-4 px-10 md:mt-10">
//           <div className="w-36">
//             {/* <img src={logo} alt="Logo" /> */}
//           </div>
//         </div>
//         <ul className="mt-8 space-y-3 md:mt-20">
//           <li className="relative">
//             {/* Use Link component with "to" prop to navigate */}
//             <Link to="/dashboard" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-green-700 focus:outline-none text-lg items-center  justifys-center ">
//               <span className="text-xl">
//               <RxDashboard />
//               </span>
//               <span>Dashboard</span>
//             </Link>
//           </li>
//           <li className="relative">
//             {/* Use Link component with "to" prop to navigate */}
//             <Link to="/users" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-green-700 focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//               <FaRegUser />
//               </span>
//               <span>Users</span>
//             </Link>
//           </li>
//           <li className="relative">
//             {/* Use Link component with "to" prop to navigate */}
//             <Link to="/products" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//               <AiOutlineProduct />
//               </span>
//               <span>Products</span>
//             </Link>
//             {/* <Link to="/entree" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//               <SlBasket />
//               </span>
//               <span>Entree</span>
//             </Link> */}
//           {/* <li className="relative">
//                 <SlBasket className="h-5 w-5 mx-auto  text-customGreen " />

//             <Accordion className="py-0" sx={{ boxShadow: 'none' }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="entree-panel-content"
//                 id="entree-panel-header"
//                 className="bg-white py-0"
//               >
//                 <div className='text-customGreen text-lg'  >
//                 Entree
//                 </div>
//               </AccordionSummary>
//               <AccordionDetails className="py-0 px-5">
//                 <ul className="ml-2">
//                 <li className="pt-0">
//                     <Link
//                       to="/liste-demandes"
//                       className="text-customGreen hover:text-gray-800  text-lg"
//                     >
//                      Demandes
//                     </Link>
//                   </li>
//                   <li className="pt-5">
//                     <Link
//                       to="/entree"
//                       className="text-customGreen text-lg hover:text-gray-800"
//                     >
//                 saisie
//                     </Link>
//                   </li>
//                   <li className="pt-5">
//                     <Link
//                       to="/livraison"
//                       className="text-customGreen text-lg hover:text-gray-800"
//                     >
                   
//                       Livraison
//                     </Link>
//                   </li>
//                   <li className="pt-5">
//                     <Link
//                       to="/sortie"
//                       className="text-customGreen text-lg hover:text-gray-800"
//                     >
//                       Return
//                     </Link>
//                   </li>
//                 </ul>
//               </AccordionDetails>
//             </Accordion>
//           </li> */}

//            <li className="relative">
//              <button onClick={toggleEntreeDropdown} className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//                <span className="text-xl">
//                  <SlBasket />
//                </span>
//                <div className='flex items-center'>Entree
//                 <div className='pl-2'>
//                   {isEntreeDropdownOpen ? (
//                     <SlArrowUp />
                    
                    
//                   ):(
//                     <SlArrowDown />
//                   )}
//                 </div>
//                </div>
//              </button>
//              {isEntreeDropdownOpen && (
//                 <ul className="ml-2">
//                 <li className=" pt-0">
//                     <Link
//                       to="/liste-demandes"
//                       className="text-customGreen hover:text-gray-800 text-lg flex items-center border border-blue-50"
//                     >
//                     <TbArrowBadgeRight />
//                      Demandes
//                     </Link>
//                   </li>
//                   <li className="pt-5">
//                   <Link
//                       to="/entree"
//                       className="text-customGreen hover:text-gray-800 text-lg flex items-center border border-blue-50"
//                     >
//                     <TbArrowBadgeRight />
//                 saisie
//                     </Link>
//                   </li>
//                   <li className=" pt-5">
//                   <Link
//                       to="/livraison"
//                       className="text-customGreen hover:text-gray-800 text-lg flex items-center border border-blue-50"
//                     >
//                     <TbArrowBadgeRight />
//                       Livraison
//                     </Link>
//                   </li>
//                   <li className="pt-5">
//                   <Link
//                       to="/sortie"
//                       className="text-customGreen hover:text-gray-800 text-lg flex items-center border border-blue-50"
//                     >
//                     <TbArrowBadgeRight />
//                       Return
//                     </Link>
//                   </li>
//                 </ul>
//             )}
//           </li>

//             <Link to="/sortie" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//               <BiPurchaseTagAlt />
//               </span>
//               <span>Sortie</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default SideBare;






// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { SlBasket } from 'react-icons/sl';
// import { BiPurchaseTagAlt } from 'react-icons/bi';
// import { TbTruckReturn } from 'react-icons/tb';
// const SideBar = () => {
//   return (
//     <header className="fixed z-50 md:relative">
//       <input type="checkbox" className="peer hidden" id="sidebar-open" />
//       <label
//         className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
//         htmlFor="sidebar-open"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </label>
//       <nav
//         aria-label="Sidebar Navigation"
//         className="peer-checked:w-28 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-white text-black transition-all md:h-screen md:w-28 lg:w-28"
//       >
//         <div className="bg-white mt-5 py-4 px-10 md:mt-10">
//           <div className="w-36">
//             {/* <img src={logo} alt="Logo" /> */}
//           </div>
//         </div>
//         <ul className="mt-8 space-y-3 md:mt-20">
//           <li className="relative">
//             <Accordion className="py-0" sx={{ boxShadow: 'none' }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="entree-panel-content"
//                 id="entree-panel-header"
//                 className="bg-white py-0"
//               >
//                 <SlBasket className="h-5 w-5 mr-2 text-gray-400" />
//                 Entree
//               </AccordionSummary>
//               <AccordionDetails className="py-0 px-5 mr-">
//                 <ul className="ml-2">
//                   <li className="py-0">
//                     <Link
//                       to="/entree/sub-item1"
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       Sub Item 1
//                     </Link>
//                   </li>
//                   <li className="py-2">
//                     <Link
//                       to="/entree/sub-item2"
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       Sub Item 2
//                     </Link>
//                   </li>
//                 </ul>
//               </AccordionDetails>
//             </Accordion>
//           </li>
//           {/* Other menu items */}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default SideBar;
