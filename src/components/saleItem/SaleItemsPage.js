import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom';
import SaleItemList from './saleItemList';
import SaleInfo from './SaleInfo';
import CategoryList from '../category';
import { useStateData } from '../../context/appContext';

import SaleEditForm from './SaleEditForm';

const useStyle = makeStyles({
  innerContainer: {
    marginTop: '6rem',
    flexBasis: '25%'
  },
  root: {
    justifyContent: 'space-evenly'
  },
  category: {
    marginBottom: '2rem'
  },
  saleInfo: {
    marginTop: '6rem'
  }
});

const SaleItemsPage = () => {
  const classes = useStyle();
  const {
    state,
    saleId,
    getSaleData,
    setSaleId,
    fetchSales,
    fetchComments,
    deleteGarage
  } = useStateData();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [garageStatus, setGarageStatus] = useState(false);

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
    // setSaleId(null);
    handleCloseDelete();
    setGarageStatus(true);
  };

  console.log('State change', state);

  useEffect(() => {
    if (saleId) {
      localStorage.setItem('saleId', saleId);
    } else {
      setSaleId(localStorage.getItem('saleId'));
      fetchSales();
    }

    getSaleData(saleId);
  }, [saleId]);

  return (
    <>
      <Grid container className={classes.root} wrap="wrap" justify="center">
        <Grid item>
          <div className={classes.saleInfo}>
            {state.saleInfo && (
              <SaleInfo
                saleImg={state.saleInfo.cover_photo_url}
                title={state.saleInfo.title}
                description={state.saleInfo.description}
                handleOpenEdit={handleOpenEdit}
                handleOpenDelete={handleOpenDelete}
              />
            )}
          </div>
          <div>
            <SaleEditForm open={openEdit} handleClose={handleCloseEdit} />

            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                DELETE GARAGE SALE
              </DialogTitle>
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
            <Link to="/" open={garageStatus} />
          </div>
        </Grid>
        <Grid className={classes.innerContainer} container justify="center">
          <Grid item className={classes.category}>
            <CategoryList />
          </Grid>

          <Grid item>
            <SaleItemList />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SaleItemsPage;
