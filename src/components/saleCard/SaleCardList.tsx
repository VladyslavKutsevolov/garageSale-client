/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import moment from 'moment';

import { Grid } from '@material-ui/core';
import { saleCardListStyles } from './styles';

import { useStateData } from '../../context/appContext';

import SaleCard from './SaleCard';
import SaleForm from './SaleForm';

interface ISales {
  province: string;
  city: string;
  cover_photo_url: string;
  description: string;
  id: number;
  title: string;
  seller_id: number;
  created_at: string;
}

const SaleCardList: FC = () => {
  const classes = saleCardListStyles();
  const {
    fetchSales,
    state,
    openNewGarageForm,
    handleGarageFormClose,
    setSaleId,
    searchByCityName
  } = useStateData();

  useEffect(() => {
    const cityname = localStorage.getItem('cityname');
    if (cityname) {
      searchByCityName(cityname);
      return;
    }
    fetchSales();
  }, []);

  const goToSale = (id: number) => {
    setSaleId(id);
  };
  const allSales: ISales[] = state.sales;

  return (
    <>
      <Grid
        className={classes.root}
        container
        spacing={2}
        wrap="wrap"
        component="div"
      >
        {allSales.map(sale => (
          <Grid item key={sale.id}>
            <SaleCard
              selectSale={() => goToSale(sale.id)}
              {...sale}
              daysAgo={moment(sale.created_at).fromNow()}
            />
          </Grid>
        ))}
      </Grid>
      <SaleForm open={openNewGarageForm} handleClose={handleGarageFormClose} />
    </>
  );
};

export default SaleCardList;
