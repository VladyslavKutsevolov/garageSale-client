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
  CLEAR_NOTIFICATIONS,
  FILTER_BY_CATEGORY,
  EDIT_GARAGE,
  DELETE_GARAGE,
  SEARCH_BY_CITYNAME,
  GET_CATEGORIES,
  LOGOUT_USER,
  GET_LATEST_COMMENTS
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

  if (type === LOGOUT_USER) {
    return {
      ...state,
      loginUser: payload.userData
    };
  }

  if (type === GET_SALE_DATA) {
    const getSaleInfo = () =>
      state.sales.filter(sale => sale.id === Number(payload.saleId))[0];

    return {
      ...state,
      sales: state.sales,
      comments: payload.listOfComments,
      saleData: payload.garageData || payload.listOfProducts,
      saleInfo: getSaleInfo()
    };
  }

  if (type === GET_CATEGORIES) {
    const addAllToCaregories = () => {
      // eslint-disable-next-line no-unused-expressions
      payload.categories &&
        payload.categories.push({ name: 'All', category_id: 0 });
      return payload.categories;
    };

    return {
      ...state,
      categories: addAllToCaregories()
    };
  }

  if (type === SEARCH_BY_CITYNAME) {
    return {
      ...state,
      sales: payload.sales
    };
  }

  if (type === FILTER_BY_CATEGORY) {
    return {
      ...state,
      saleData: payload.listOfProducts,
      comments: state.comments
    };
  }

  if (type === GET_ALL_COMMENTS) {
    return {
      ...state,
      comments: payload.listOfComments
    };
  }

  if (type === GET_LATEST_COMMENTS) {
    console.log("reducer payload", payload.latestComments)
    return {
      ...state,
      latestComments: payload.latestComments
    };
  }

  if (type === CREATE_PRODUCT) {
    return {
      ...state,
      saleData: [...state.saleData, payload.product],
      categories: state.categories
    };
  }

  if (type === CREATE_COMMENT) {
    payload.returnedComment.author = payload.authorUsername;
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

  if (type === CLEAR_NOTIFICATIONS) {
    return {
      ...state,
      notifications: []
    };
  }

  if (type === EDIT_PRODUCT) {
    return {
      ...state,
      saleData: state.saleData.map(item =>
        item.product_id === payload.itemId ? payload.product : item
      )
    };
  }

  if (type === SOLD_OUT) {
    return {
      ...state,
      saleData: state.saleData.map(item =>
        item.product_id === payload.itemId ? payload.product : item
      )
    };
  }

  if (type === DELETE_PRODUCT) {
    return {
      ...state,
      saleData: state.saleData.filter(
        item => item.product_id !== payload.itemId
      )
    };
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
