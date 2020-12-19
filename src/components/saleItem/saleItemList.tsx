/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
import React, { useState, useEffect, FC } from 'react';
import { useStateData } from '../../context/appContext';

import SaleItem from './SaleItem';
import SendMsg from './SendMsg';

interface ISaleData {
  product_id: number;
  product_title: string;
  title: string;
  price: string;
  description: string;
  sold: boolean;
  image_url: string;
  seller_id?: number;
  username: string;
  phone: number;
}

const productInfoState: ISaleData = {
  description: '',
  image_url: '',
  product_id: 0,
  seller_id: 0,
  sold: false,
  title: '',
  phone: 0,
  price: '',
  product_title: '',
  username: ''
};

const SaleItemList: FC = () => {
  const { state, setProductId } = useStateData();
  const [itemId, setItemId] = useState<number>(0);
  const [productInfo, setProductInfo] = useState<ISaleData>(productInfoState);

  const saledata: ISaleData[] = state.saleData;

  useEffect(() => {
    const filterItemData = () =>
      saledata.filter(item => item.product_id === itemId);

    const productData = filterItemData();
    if (productData.length > 0) {
      setProductInfo(productData[0]);
    }
  }, [itemId]);

  const getProductId = (id: number) => {
    setProductId(id);
  };

  return (
    <>
      {saledata.map(product => (
        <SaleItem
          key={product.product_id}
          id={product.product_id}
          title={product.product_title || product.title}
          price={product.price}
          productSummary={product.description}
          sold={product.sold}
          imageUrl={product.image_url}
          // seller_id={product.seller_id}
          getProductId={() => getProductId(product.product_id)}
          setItemId={setItemId}
        />
      ))}
      <SendMsg
        // open={Object.keys(productInfo).length !== 0}
        handleSendClose={() => setProductInfo(productInfoState)}
        title={productInfo.product_title}
        price={productInfo.price}
        buyer={state.loginUser.username}
        buyerPhone={state.loginUser.phone}
        // seller={productInfo.username}
        sellerPhone={productInfo.phone}
        setItemId={setItemId}
      />
    </>
  );
};

export default SaleItemList;
