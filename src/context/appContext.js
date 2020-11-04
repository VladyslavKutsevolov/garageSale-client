/* eslint-disable react-hooks/exhaustive-deps */
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
  DELETE_PRODUCT,
  GET_USER_DATA,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  SOLD_OUT,
  DELETE_COMMENT,
  ADD_NOTIFICATION,
  FILTER_BY_CATEGORY,
  EDIT_GARAGE,
  DELETE_GARAGE,
  SEARCH_BY_CITYNAME,
  CLEAR_NOTIFICATIONS,
  GET_CATEGORIES,
  LOGOUT_USER,
  GET_LATEST_COMMENTS
} from './types';

import useHttp from '../hooks/useHttp';

import appReducer from './appReducer';

const appContext = createContext();

const initialState = {
  sales: [],
  saleData: [],
  products: [],
  loginUser: [],
  comments: [],
  notifications: [],
  latestComments: []
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [saleId, setSaleId] = useState(null);
  const [openNewGarageForm, setNewGarageForm] = useState(false);
  const [openNewProductForm, setNewProductForm] = useState(false);
  const [productId, setProductId] = useState(null);
  const [cityname, setCityName] = useState('');
  const [noHidden, setNoHidden] = useState(false);

  const {
    request,
    loading,
    error,
    clearError,
    clearMessage,
    setMessage,
    message,
    setError
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
  }, [request]);

  const createSale = useCallback(
    async saleData => {
      try {
        const {
          data: { message: responseMsg, sale }
        } = await request('http://localhost:3001/sales/new', 'POST', saleData);

        dispatch({ type: CREATE_SALE, payload: { sale } });
        setMessage(responseMsg);
      } catch (e) {}
    },
    [request]
  );

  const getSaleData = useCallback(
    async id => {
      try {
        const {
          data: { garage: garageData }
        } = await request(`http://localhost:3001/sales/${id}`);

        const {
          data: { listOfComments }
        } = await request(`http://localhost:3001/comments/${id}`);

        dispatch({
          type: GET_SALE_DATA,
          payload: { garageData, saleId: id, listOfComments }
        });
      } catch (e) {}
    },
    [request]
  );

  const getCategoriesForSale = useCallback(
    async id => {
      try {
        const {
          data: { categories }
        } = await request(`http://localhost:3001/products/categories/${id}`);

        dispatch({ type: GET_CATEGORIES, payload: { categories } });
      } catch (e) {}
    },
    [request]
  );

  const fetchComments = async itemId => {
    try {
      const {
        data: { listOfComments }
      } = await request(`http://localhost:3001/comments/${itemId}`);
      dispatch({ type: GET_ALL_COMMENTS, payload: { listOfComments, itemId } });
    } catch (e) {}
  };

  const getLatestComments = async sellerId => {
    try {
      const {
        data: { latestComments }
      } = await request(`http://localhost:3001/comments/getlatestcomments/${sellerId}`);
      dispatch({ type: GET_LATEST_COMMENTS, payload: { latestComments } });
    } catch (e) {}
  };

  const getLoginUser = async username => {
    try {
      const {
        data: { message: responseMsg, loginUser: userData }
      } = await request(`http://localhost:3001/users/${username}`);
      dispatch({ type: GET_USER_DATA, payload: { userData } });
      console.log('Message in Context', responseMsg);
      setMessage(responseMsg);
    } catch (e) {}
  };

  const logOutUser = async () => {
    try {
      const {
        data: { message: responseMsg }
      } = await request(`http://localhost:3001/users/logout`);
      dispatch({ type: LOGOUT_USER, payload: { userData: '' } });
      console.log('Message in Context', responseMsg);
      setMessage(responseMsg);
    } catch (e) {}
  };

  const createComment = async (
    authorId,
    itemId,
    commentData,
    authorUsername
  ) => {
    const commentInfo = { authorId, commentData };
    try {
      const {
        data: { returnedComment }
      } = await request(
        `http://localhost:3001/comments/${itemId}/newComment`,
        'POST',
        commentInfo
      );

      dispatch({
        type: CREATE_COMMENT,
        payload: { returnedComment, itemId, authorUsername }
      });
    } catch (e) {}
  };

  const deleteComment = async commentId => {
    try {
      await request(
        `http://localhost:3001/comments/${commentId}/delete`,
        'DELETE'
      );
      dispatch({ type: DELETE_COMMENT, payload: { commentId } });
    } catch (e) {}
  };

  const createProduct = useCallback(
    async productData => {
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
    },
    [request]
  );

  const addNotification = notification => {
    dispatch({ type: ADD_NOTIFICATION, payload: { notification } });
  };

  const clearNotifications = () => {
    dispatch({ type: CLEAR_NOTIFICATIONS });
  };

  const editProduct = async (itemId, productData) => {
    try {
      const {
        data: { message: responseMsg, product }
      } = await request(
        `http://localhost:3001/products/edit/${itemId}`,
        'PUT',
        productData
      );

      dispatch({ type: EDIT_PRODUCT, payload: { product, itemId } });

      setMessage(responseMsg);
    } catch (e) {}
  };

  const soldOut = async itemId => {
    try {
      const {
        data: { message: responseMsg, product }
      } = await request(`http://localhost:3001/products/sold/${itemId}`, 'PUT');

      dispatch({ type: SOLD_OUT, payload: { product, itemId } });

      setMessage(responseMsg);
    } catch (e) {}
  };

  const deleteProduct = async itemId => {
    try {
      const {
        data: { message: responseMsg }
      } = await request(
        `http://localhost:3001/products/delete/${itemId}`,
        'DELETE'
      );

      dispatch({ type: DELETE_PRODUCT, payload: { itemId } });

      setMessage(responseMsg);
    } catch (e) {}
  };

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

      dispatch({
        type: FILTER_BY_CATEGORY,
        payload: { listOfProducts }
      });
    } catch (e) {}
  };

  const editGarage = async (garageId, garageData) => {
    try {
      const {
        data: { message: responseMsg, sale: garage }
      } = await request(
        `http://localhost:3001/sales/edit/${garageId}`,
        'PUT',
        garageData
      );
      dispatch({ type: EDIT_GARAGE, payload: { garage } });

      setMessage(responseMsg);
    } catch (e) {}
  };

  const deleteGarage = async garageId => {
    try {
      const {
        data: { message: responseMsg }
      } = await request(
        `http://localhost:3001/sales/delete/${garageId}`,
        'DELETE'
      );

      dispatch({ type: DELETE_GARAGE, payload: { garageId } });

      setMessage(responseMsg);
    } catch (e) {}
  };

  const searchByCityName = async cityName => {
    try {
      if (cityName === 'All' || !cityName) {
        return fetchSales();
      }

      const {
        data: { sales }
      } = await request(`http://localhost:3001/sales/city/${cityName}`);

      if (!sales.length) {
        setError('There is no Garage Sales in this area.');
        return;
      }

      dispatch({ type: SEARCH_BY_CITYNAME, payload: { sales } });
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
    deleteComment,
    state,
    dispatch,
    createSale,
    getSaleData,
    getLoginUser,
    createProduct,
    editProduct,
    deleteProduct,
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
    soldOut,
    addNotification,
    clearNotifications,
    getProductsForCategory,
    deleteGarage,
    editGarage,
    searchByCityName,
    cityname,
    setCityName,
    noHidden,
    setNoHidden,
    getCategoriesForSale,
    logOutUser,
    getLatestComments
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

const useStateData = () => useContext(appContext);

export { StateProvider, useStateData };
