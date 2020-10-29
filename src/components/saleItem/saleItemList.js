/* eslint-disable quotes */
import React, { useEffect } from 'react';
import { useStateData } from '../../context/appContext';

import SaleItem from './SaleItem';
import SaleItemForm from './SaleItemForm';

const SaleItemList = () => {
  const { state, openNewProductForm, handleProductClose } = useStateData();

  useEffect(() => {
    state.saleData = JSON.parse(localStorage.getItem('state-data'));
  }, []);

  useEffect(() => {
    localStorage.setItem('state-data', JSON.stringify(state.saleData));
  }, [state]);

  return (
    <>
      {state.saleData.map(product => (
        <SaleItem
          key={product.id}
          title={product.title}
          price={product.price}
          productSummary={product.description}
          imageUrl={product.image_url}
        />
      ))}
      <SaleItemForm
        open={openNewProductForm}
        handleClose={handleProductClose}
      />
    </>
  );
};

export default SaleItemList;
