/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { useStateData } from '../../context/appContext';

import SaleItem from './SaleItem';
import SaleItemForm from './SaleItemForm';
import SendMsg from './SendMsg';

const SaleItemList = () => {
  const {
    state,
    openNewProductForm,
    handleProductClose,
    setProductId
  } = useStateData();
  const [itemId, setItemId] = useState(null);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const filterItemData = () => {
      return state.saleData.filter(item => item.product_id === itemId);
    };

    const productData = filterItemData();
    if (productData.length > 0) {
      setProductInfo(productData[0]);
    };
  }, [itemId]);

  const getProductId = id => {
    setProductId(id);
  };

  useEffect(() => {
    localStorage.setItem('state-data', JSON.stringify(state.saleData));
  }, [state]);

  return (
    <>
      {state.saleData.map(product => (
        <SaleItem
          key={product.product_id}
          id={product.product_id}
          title={product.product_title || product.title}
          price={product.price}
          productSummary={product.description}
          sold={product.sold}
          imageUrl={product.image_url}
          getProductId={() => getProductId(product.product_id)}
          setItemId={setItemId}
        />
      ))}
      <SaleItemForm
        open={openNewProductForm}
        handleClose={handleProductClose}
      />
      <SendMsg
        open={Object.keys(productInfo).length !== 0}
        handleSendClose={() => setProductInfo({})}
        title={productInfo.product_title}
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
