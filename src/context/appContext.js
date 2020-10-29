/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import React, {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect
} from 'react';
import { GET_ALL_SALES, CREATE_SALE, GET_SALE_DATA, GET_USER_DATA } from './types';

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
  const [openNewGarageForm, setNewGarageForm] = useState(false);
  const [openNewProductForm, setNewProductForm] = useState(false);

  const {
    request,
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

  const getLoginUser = async username => {
    try {
      const {
        data: { loginUser: userData }
      } = await request(`http://localhost:3001/users/${username}`);
      dispatch({ type: GET_USER_DATA, payload: { userData } });
    } catch (e) {}
  };

  useEffect(() => {
    clearError();
    clearMessage();
  }, [error, clearError, message, clearMessage]);

  const value = {
    fetchSales,
    state,
    createSale,
    getSaleData,
    getLoginUser,
    openNewGarageForm,
    openNewProductForm,
    handleGarageFormClose,
    handleGarageFormOpen,
    handleProductOpen,
    handleProductClose
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

const useStateData = () => useContext(appContext);

export { StateProvider, useStateData };
