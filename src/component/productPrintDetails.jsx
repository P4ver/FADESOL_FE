import React from 'react';
import { Collapse, Card, CardContent, Typography } from "@material-ui/core";
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Switch, Paper, Checkbox, IconButton, Toolbar, TextField,
    TablePagination, Button, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
const ProductDetailsPrint = ({ product, expandedUser }) => {
    return (
        <TableRow>
            <TableCell colSpan={9} style={{ paddingBottom: 0, paddingTop: 0 }}>
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
                            <Typography><strong>QRcode </strong></Typography>
                            <QRCode value={product.Numéro_Article} size={156} />
                        </CardContent>
                    </Card>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export default ProductDetailsPrint;
