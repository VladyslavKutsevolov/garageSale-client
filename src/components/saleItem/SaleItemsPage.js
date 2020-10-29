import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStateData } from '../../context/appContext';

import CategoryList from '../category';
import SaleInfo from './SaleInfo';
import SaleItemList from './saleItemList';

const useStyle = makeStyles({
  innerContainer: {
    marginTop: '4.1rem',
    flexBasis: '45%'
  },
  root: {
    justifyContent: 'space-between'
  },
  categoryContainer: {
    position: 'fixed',
    textAlign: 'center'
  }
});

const SaleItemsPage = () => {
  const classes = useStyle();
  const { state, saleId, getSaleData, setSaleId, fetchSales } = useStateData();

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
      <Grid container className={classes.root} wrap="wrap">
        <Grid item>
          <div className={classes.categoryContainer}>
            <div>
              <CategoryList />
            </div>
            {state.saleInfo && (
              <SaleInfo
                saleImg={state.saleInfo.cover_photo_url}
                title={state.saleInfo.title}
                description={state.saleInfo.description}
              />
            )}
          </div>
        </Grid>
        <Grid className={classes.innerContainer} container justify="center">
          <Grid item>
            <SaleItemList />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SaleItemsPage;
