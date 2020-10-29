/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { useStateData } from '../../context/appContext';

import SaleItem from './SaleItem';
import SaleItemForm from './SaleItemForm';
import SendMsg from './SendMsg';




const SaleItemList = () => {
  const { state, openNewProductForm, handleProductClose, openBuyForm, handleBuyClose, setProductId, productId } = useStateData();
  const [itemId, setItemId] = useState(null);
  const [productInfo, setProductInfo] = useState({});

  const getProductId = (id) => {

    setProductId(id);
  }

  console.log("state insitde saleitem", state)
  useEffect(() => {
    const filterItemData = () =>
      state.saleData.filter(item => item.id === itemId);

    const productData = filterItemData();
    if (productData.length > 0) {
      setProductInfo(productData[0]);
    }
  }, [itemId, setProductInfo]);

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
          id={product.id}
          title={product.title}
          price={product.price}
          productSummary={product.description}
          sold={product.sold}
          imageUrl={product.image_url}
          getProductId={() => getProductId(product.id)}
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
        // buyer={state.loginUser.username}
        // buyerPhone={state.loginUser.phone}
        seller={productInfo.username}
        sellerPhone={productInfo.phone}
        setItemId={setItemId}
      />
    </>
  );
};

export default SaleItemList;
