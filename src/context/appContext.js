/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import React, {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback
} from 'react';
import {
  GET_ALL_SALES,
  CREATE_SALE,
  GET_SALE_DATA,
  GET_ALL_COMMENTS,
  CREATE_COMMENT,
  GET_PRODUCT_DATA,
  GET_USER_DATA,
  CREATE_PRODUCT
} from './types';

import useHttp from '../hooks/useHttp';

import appReducer from './appReducer';

const appContext = createContext();

const initialState = {
  sales: [],
  saleData: [],
  products: []
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [saleId, setSaleId] = useState(null);
  const [openNewGarageForm, setNewGarageForm] = useState(false);
  const [openNewProductForm, setNewProductForm] = useState(false);
  const [openBuyForm, setBuyForm] = useState(false);
  const [productId, setProductId] = useState(null);

  const {
    request,
    error,
    clearError,
    clearMessage,
    setMessage,
    message
  } = useHttp();

  const handleProductOpen = () => {
    console.log('click', openNewProductForm);
    setNewProductForm(true);
  };

  const handleProductClose = () => {
    setNewProductForm(false);
  };

  const handleGarageFormOpen = () => {
    setNewGarageForm(true);
  };

  const handleGarageFormClose = () => {
    setNewGarageForm(false);
  };

  const handleBuyOpen = () => {
    setBuyForm(true);
  };

  const handleBuyClose = () => {
    setBuyForm(false);
  };

  const fetchSales = async () => {
    try {
      const {
        data: { listOfSales }
      } = await request('http://localhost:3001/sales');

      dispatch({ type: GET_ALL_SALES, payload: { listOfSales } });
    } catch (e) {}
  };

  const createSale = useCallback(async saleData => {
    try {
      const {
        data: { message: responseMsg, sale }
      } = await request('http://localhost:3001/sales/new', 'POST', saleData);

      dispatch({ type: CREATE_SALE, payload: { sale } });
      setMessage(responseMsg);
    } catch (e) {}
  }, []);

  const getSaleData = async id => {
    try {
      const {
        data: { garage: garageData }
      } = await request(`http://localhost:3001/sales/${id}`);
      dispatch({ type: GET_SALE_DATA, payload: { garageData } });
    } catch (e) {}
  };

  const fetchComments = async itemId => {

    try {
      const {
        data: { listOfComments }
      } = await request(`http://localhost:3001/comments/${itemId}`);

      dispatch({ type: GET_ALL_COMMENTS, payload: { listOfComments, itemId } });
    } catch (e) {}
  };

  const getProductData = async id => {
    try {
      const {
        data: { product: productData }
      } = await request(`http://localhost:3001/products/${id}`);

      dispatch({ type: GET_PRODUCT_DATA, payload: { productData } });
    } catch (e) {}
  };

  const getLoginUser = async username => {
    try {
      const {
        data: { loginUser: userData }
      } = await request(`http://localhost:3001/users/${username}`);
      console.log("userData", userData)
      dispatch({ type: GET_USER_DATA, payload: { userData } });
    } catch (e) {}
  };

  const createComment = async (itemId, commentData) => {
    try {
      const {
        data: { listOfComments }
      } = await request(
        `http://localhost:3001/comments/${itemId}/newComment`,
        'POST',
        commentData
      );
      console.log("after async call")
      dispatch({ type: CREATE_COMMENT, payload: { listOfComments, itemId } });
    } catch (e) {}
  };
  const createProduct = useCallback(async productData => {
    try {
      const {
        data: { message: responseMsg, product }
      } = await request(
        'http://localhost:3001/products/new',
        'POST',
        productData
      );

      dispatch({ type: CREATE_PRODUCT, payload: { product } });

      setMessage(responseMsg);
    } catch (e) {}
  }, []);

  useEffect(() => {
    clearError();
    clearMessage();
  }, [error, clearError, message, clearMessage]);

  const value = {
    fetchSales,
    fetchComments,
    createComment,
    state,
    createSale,
    getSaleData,
    getProductData,
    getLoginUser,
    createProduct,
    openNewGarageForm,
    openNewProductForm,
    openBuyForm,
    handleGarageFormClose,
    handleGarageFormOpen,
    handleProductOpen,
    handleProductClose,
    handleBuyClose,
    handleBuyOpen,
    productId,
    setProductId,
    saleId,
    setSaleId
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

const useStateData = () => useContext(appContext);

export { StateProvider, useStateData };
