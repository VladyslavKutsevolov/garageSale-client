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
  CREATE_PRODUCT,
  FILTER_BY_CATEGORY
} from './types';

import useHttp from '../hooks/useHttp';

import appReducer from './appReducer';

const appContext = createContext();

const initialState = {
  sales: [],
  saleData: [],
  products: [],
  loginUser: []
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [saleId, setSaleId] = useState(null);
  const [openNewGarageForm, setNewGarageForm] = useState(false);
  const [openNewProductForm, setNewProductForm] = useState(false);
  const [productId, setProductId] = useState(null);

  const {
    request,
    loading,
    error,
    clearError,
    clearMessage,
    setMessage,
    message
  } = useHttp();

  const handleProductOpen = () => {
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

  const fetchSales = useCallback(async () => {
    try {
      const {
        data: { listOfSales }
      } = await request('http://localhost:3001/sales');

      dispatch({ type: GET_ALL_SALES, payload: { listOfSales } });
    } catch (e) {}
  }, []);

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
      const {
        data: { categories }
      } = await request(`http://localhost:3001/products/categories/${id}`);

      dispatch({
        type: GET_SALE_DATA,
        payload: { garageData, saleId: id, categories }
      });
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

  /// / ?????? What for this func?
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

  const getProductsForCategory = async (categoryName, idOfSale) => {
    try {
      if (categoryName === 'All') {
        return getSaleData(idOfSale);
      }
      const {
        data: { listOfProducts }
      } = await request(
        `http://localhost:3001/products/category/${categoryName}/${idOfSale}`
      );
      console.log('listOfProducts', listOfProducts);
      dispatch({
        type: FILTER_BY_CATEGORY,
        payload: { listOfProducts }
      });
    } catch (e) {}
  };

  useEffect(() => {
    clearError();
    clearMessage();
  }, [error, clearError, message, clearMessage]);

  const value = {
    loading,
    message,
    error,
    fetchSales,
    fetchComments,
    createComment,
    state,
    dispatch,
    createSale,
    getSaleData,
    getLoginUser,
    createProduct,
    openNewGarageForm,
    openNewProductForm,
    handleGarageFormClose,
    handleGarageFormOpen,
    handleProductOpen,
    handleProductClose,
    productId,
    setProductId,
    saleId,
    setSaleId,
    getProductsForCategory
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

const useStateData = () => useContext(appContext);

export { StateProvider, useStateData };
