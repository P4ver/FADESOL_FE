import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAchatempoData,updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice'; // Assuming you have a delete action in achatSlice
import Modal from 'react-modal';
import { FaEye, FaPencilAlt, FaCheck, FaTimes, FaTruck, FaPrint } from 'react-icons/fa';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Button, Typography, Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmation dialog
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import confirmation dialog styles
import logo from '../pictures/logo.png';
import { fetchAchatData, postAchatData, deleteAchatData } from '../store/achatSlice';

Modal.setAppElement('#root');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 20,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: '10px',
    width: '100px', // Adjusted width for quantity input
  },
  updateButton: {
    marginLeft: 10,
  },
  statusIcon: {
    marginRight: 5,
    verticalAlign: 'middle',
  },
  validateButton: {
    marginTop: 10,
  },
  printArea: {
    display: 'none',
  },
});

function ListeDemande() {
  const classes = useStyles();
  const { achatempoData } = useSelector(state => state.achatempo);
  const { achatData } = useSelector(state => state.achat);
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAchatData());
    dispatch(fetchAchatempoData());
  }, [dispatch]);

  console.log("achatData:", achatData);
  const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
  const [qteRecu, setQteRecu] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAchat, setSelectedAchat] = useState(null);

  const handleInputChange = (id, value) => {
    setQteRecu(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (id) => {
    const quantityReceived = qteRecu[id];
    if (quantityReceived !== undefined) {
      try {
        await dispatch(updateAchatempoData({
          id_Achat: id,
          updatedAchatempoData: { qte_Reçu: quantityReceived }
        }));
        setUpdateSuccess(true);
      } catch (error) {
        console.error('Error updating quantity received:', error);
        alert('Failed to update quantity received.');
      }
    } else {
      alert('Please enter a quantity received.');
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to delete this demand?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteAchatempoData(id)), // Implement delete action
        },
        {
          label: 'No',
          onClick: () => {},
        }
      ]
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      window.location.reload(); // Reload the page to update data
    }
  }, [updateSuccess]);

  const getStatus = (quantite, qteRecu) => {
    if (qteRecu == 0) {
      return (
        <span>
          <FaTruck className={classes.statusIcon} /> Pending
        </span>
      );
    } else if (quantite > qteRecu) {
      return (
        <span>
          <FaTruck className={classes.statusIcon} /> Partiellement livré
        </span>
      );
    } else if (quantite == qteRecu) {
      return (
        <span>
          <FaCheck className={classes.statusIcon} /> Livré
        </span>
      );
    } else {
      return 'Unknown';
    }
  };

  const openModal = (achat) => {
    setSelectedAchat(achat);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAchat(null);
  };

  const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

  // const handleValidation = async () => {
  //   try {
  //     const promises = Object.keys(qteRecu).map(id =>
  //       dispatch(updateAchatempoData({
  //         id_Achat: id,
  //         updatedAchatempoData: { qte_Reçu: qteRecu[id] }
  //       }))
  //     );
  //     await Promise.all(promises);
  //     setUpdateSuccess(true);
  //     setModalIsOpen(false); // Close the pop-up after validation

  //     // Add items with status 'livré' to achatData
  //     filteredAchatData.forEach(item => {
  //       if (item.quantite === qteRecu[item.id_Achat]) {
  //         dispatch(postAchatData({
  //           code_Achat: item.code_Achat,
  //           user_Dmd: item.user_Dmd,
  //           date: item.date,
  //           code: item.code,
  //           designation: item.designation,
  //           quantite: item.quantite
  //         }));
  //       }
  //     });

  //     const allDelivered = filteredAchatData.every(item => item.quantite === qteRecu[item.id_Achat]);
  //     if (allDelivered) {
  //       // Show a notification for fully delivered demand
  //       alert(`Demande ${selectedAchat.code_Achat} est entièrement livrée.`);
  //     }
  //   } catch (error) {
  //     console.error('Error updating quantities:', error);
  //     alert('Failed to update quantities.');
  //   }
  // };
  useEffect(() => {
    const handleDeleteDuplicates = async () => {
      try {
        const achatMap = {};
        const duplicates = [];
  
        achatData.forEach(achat => {
          const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
          if (achatMap[key]) {
            duplicates.push(achat.id_Achat);
          } else {
            achatMap[key] = true;
          }
        });
  
        const deletePromises = duplicates.map(id => dispatch(deleteAchatData(id)));
        await Promise.all(deletePromises);
      } catch (error) {
        console.error('Error deleting duplicates:', error);
        alert('Failed to delete duplicates.');
      }
    };
  
    handleDeleteDuplicates();
  }, [achatData, qteRecu]);
  
  const handleValidation = async () => {
    try {
      // First, update all quantities in achatempo
      const updatePromises = Object.keys(qteRecu).map(id =>
        dispatch(updateAchatempoData({
          id_Achat: id,
          updatedAchatempoData: { qte_Reçu: qteRecu[id] }
        }))
      );
      await Promise.all(updatePromises);
      setUpdateSuccess(true);
      setModalIsOpen(false); // Close the modal after validation
  
      // Function to check if an item already exists in the achat table
      const itemExistsInAchat = (item) => {
        return achatData.some(achat =>
          achat.code === item.code &&
          achat.code_Projet === item.code_Projet &&
          achat.designation === item.designation &&
          achat.quantite === item.quantite &&
          achat.nom_Projet === item.nom_Projet &&
          achat.date === item.date &&
          achat.code_Achat === item.code_Achat &&
          achat.user_Dmd === item.user_Dmd
        );
      };
  
      // Check the status of each demand and add to achatData if 'livré'
      const addAchatPromises = filteredAchatData.map(async item => {
        const quantityReceived = qteRecu[item.id_Achat] !== undefined ? qteRecu[item.id_Achat] : item.qte_Reçu;
        if (item.quantite === quantityReceived && !itemExistsInAchat(item)) {
          await dispatch(postAchatData({
            code: item.code,
            code_Projet: item.code_Projet,
            designation: item.designation,
            quantite: item.quantite,
            nom_Projet: item.nom_Projet,
            date: item.date,
            code_Achat: item.code_Achat,
            user_Dmd: item.user_Dmd
          }));
        }
      });
  
      await Promise.all(addAchatPromises);
  
    } catch (error) {
      console.error('Error updating quantities:', error);
      alert('Failed to update quantities.');
    }
  };
  

  const handlePrint = () => {
    const printContents = document.getElementById('print-area').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const getGeneralStatus = (codeAchat) => {
    const relatedDemands = filteredAchatData.filter(data => data.code_Achat === codeAchat);

    if (relatedDemands.every(demand => demand.qte_Reçu === 0)) {
      return 'Pending';
    }

    if (relatedDemands.every(demand => demand.qte_Reçu === demand.quantite)) {
      return 'Livré';
    }

    if (relatedDemands.some(demand => demand.qte_Reçu > 0 && demand.qte_Reçu < demand.quantite)) {
      return 'Partiellement livré';
    }

    return 'Pending';
  };

  const handleDeleteDuplicates = async () => {
  try {
    const achatMap = {};
    const duplicates = [];

    achatData.forEach(achat => {
      const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
      if (achatMap[key]) {
        duplicates.push(achat.id_Achat);
      } else {
        achatMap[key] = true;
      }
    });

    const deletePromises = duplicates.map(id => dispatch(deleteAchatData(id)));
    await Promise.all(deletePromises);
    window.location.reload();
  } catch (error) {
    console.error('Error deleting duplicates:', error);
    alert('Failed to delete duplicates.');
  }
};


  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>Demande Table</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Code-Achat</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Suivi Status</TableCell>
              <TableCell>Action</TableCell> {/* Added column for delete action */}
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueCodeAchats.map((codeAchat, index) => {
              const achat = filteredAchatData.find(data => data.code_Achat === codeAchat);
              return (
                <TableRow key={index}>
                  <TableCell>{achat.code_Achat}</TableCell>
                  <TableCell>{achat.user_Dmd}</TableCell>
                  <TableCell>{getGeneralStatus(achat.code_Achat)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openModal(achat)}>
                      <div className='text-blue-600'>
                        <FaEye />
                      </div>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(achat.id_Achat)}>
                      <div className='text-red-700'>
                        <FaTimes />
                      </div>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedAchat && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detail Modal"
          className={classes.modal}
        >
          <Box className={classes.modalHeader}>
            <Typography variant="h6">Détails pour {selectedAchat.code_Achat}</Typography>
            <IconButton onClick={closeModal}>
              <FaTimes />
            </IconButton>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Quantité Reçue</TableCell>
                  <TableCell>Status</TableCell>
                  {/* <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {achatempoData.filter(a => a.code_Achat === selectedAchat.code_Achat).map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.quantite}</TableCell>
                    <TableCell>
                      <TextField
                        value={qteRecu[item.id_Achat] !== undefined ? qteRecu[item.id_Achat] : item.qte_Reçu}
                        onChange={(e) => handleInputChange(item.id_Achat, e.target.value)}
                        variant="outlined"
                        size="small"
                        className={classes.input}
                      />
                    </TableCell>
                    <TableCell>{getStatus(item.quantite, qteRecu[item.id_Achat] || item.qte_Reçu)}</TableCell>
                    {/* <TableCell>
                      <IconButton
                        onClick={() => handleFormSubmit(item.id_Achat)}
                        className={classes.updateButton}
                      >
                        <FaPencilAlt />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            className={classes.validateButton}
            onClick={() => {
              confirmAlert({
                title: 'Confirmation',
                message: 'Are you sure you want to validate this update?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: handleValidation,
                  },
                  {
                    label: 'No',
                    onClick: () => {},
                  },
                ],
              });
            }}
          >
            Valider
          </Button>
          <IconButton onClick={handlePrint} className={classes.printButton}>
            <FaPrint />
          </IconButton>
        </Modal>
      )}
      {/* <div id="print-area" className={classes.printArea}>
        <div className='w-32 mx-auto'>
          <img src={logo} alt="Logo" />
        </div>
        <div className='mt-4'>
          <Typography variant="h5" gutterBottom>Demande Achat</Typography>
        </div>
        <div className='my-10'>
          <table style={{ width: '40%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '4px 0' }}>
                  <Typography variant="h6" gutterBottom>Code Achat </Typography>
                </td>
                <td style={{ padding: '4px 0' }}>
                  <Typography variant="h6" gutterBottom>: {selectedAchat?.code_Achat}</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '4px 0' }}>
                  <Typography variant="h6" gutterBottom>Date </Typography>
                </td>
                <td style={{ padding: '4px 0' }}>
                  <Typography variant="h6" gutterBottom>: {selectedAchat?.date ? new Date(selectedAchat.date).toISOString().split('T')[0] : ''}</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '4px 0' }}>
                  <Typography variant="h6" gutterBottom>User </Typography>
                </td>
                <td style={{ padding: '4px 0' }}>
                  <Typography variant="h6" gutterBottom>: {selectedAchat?.user_Dmd}</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='my-10'>
          <div className='table-container'>
            <table className={`${classes.table} table-auto w-full border-collapse border border-gray-400`}>
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2 text-center">Code</th>
                  <th className="border border-gray-400 p-2 text-center">Designation</th>
                  <th className="border border-gray-400 p-2 text-center">Quantité</th>
                </tr>
              </thead>
              <tbody>
                {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-400 p-2 text-center">{item.code}</td>
                    <td className="border border-gray-400 p-2 text-center">{item.designation}</td>
                    <td className="border border-gray-400 p-2 text-center">{item.quantite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='my-[60px] float-end'>
          <p>Signature__________________________</p>
        </div>
      </div> */}
{/* <div id="print-area" className={`${classes.printArea}`}>
  <div className=' w-32 mx-auto'>
    <img src={logo} alt="Logo" />
  </div>
  <h5 className='mt-4'>Demande Achat</h5>
  <table className='w-2/5'>
    <tbody>
      {[
        { label: 'Code Achat', value: selectedAchat?.code_Achat },
        { label: 'Date', value: selectedAchat?.date ? new Date(selectedAchat.date).toISOString().split('T')[0] : '' },
        { label: 'User', value: selectedAchat?.user_Dmd }
      ].map((item, idx) => (
        <tr key={idx}>
          <td><h6>{item.label}</h6></td>
          <td>: {item.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className='my-4'>
    <table className={`${classes.table} w-full border-collapse border border-gray-500 rounded-lg shadow-sm`}>
      <thead>
        <tr>
          <td className="border  text-[12px] text-center">Code</td>
          <td className="border  text-[12px] text-center">Designation</td>
          <td className="border  text-[12px] text-center">Quantité</td>
          <td className="border  text-[12px] text-center">Projet</td>
        </tr>
      </thead>
      <tbody>
        {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
          <tr key={idx}>
            <td className="border  text-[12px] text-center">{item.code}</td>
            <td className="border  text-[12px] text-center">{item.designation}</td>
            <td className="border  text-[12px] text-center">{item.quantite}</td>
            <td className="border  text-[12px] text-center">{item.nom_Projet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className='my-2 float-right'><p>Signature____________</p></div>
</div> */}
<div id="print-area" className={`${classes.printArea}`}>
  <div className='w-32 mx-auto'>
    <img src={logo} alt="Logo" />
  </div>
  <h5 className='mt-4'>Demande Achat</h5>

  <table className='w-2/5 shadow-y-lg'> 
    <tbody>
      {[
        { label: 'Code Achat', value: selectedAchat?.code_Achat },
        { label: 'Date', value: selectedAchat?.date ? new Date(selectedAchat.date).toISOString().split('T')[0] : '' },
        { label: 'User', value: selectedAchat?.user_Dmd }
      ].map((item, idx) => (
        <tr key={idx}>
          <td><h6>{item.label}</h6></td>
          <td>: {item.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <br />
  <br />
  <div className='my-4'>
    <table className={`${classes.table} w-full border-collapse border border-green-800 rounded-lg shadow-sm`}> 
      <thead>
        <tr className='border'>
          <td className="border  text-[13px] font-medium text-center">Code</td>
          <td className="border  text-[13px] font-medium text-center">Designation</td>
          <td className="border  text-[13px] font-medium text-center">Quantité</td>
          <td className="border  text-[13px] font-medium text-center">Projet</td>
        </tr>
      </thead>
      <tbody>
        {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
          <tr key={idx} className='border'>
            <td className=" border text-[13px] text-center">{item.code}</td>
            <td className=" border text-[13px] text-center">{item.designation}</td>
            <td className=" border text-[13px] text-center">{item.quantite}</td>
            <td className=" border text-[13px] text-center">{item.nom_Projet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <br />
  <div className='my-2 float-right'><p>Signature_____________________</p></div>
</div>



    </Box>
  );
}

export default ListeDemande;

