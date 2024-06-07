import React, { useState } from 'react';
import { useEffect } from 'react';
import { IoQrCode } from "react-icons/io5";
import { FaBarcode } from "react-icons/fa";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Switch, Paper, Checkbox, IconButton, Typography, Toolbar, TextField,
    TablePagination, Button, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { GrView } from "react-icons/gr";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductData } from '../store/productSlice';
import { deleteProductData, updateProductData, postProductData } from '../store/productSlice';
import JsBarcode from 'jsbarcode';
import { Collapse, Card, CardContent, Menu, MenuItem } from "@material-ui/core";
import Barcode from 'react-barcode';
// import QRCode from 'react-qr-code';
import { QRCode } from 'react-qrcode-logo';
import * as XLSX from 'xlsx'
import { Grid } from '@mui/material';
const ProductTable = () => {
    const dispatch = useDispatch();
    const { productData, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductData());
    }, [dispatch]);

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tabValue, setTabValue] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [expandedUser, setExpandedUser] = useState(null); 

    const [editedProduct, setEditedProduct] = useState({
        Numéro_Article: "",
        Description_Article: "",
        Groupe_Articles: "",
        Date_Actualisation: "",
        code_Barre: "",
    });

    const [formData, setFormData] = useState({
        Numéro_Article: "",
        Description_Article: "",
        Groupe_Articles: "",
        Date_Actualisation: "",
        code_Barre: "",
    });

    const handlePostChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            await dispatch(postProductData(formData));
            setFormData({
                Numéro_Article: "",
                Description_Article: "",
                Groupe_Articles: "",
                Date_Actualisation: "",
                code_Barre: "",
            });
            setOpenAddDialog(false); // Close dialog after adding product
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenEditDialog = (product) => {
        setEditProduct(product);
        setEditedProduct({
            id_Article: product.id_Article,
            Numéro_Article: product.Numéro_Article,
            Description_Article: product.Description_Article,
            Groupe_Articles: product.Groupe_Articles,
            Date_Actualisation: product.Date_Actualisation,
            code_Barre: product.code_Barre,
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setSelectedProduct(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSaveEdit = async () => {
        try {
            await dispatch(updateProductData({ productId: editProduct.id_Article, updatedProductData: editedProduct }));
            setOpenDialog(false);
            dispatch(fetchProductData());
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const filteredProducts = productData ? productData.filter((product) => {
        return (
            (product.Numéro_Article && product.Numéro_Article.toLowerCase().includes(search.toLowerCase())) ||
            (product.Description_Article && product.Description_Article.toLowerCase().includes(search.toLowerCase()))
        );
    }) : [];

    const [anchorEl, setAnchorEl] = useState(null);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(productData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        XLSX.writeFile(workbook, "products.xlsx");
        setAnchorEl(null);
    };

    const printData = () => {
        window.print();
        setAnchorEl(null);
    };

    // const generateBarcode = (code, id) => {
    //     const element = document.getElementById(id);
    //     if (element) {
    //         JsBarcode(element, code);
    //     } else {
    //         console.error(`Element with ID '${id}' not found.`);
    //     }
    // };

    // const sanitizeId = (id) => {
    //     return id.replace(/[^a-zA-Z0-9]/g, '_');
    // };

    const handleAddClick = () => {
        setOpenAddDialog(true);
    };

    const handleSearchChange = (event) => {
        // setSearch(event.target.value);
        const { value } = event.target;
        setSearch(value);
        setTabValue(0);
        setPage(0);
    };
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handleExpandUser = (user) => {
        if (expandedUser === user.id_Article) {
          setExpandedUser(null);
        } else {
          setExpandedUser(user.id_Article);
        }
      };
const handleDeleteProduct = () => {
    if (selectedProduct) {
        // Dispatch the 'deleteProductData' action with the correct ID property
        dispatch(deleteProductData(selectedProduct.id_Article));
    }
    // Close the delete dialog after successful deletion
    handleDeleteDialogClose();
};

const downloadQRCode = (numArticle) => {
    const canvas = document.getElementById(`qrCodeCanvas-${numArticle}`);
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${numArticle}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

const downloadBarcode = (numArticle) => {
    const canvas = document.getElementById(`barcodeCanvas-${numArticle}`);
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${numArticle}-barcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};
useEffect(() => {
    productData.forEach((product) => {
        const canvas = document.getElementById(`barcodeCanvas-${product.Numéro_Article}`);
        if (canvas) {
            JsBarcode(canvas, product.Numéro_Article, {
                format: "CODE128",
                displayValue: true,
                fontSize: 18
            });
        }
    });
}, [productData]);
    return (
        <>
            <Paper>
            <Toolbar>
                <Typography variant="h6" style={{ flex: '1' }}>Product Table</Typography>
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
                <button onClick={handleAddClick} className='bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-md mx-1'>
                        Ajouter <Add />
                </button>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    value={search}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: <Search />
                    }}
                />
            </Toolbar>
            <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="All" />
                <Tab label="Publish" />
                <Tab label="Unpublish" />
            </Tabs>
                <TableContainer>
                    <Table size={"small"}>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox color="primary" />
                                </TableCell>
                                <TableCell>Numéro d'article</TableCell>
                                <TableCell>Description article</TableCell>
                                <TableCell>Groupe d'articles</TableCell>
                                <TableCell>Date d'actualisation</TableCell>
                                {/* <TableCell>id</TableCell> */}
                                <TableCell>Published</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                <>
                                
                                <TableRow key={product.id_Article}>
                                    <TableCell padding="checkbox">
                                        <Checkbox color="primary" />
                                    </TableCell>
                                    <TableCell>{product.Numéro_Article}</TableCell>
                                    <TableCell>{product.Description_Article}</TableCell>
                                    <TableCell>{product.Groupe_Articles}</TableCell>
                                    <TableCell>{product.Date_Actualisation}</TableCell>
                                    {/* <TableCell>{product.id_Article}</TableCell> */}
                                    <TableCell>
                                        <Switch
                                            checked={product.published}
                                            onChange={() => handleTogglePublished(product.id_article)}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <button
                                            type="button"
                                            className="text-green-600 hover:text-green-900 focus:outline-none"
                                            onClick={() => handleOpenEditDialog(product)}>
                                            <Edit/>
                                        </button>
                                        <IconButton color="secondary" onClick={() => handleDeleteClick(product)}><Delete /></IconButton>
                                        <button
                                            type="button"
                                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                                            onClick={() => handleExpandUser(product)}
                                            >
                                            <GrView />
                                            <path d="M10 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-3m-4 8v4m0-8V6m4 8h3m2-3h-8"></path>
                                        </button>
                                        <div style={{ display: 'none' }}>
                                            <QRCode
                                                id={`qrCodeCanvas-${product.Numéro_Article}`}
                                                value={product.Numéro_Article}
                                                size={150}
                                                level={"H"}
                                                includeMargin={true}
                                                renderAs="canvas"
                                            />
                                        </div>
                                        <canvas id={`barcodeCanvas-${product.Numéro_Article}`} style={{ display: 'none' }}></canvas>

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {/* <TableCell colSpan={9} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                        <Collapse in={expandedUser === product.id_Article} timeout="auto" unmountOnExit>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">Product Details</Typography>
                                                    <Typography><strong>Numéro article: </strong>{product.Numéro_Article}</Typography>
                                                    <Typography><strong>Description article: </strong>{product.Description_Article}</Typography>
                                                    <Typography><strong>Groupe d'articles: </strong>{product.Groupe_Articles}</Typography>
                                                    <Typography><strong>Date actualisation: </strong>{product.Date_Actualisation}</Typography>
                                                    <Typography><strong>Code barre: </strong></Typography>
                                                    <Barcode value={product.Numéro_Article} />

                                                    <button onClick={() => downloadBarcode(product.Numéro_Article)} className='flex items-center bg-blue-600 rounded-md py-2 px-3 text-white'>
                                                       <p className='px-1'>Télécharge CodeBare</p><FaBarcode />
                                                    </button>
                                                    <Typography><strong>QRcode </strong></Typography>
                                                    <QRCode value={product.Numéro_Article} size={156} />
                                                    <button onClick={() => downloadQRCode(product.Numéro_Article)} className='flex items-center bg-blue-600 rounded-md py-2 px-3 text-white'>
                                                       <p className='px-1'>Télécharge QRCode</p><IoQrCode />
                                                    </button>
                                                </CardContent>
                                            </Card>
                                        </Collapse>
                                    </TableCell> */}
                                    <TableCell colSpan={9} style={{ paddingBottom: 0, paddingTop: 0 }}>
       <Collapse in={expandedUser === product.id_Article} timeout="auto" unmountOnExit>
           <Grid container spacing={2}>
               <Grid item xs={4}>
                   <Card>
                       <CardContent>
                           <Typography variant="h6">Product Details</Typography>
                           <Typography><strong>Numéro article: </strong>{product.Numéro_Article}</Typography>
                           <Typography><strong>Description article: </strong>{product.Description_Article}</Typography>
                           <Typography><strong>Groupe d'articles: </strong>{product.Groupe_Articles}</Typography>
                           <Typography><strong>Date actualisation: </strong>{product.Date_Actualisation}</Typography>
                       </CardContent>
                   </Card>
               </Grid>
               <Grid item xs={4}>
                   <Card>
                       <CardContent>
                           <Typography><strong>Code barre: </strong></Typography>
                           <Barcode value={product.Numéro_Article} />
                           <button onClick={() => downloadBarcode(product.Numéro_Article)} className='flex items-center bg-blue-600 rounded-md py-2 px-3 text-white'>
                               <p className='px-1'>Télécharge CodeBare</p><FaBarcode />
                           </button>
                       </CardContent>
                   </Card>
               </Grid>
               <Grid item xs={4}>
                   <Card>
                       <CardContent>
                           <Typography><strong>QRcode </strong></Typography>
                           <QRCode value={product.Numéro_Article} size={156} />
                           <button onClick={() => downloadQRCode(product.Numéro_Article)} className='flex items-center bg-blue-600 rounded-md py-2 px-3 text-white'>
                               <p className='px-1'>Télécharge QRCode</p><IoQrCode />
                           </button>
                       </CardContent>
                   </Card>
               </Grid>
           </Grid>
       </Collapse>
   </TableCell>
                                </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 20, 50]}
                        component="div"
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </TableContainer>

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
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                                Edit Product
                                            </h3>
                                            <div className="mt-2">
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Numéro d'article"
                                                    name="Numéro_Article"
                                                    value={editedProduct.Numéro_Article}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Description article"
                                                    name="Description_Article"
                                                    value={editedProduct.Description_Article}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Groupe d'articles"
                                                    name="Groupe_Articles"
                                                    value={editedProduct.Groupe_Articles}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Date d'actualisation"
                                                    name="Date_Actualisation"
                                                    value={editedProduct.Date_Actualisation}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Code Barre"
                                                    name="code_Barre"
                                                    value={editedProduct.code_Barre}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button onClick={handleSaveEdit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Save
                                    </button>
                                    <button onClick={handleCloseDialog} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill in the form to add a new product.
                        </DialogContentText>
                        <form>
                            <TextField
                                margin="dense"
                                name="Numéro_Article"
                                label="Numéro d'article"
                                type="text"
                                fullWidth
                                value={formData.Numéro_Article}
                                onChange={handlePostChange}
                            />
                            <TextField
                                margin="dense"
                                name="Description_Article"
                                label="Description article"
                                type="text"
                                fullWidth
                                value={formData.Description_Article}
                                onChange={handlePostChange}
                            />
                            <TextField
                                margin="dense"
                                name="Groupe_Articles"
                                label="Groupe d'articles"
                                type="text"
                                fullWidth
                                value={formData.Groupe_Articles}
                                onChange={handlePostChange}
                            />
                            <TextField
                                margin="dense"
                                name="Date_Actualisation"
                                label="Date d'actualisation"
                                type="text"
                                fullWidth
                                value={formData.Date_Actualisation}
                                onChange={handlePostChange}
                            />
                            <TextField
                                margin="dense"
                                name="code_Barre"
                                label="Code Barre"
                                type="text"
                                fullWidth
                                value={formData.code_Barre}
                                onChange={handlePostChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenAddDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteProduct} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </>
    );
};

export default ProductTable;
