import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useStateData } from '../../context/appContext';

import SaleCard from './SaleCard';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
    justifyItems: 'center'
  }
});

const SaleCardList = () => {
  const classes = useStyles();
  const { fetchSales, state, getSaleData } = useStateData();

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const goToSale = id => {
    getSaleData(id);
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
    </>
  );
};

export default SaleCardList;
