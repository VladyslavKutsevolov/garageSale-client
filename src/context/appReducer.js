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
      comments: payload.listOfComments,
      saleInfo: getSaleInfo()
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
      saleData: [payload.product, ...state.saleData]
    };
  }
  if (type === CREATE_COMMENT) {
    return {
      ...state,
      comments: [...state.comments, payload.returnedComment]
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
        (item.id === payload.itemId ? payload.product : item)
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
    return {
      ...state,
      sales: state.sales.map(garage =>
        garage.id === payload.garage ? payload.garage : garage
      )
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
