

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserData, fetchUserData, updateUserData } from '../store/userSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import swal from "sweetalert";
import { toast } from "react-toastify";
// import { Collapse, Card, CardContent } from "@material-ui/core";
import { Collapse, Card, CardContent, Menu, MenuItem } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
import * as XLSX from "xlsx";
import AddUser from "./usrDashBoard/addUser";
import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';
const TableTest = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.user);
  console.log('==============>')
  console.log("TST !", userData)
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null); 

  const [editedUser, setEditedUser] = useState({
      login_User:"",
      password_User:"",
      nom_User:"",
      prenom_User:"",
      tel_User:"",
      note_User:"",
      type_User:"",
      email_User:"",
  });

  useEffect(() => {
    dispatch(fetchUserData()); 
  }, [dispatch]);

  const deletePostHandler = (user) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteUserData(user.id_User))
          .then(() => {
            swal("User deleted successfully", {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user. Please try again.");
          });
        }
    });
  };

  const handleOpenEditDialog = (user) => {
    setEditUser(user);
    setEditedUser({
      login_User: user.login_User,
      password_User:user.password_User,
      nom_User:user.nom_User,
      prenom_User:user.prenom_User,
      tel_User: user.tel_User,
      note_User: user.note_User,
      type_User: user.type_User,
      email_User: user.email_User
    });
    setOpenDialog(true);
  };

  const handleExpandUser = (user) => {
    if (expandedUser === user.id_User) {
      setExpandedUser(null);
    } else {
      setExpandedUser(user.id_User);
    }
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Save edit
  const handleSaveEdit = async () => {
    try {
      await dispatch(updateUserData({ id_User: editUser.id_User, updateUserData: editedUser }));
      setOpenDialog(false);
      dispatch(fetchUserData());
      toast.success('User updated successfully');
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.message.toString() || "Failed to update user details. Please try again.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const usersPerPage = 5; 

  const filteredData = () => {
    return userData.filter((user) =>
      user && user.login_User && user.login_User.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = userData.slice(startIndex, endIndex);
  const displayedUsersforQuery = filteredData().slice(startIndex, endIndex);

  const exportToExcel = () => {
    const filteredProducts = userData
    const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
    setAnchorEl(null); // Fermer le menu après l'exportation
  };
  const printData = () => {
    window.print();
    setAnchorEl(null); // Fermer le menu après l'impression
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const toggleStatus = async (id_User, status) => {
    try {
      const updatedUser = userData.find(item => item.id_User === id_User);
      if (updatedUser) {
        const updatedStatus = status === 'Active' ? 'inActive' : 'Active';
        const updatedUserData = { ...updatedUser, status: updatedStatus };
        await dispatch(updateUserData({ id_User: id_User, updateUserData: updatedUserData }));
        toast.success('User status updated successfully');
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast.error('Failed to toggle user status. Please try again.');
    }
  };
  // const generateBarcode = (text) => {
  //   const canvas = createCanvas();
  //   JsBarcode(canvas, text, { format: 'CODE128' });
  //   return canvas.toDataURL('image/png');
  // };
  return (
    <>
     <div className="py-3 px-4 flex justify-between items-center">
        <div className="flex">
              <div className="relative max-w-md">
            <label className="sr-only">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 px-3 block w-auto border border-black shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Search for users"
            />
          </div>

      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center z-10">
          <button onClick={toggleModal} className="bg-customBlue hover:bg-blue-500 text-white font-bold py-2 px-3 rounded-lg">
            Add User
          </button>
          {showModal && (
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
              <div className="relative bg-white rounded-lg p-8 max-w-md">
                <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={toggleModal}>&times;</span>

                <AddUser />
                <div className="mt-4 flex justify-end">
                  <button onClick={toggleModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                    Cancel
                  </button>
                  {/* Add any other buttons or actions here */}
                </div>
              </div>
            </div>
          )}
        </div>
          <button
              aria-controls="export-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              className="inline-flex py-2 px-3  text-white font-bold bg-customGreen hover:bg-green-500 focus:bg-green-600 rounded-md ml-4 "
            >
              Export
            </button>

            <Menu
              id="export-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={exportToExcel}>Excel</MenuItem>
              <MenuItem onClick={printData}>Print</MenuItem>
            </Menu>
      </div>


        </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Last activity</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedUsersforQuery.map((user) => (
              // {displayedUsers.map((user) => (
                <React.Fragment key={user.id_User}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center">
                      <span className="ml-3">{user.login_User}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.type_User}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email_User}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Today</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"> */}
                      {/* <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span> */}
                          {/*================================================*/}
                          {/* <button
                            type="button"
                            className="text-green-600 hover:text-green-900 focus:outline-none"
                            onClick={() => handleOpenEditDialog(user)}
                            >
                            <RiEdit2Fill />
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
                        </button> */}
                          {/*====================================================*/}
                    {/* </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Switch
                          checked={user.status === 'Active'}
                          onChange={() => toggleStatus(user.id_User, user.status)}
                          color="secondary"
                        />
                        {user.status}
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-end items-center space-x-3">
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-900 focus:outline-none"
                          onClick={() => handleExpandUser(user)}
                        >
                          <GrView />
                          <path d="M10 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-3m-4 8v4m0-8V6m4 8h3m2-3h-8"></path>
                        </button>
                        <button
                          type="button"
                          className="text-green-600 hover:text-green-900 focus:outline-none"
                          onClick={() => handleOpenEditDialog(user)}
                        >
                          <RiEdit2Fill />
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900 focus:outline-none"
                          onClick={() => deletePostHandler(user)}
                        >
                          <RiDeleteBinFill />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6">
                      <Collapse in={expandedUser === user.id_User} timeout="auto" unmountOnExit>
                        <Card>
                          <CardContent>
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">User Details</h3>
                              <p><strong>Nom: </strong>{user.nom_User}</p>
                              <p><strong>Prenom: </strong>{user.prenom_User}</p>
                              <p><strong>Tel: </strong>{user.tel_User}</p>
                              <p><strong>Note: </strong>{user.note_User}</p>
                              <p><strong>Email: </strong>{user.email_User}</p>
                              <p><strong>Code: </strong>{user.email_User}</p>

                            </div>
                          </CardContent>
                        </Card>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="py-3 px-4 flex justify-end">
              <Pagination
                count={Math.ceil(userData.length / usersPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
              />
            </div>


        {openDialog && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Edit User</h3>
                      <div className="mt-5">
                        <form>
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-4">
                              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                              <input type="text" name="login_User" id="username" value={editedUser.login_User} onChange={handleEditChange} autoComplete="login_User" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                              <input type="text" name="password_User" id="password" value={editedUser.password_User} onChange={handleEditChange} autoComplete="password_User" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">nom</label>
                              <input type="text" name="nom_User" id="nom" value={editedUser.nom_User} onChange={handleEditChange} autoComplete="nom_User" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">prenom</label>
                              <input type="text" name="prenom_User" id="prenom" value={editedUser.prenom_User} onChange={handleEditChange} autoComplete="prenom_User" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                              <input type="email" name="email_User" id="tel" value={editedUser.email_User} onChange={handleEditChange} autoComplete="email_User" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                              <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Tel</label>
                              <input type="tel" name="tel_User" id="tel" value={editedUser.tel_User} onChange={handleEditChange} autoComplete="tel_User" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                              <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
                              <input type="note" name="note_User" id="note" value={editedUser.note_User} onChange={handleEditChange} autoComplete="note_User" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="type_User" className="block text-sm font-medium text-gray-700">Role</label>
                              <select id="type_User" name="type_User" autoComplete="role" value={editedUser.type_User} onChange={handleEditChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                                <option value="Utilisateur">Utilisateur</option>
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" onClick={handleSaveEdit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                  <button type="button" onClick={handleCloseDialog} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default TableTest;


