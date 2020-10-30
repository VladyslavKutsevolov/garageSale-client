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

  const getProductId = id => {
    setProductId(id);
  };

  useEffect(() => {
    const filterItemData = () =>
      state.saleData.filter(item => item.id === itemId);

    const productData = filterItemData();
    if (productData.length > 0) {
      setProductInfo(productData[0]);
    }
  }, [itemId, setProductInfo]);

  console.log('State saleData', state);

  return (
    <>
      {state.saleData.map(product => (
        <SaleItem
          key={product.id}
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
        buyer={state.loginUser.username}
        buyerPhone={state.loginUser.phone}
        seller={productInfo.username}
        sellerPhone={productInfo.phone}
        setItemId={setItemId}
        itemId={itemId}
      />
    </>
  );
};

export default SaleItemList;
