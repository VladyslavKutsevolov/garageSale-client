/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStateData } from '../../context/appContext';

import CategoryList from '../category';
import SaleInfo from './SaleInfo';
import SaleItemList from './saleItemList';

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
  const { state, saleId, getSaleData, setSaleId, fetchSales } = useStateData();

  useEffect(() => {
    if (saleId) {
      localStorage.setItem('saleId', saleId);
    } else {
      setSaleId(localStorage.getItem('saleId'));
      fetchSales();
    }
    getSaleData(Number(saleId));
  }, [saleId]);

  const removedDuplications =
    state.categories &&
    state.categories.reduce((acc, category) => {
      const duplicate = acc.find(c => c.name === category.name);
      return duplicate ? acc : [category, ...acc];
    }, []);
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
              />
            )}
          </div>
        </Grid>
        <Grid className={classes.innerContainer} container justify="center">
          <Grid item className={classes.category}>
            {state.saleData.length ? (
              <CategoryList categories={removedDuplications} />
            ) : null}
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
