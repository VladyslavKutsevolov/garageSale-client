/* eslint-disable quotes */
import React from 'react';
import { useStateData } from '../../context/appContext';

import SaleItem from './SaleItem';
import SaleItemForm from './SaleItemForm';
import SendMsg from './SendMsg';




const SaleItemList = () => {
  const { state, openNewProductForm, handleProductClose, openBuyForm, handleBuyClose, setProductId, productId } = useStateData();
  console.log("productId", productId)
  const getProductId = (id) => {
    console.log("id consol", id)
    setProductId(id);
  }

  return (
    <>
      {state.saleData.map(product => (
        <SaleItem
          key={product.id}
          title={product.title}
          price={product.price}
          productSummary={product.product_summary}
          imageUrl={product.image_url}
          getProductId={() => getProductId(product.id)}
        />
      ))}
      <SaleItemForm
        open={openNewProductForm}
        handleClose={handleProductClose}

      />
      <SendMsg
        open={openBuyForm}
        handleClose={handleBuyClose}
        title={"Jae test"}
        price={40}
        buyer={'buy_user'}
        buyerPhone={12042938913}
        seller={'sell_user'}
        sellerPhone={12042938913}
      />
    </>
  );
};

export default SaleItemList;
