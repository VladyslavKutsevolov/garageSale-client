/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useStateData } from '../../context/appContext';

import SaleCard from './SaleCard';
import SaleForm from './SaleForm';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(30rem, 1fr))',
    justifyItems: 'center'
  }
});

const SaleCardList = () => {
  const classes = useStyles();
  const {
    fetchSales,
    state,
    openNewGarageForm,
    handleGarageFormClose,
    setSaleId
  } = useStateData();

  useEffect(() => {
    fetchSales();
  }, []);

  const goToSale = id => {
    setSaleId(id);
  };

  return (
    <>
      <Grid
        className={classes.root}
        container
        spacing={2}
        wrap="wrap"
        component="div"
      >
        {state.sales.map(data => (
          <Grid item key={data.id}>
            <SaleCard selectSale={() => goToSale(data.id)} {...data} />
          </Grid>
        ))}
      </Grid>
      <SaleForm open={openNewGarageForm} handleClose={handleGarageFormClose} />
    </>
  );
};

export default SaleCardList;
