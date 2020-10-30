import {
  CREATE_SALE,
  GET_ALL_SALES,
  GET_SALE_DATA,
  GET_ALL_COMMENTS,
  GET_USER_DATA,
  CREATE_PRODUCT
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
      sales: [payload.sale, ...state.sales]
    };
  }

  if (type === GET_SALE_DATA) {
    return {
      ...state,
      sales: state.sales,
      saleData: payload.garageData
    };
  }

  if (type === GET_ALL_COMMENTS) {
    console.log("payload i reducer", payload.listOfComments)
    return {
      ...state,
      comments: payload.listOfComments
    };
  }
  if (type === CREATE_PRODUCT) {
    return {
      ...state,
      saleData: [payload.product, ...state.saleData]
    };
  }

  if (type === GET_USER_DATA) {
    return { ...state, loginUser: payload.userData };
  }

  return state;
};

export default appReducer;
