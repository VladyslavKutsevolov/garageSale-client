/* eslint-disable quotes */
import React from 'react';
import { useStateData } from '../../context/appContext';

import SaleItem from './SaleItem';
import SaleItemForm from './SaleItemForm';

const SaleItemList = () => {
  const { state, openNewProductForm, handleProductClose } = useStateData();

  return (
    <>
      {state.saleData.map(product => (
        <SaleItem
          key={product.id}
          title={product.title}
          price={product.price}
          productSummary={product.product_summary}
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
