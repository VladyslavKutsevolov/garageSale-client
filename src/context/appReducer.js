/* eslint-disable no-confusing-arrow */
import {
  CREATE_SALE,
  GET_ALL_SALES,
  GET_SALE_DATA,
  GET_ALL_COMMENTS,
  GET_USER_DATA,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  SOLD_OUT,
  DELETE_COMMENT,
  CREATE_COMMENT,
  ADD_NOTIFICATION,
  FILTER_BY_CATEGORY,
  EDIT_GARAGE,
  DELETE_GARAGE
} from './types';

const appReducer = (state, { type, payload }) => {
  if (type === GET_ALL_SALES) {
    return {
      ...state,
      sales: payload.listOfSales
    };
  }

  if (type === CREATE_SALE) {
    return {
      ...state,
      sales: [...state.sales, payload.sale]
    };
  }

  if (type === GET_USER_DATA) {
    return {
      ...state,
      loginUser: payload.userData
    };
  }

  if (type === GET_SALE_DATA) {
    const getSaleInfo = () =>
      state.sales.filter(sale => sale.id === Number(payload.saleId))[0];

    const addAllToCommnets = () => {
      // eslint-disable-next-line no-unused-expressions
      payload.categories &&
        payload.categories.push({ name: 'All', category_id: 0 });

      return payload.categories;
    };

    return {
      ...state,
      sales: state.sales,
      categories: addAllToCommnets(),
      comments: payload.listOfComments,
      saleData: payload.garageData || payload.listOfProducts,
      saleInfo: getSaleInfo()
    };
  }
  if (type === FILTER_BY_CATEGORY) {
    return {
      ...state,
      saleData: payload.listOfProducts
    };
  }

  if (type === GET_ALL_COMMENTS) {
    return {
      ...state,
      comments: payload.listOfComments
    };
  }

  if (type === CREATE_PRODUCT) {
    return {
      ...state,
      saleData: [...state.saleData, payload.product]
    };
  }

  if (type === CREATE_COMMENT) {
    return {
      ...state,
      comments: [...state.comments, payload.returnedComment]
    };
  }

  if (type === ADD_NOTIFICATION) {
    return {
      ...state,
      notifications: [...state.notifications, payload.notification]
    };
  }

  if (type === EDIT_PRODUCT) {
    return {
      ...state,
      saleData: state.saleData.map(item =>
        item.id === payload.itemId ? payload.product : item
      )
    };
  }

  if (type === SOLD_OUT) {
    return {
      ...state,
      saleData: state.saleData.map(item =>
        item.id === payload.itemId ? payload.product : item
      )
    };
  }

  if (type === DELETE_PRODUCT) {
    return {
      ...state,
      saleData: state.saleData.filter(item => item.id !== payload.itemId)
    };
  }

  if (type === GET_USER_DATA) {
    return { ...state, loginUser: payload.userData };
  }

  if (type === DELETE_COMMENT) {
    return {
      ...state,
      comments: state.comments.filter(
        comment => comment.id !== payload.commentId
      )
    };
  }

  if (type === EDIT_GARAGE) {
    console.log('Reducer payload', payload)
    return {
      ...state,
      saleInfo: payload.garage
    };
  }

  if (type === DELETE_GARAGE) {
    return {
      ...state,
      saleData: state.sales.filter(sale => sale.id !== payload.saleId)
    };
  }

  return state;
};

export default appReducer;
