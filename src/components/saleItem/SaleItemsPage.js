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
  const { state, saleId } = useStateData();

  const getSaleData = () => state.sales.filter(sale => sale.id === saleId)[0];

  const [saleInfo, setSaleinfo] = useState(getSaleData());

  useEffect(() => {
    localStorage.setItem('saleInfo', JSON.stringify(saleInfo));
  }, [saleInfo]);

  useEffect(() => {
    setSaleinfo(JSON.parse(localStorage.getItem('saleInfo')));
  }, []);

  return (
    <>
      <Grid container className={classes.root} wrap>
        <Grid item>
          <div className={classes.categoryContainer}>
            <div>
              <CategoryList />
            </div>
            {saleInfo && (
              <SaleInfo
                saleImg={saleInfo.cover_photo_url}
                title={saleInfo.title}
                description={saleInfo.description}
              />
            )}
          </div>
        </Grid>
        <Grid
          className={classes.innerContainer}
          container
          justify="center"
          wrap
        >
          <Grid item>
            <SaleItemList />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SaleItemsPage;
