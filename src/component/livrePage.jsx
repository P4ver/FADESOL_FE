
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Modal, Button } from '@mui/material';
import { FaCheck ,FaEye} from 'react-icons/fa';

// import { , FaPencilAlt, FaCheck, FaTimes, FaTruck, FaPrint } from 'react-icons/fa';

const DeliveredItemsPage = () => {
  const { achatempoData } = useSelector(state => state.achatempo);
  const [expandedItem, setExpandedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const authState = useSelector(state => state.auth);
  const user = authState.user;

  const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);

  // Filter code_Achat where all demands are "Livré" (qte_Reçu === quantite)
  const uniqueCodeAchats = [...new Set(filteredAchatData.map(item => item.code_Achat))]
    .filter(codeAchat => 
      filteredAchatData
        .filter(item => item.code_Achat === codeAchat)
        .every(item => item.qte_Reçu === item.quantite)
    );

  const handleExpand = (codeAchat) => {
    setExpandedItem(codeAchat);
    setModalData(achatempoData.filter(item => item.code_Achat === codeAchat && item.qte_Reçu === item.quantite));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setExpandedItem(null);
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>Delivered Items</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Code-Achat</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueCodeAchats.map((codeAchat, index) => {
              const item = achatempoData.find(item => item.code_Achat === codeAchat);
              return (
                <TableRow key={index}>
                  <TableCell>{item.code_Achat}</TableCell>
                  <TableCell>{item.user_Dmd}</TableCell>
                  <TableCell>
                    <span className='text-green-600'>
                      <FaCheck />
                    </span>
                      Livré
                  </TableCell>
                  <TableCell>
                    <Button  onClick={() => handleExpand(item.code_Achat)}>
                    <div className='text-xlg text-center'>
                      <FaEye />
                    </div>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" id="modal-title" gutterBottom>
            Details
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Quantite</TableCell>
                  <TableCell>Quantite Reçu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modalData.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.quantite}</TableCell>
                    <TableCell>{item.qte_Reçu}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
}

export default DeliveredItemsPage;
