import {
  CREATE_SALE,
  GET_ALL_SALES,
  GET_SALE_DATA,
  GET_ALL_COMMENTS,
  GET_USER_DATA,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT
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

  if (type === GET_USER_DATA) {
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
      saleData: payload.garageData,
      saleInfo: getSaleInfo()
    };
  }

  if (type === GET_ALL_COMMENTS) {
    const filteredComments = () =>
      payload.listOfComments.filter(
        comment => comment.product_id === payload.itemId
      );

    return {
      ...state,
      comments: filteredComments()
    };
  }

  if (type === CREATE_PRODUCT) {
    return {
      ...state,
      saleData: [payload.product, ...state.saleData]
    };
  }

  if (type === EDIT_PRODUCT) {
    return {
      ...state,
      saleData: state.saleData.map(item =>
        ((item.id === payload.itemId) ? payload.product : item)
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

  return state;
};

export default appReducer;
