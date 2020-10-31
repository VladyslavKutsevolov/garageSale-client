/* eslint-disable react/prop-types */
import { CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Button } from '@material-ui/core';
import { useStateData } from '../../context/appContext';
import SaleEditForm from './SaleEditForm';

const useStyles = makeStyles(theme => ({
  media: {
    width: '40rem',
    height: '20rem'
  },
  boxStyle: {
    boxShadow: '4px 6px 15px -6px rgba(0,0,0,0.5)',
    maxWidth: '40rem',
    marginTop: '2rem',
    flexBasis: '45%',
    justifyContent: 'center'
  }
}));

const SaleInfo = ({ saleImg, title, description }) => {
  const classes = useStyles();
  const { deleteGarage, saleId } = useStateData();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Handle Edit
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // Handle Delete dialog
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const deleteSale = garageId => {
    deleteGarage(garageId);
    handleCloseDelete();
  };

  return (
    <>
      <div className={classes.boxStyle}>
        <CardMedia className={classes.media} image={saleImg} />
        <Typography component="h5" variant="h5">
          {title}
        </Typography>
        <Typography>
          <ListItemIcon>
            <EditIcon onClick={handleOpenEdit} />
            <DeleteIcon onClick={handleOpenDelete} />
          </ListItemIcon>
        </Typography>
        <Typography component="p" variant="subtitle1">
          {description}
        </Typography>
      </div>
      <div>
        <SaleEditForm open={openEdit} handleClose={handleCloseEdit} />

        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">DELETE GARAGE SALE</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete your garage sale?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => deleteSale(saleId)}
              color="primary"
              autoFocus
            >
              YES
            </Button>

            <Button onClick={handleCloseDelete} color="primary">
              NO
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default SaleInfo;
