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
    setProductId,
    openTxtMsg,
    handleSendMsgClse,
    productId,
    setMsg,
    msg
  } = useStateData();

  const [itemId, setItemId] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const { text } = msg;

  const getProductId = id => {
    setProductId(id);
  };

  //console.log('Item Id change', productId, 'Product Information', productInfo);

  useEffect(() => {
    const filterItemData = () =>
      state.saleData.filter(item => item.product_id === productId);
    const productData = filterItemData();
    if (productData.length > 0) {
      setProductInfo(productData[0]);
      //console.log('product Data right after', productData)
    }
  }, [productId]);

  useEffect(() => {
    localStorage.setItem('state-data', JSON.stringify(state.saleData));
  }, [state]);

  useEffect(() => {
    setMsg({
      text: {
        ...text,
        textMessage: `${state.loginUser.username} will buy ${productInfo.product_title} by $ ${productInfo.price} from ${productInfo.username}. `
      }
    });
    console.log('Msg after', msg)
  }, [productInfo]);

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
        open={openTxtMsg}
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
