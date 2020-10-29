/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { useStateData } from '../../context/appContext';

import SaleItem from './SaleItem';
import SaleItemForm from './SaleItemForm';
import SendMsg from './SendMsg';

const intitialInfo = {
  title: '',
  username: '',
  phone: '',
  price: ''
}

const SaleItemList = () => {
  const { state, openNewProductForm, handleProductClose, openBuyForm, handleBuyClose, getProductData } = useStateData();
  const [itemId, setItemId] = useState(null);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const filterItemData = () => {
      return state.saleData.filter(item => item.id === itemId);
    };

    const productData = filterItemData();
    if (productData.length>0) {
      setProductInfo(productData[0]);
    };
  }, [itemId, setProductInfo]);
  console.log('product Information', productInfo)

  return (
    <>
      {state.saleData.map(product => (
        <SaleItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          productSummary={product.product_summary}
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
        handleClose={()=>setProductInfo({})}
        title={productInfo.title}
        price={productInfo.price}
        buyer={'buy_user'}
        buyerPhone={12042938913}
        seller={productInfo.username}
        sellerPhone={productInfo.phone}

      />
    </>
  );
};

export default SaleItemList;
