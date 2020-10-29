/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { useStateData } from '../../context/appContext';

import SaleItem from './SaleItem';
import SaleItemForm from './SaleItemForm';
import SendMsg from './SendMsg';

const SaleItemList = () => {
  const { state, openNewProductForm, handleProductClose } = useStateData();
  const [itemId, setItemId] = useState(null);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const filterItemData = () => {
      return state.saleData.filter(item => item.id === itemId);
    };

    const productData = filterItemData();
    if (productData.length > 0) {
      setProductInfo(productData[0]);
    };
  }, [itemId, setProductInfo]);

  return (
    <>
      {state.saleData.map(product => (
        <SaleItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          productSummary={product.product_summary}
          sold={product.sold}
          imageUrl={product.image_url}
          setItemId={setItemId}
        />
      ))}
      <SaleItemForm
        open={openNewProductForm}
        handleClose={handleProductClose}
      />
      <SendMsg
        open={Object.keys(productInfo).length !== 0}
        handleClose={() => setProductInfo({})}
        title={productInfo.title}
        price={productInfo.price}
        buyer={state.loginUser.username}
        buyerPhone={state.loginUser.phone}
        seller={productInfo.username}
        sellerPhone={productInfo.phone}
        setItemId={setItemId}
      />
    </>
  );
};

export default SaleItemList;
