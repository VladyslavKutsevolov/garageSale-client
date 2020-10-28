/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import React, {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect
} from 'react';
import {
  GET_ALL_SALES,
  CREATE_SALE,
  GET_SALE_DATA,
  GET_ALL_COMMENTS
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

  const createSale = async saleData => {
    try {
      const {
        data: { message: responseMsg, sale }
      } = await request('http://localhost:3001/sales/new', 'POST', saleData);
      dispatch({ type: CREATE_SALE, payload: { sale } });
      setMessage(responseMsg);
    } catch (e) {}
  };

  const getSaleData = async id => {
    try {
      const {
        data: { garage: garageData }
      } = await request(`http://localhost:3001/sales/${id}`);
      dispatch({ type: GET_SALE_DATA, payload: { garageData } });
    } catch (e) {}
  };

  const fetchComments = async productId => {
    try {
      const {
        data: { listOfComments }
      } = await request(`http://localhost:3001/comments/${productId}`);

      dispatch({ type: GET_ALL_COMMENTS, payload: { listOfComments } });
    } catch (e) {}
  };

  const createComment = async productId => {
    try {
      const {
        data: { message: responseMsg, sale }
      } = await request('http://localhost:3001/sales/new', 'POST', saleData);
      dispatch({ type: CREATE_SALE, payload: { sale } });
      setMessage(responseMsg);
    } catch (e) {}
  };

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
    setProductId
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

const useStateData = () => useContext(appContext);

export { StateProvider, useStateData };
