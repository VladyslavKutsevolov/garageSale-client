import { CREATE_SALE, GET_ALL_SALES, GET_SALE_DATA, GET_PRODUCT_DATA } from './types';

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
      saleData: payload.garageData
    };
  }

  if (type === GET_PRODUCT_DATA) {
    return {
      ...state,
      products: payload.productData
    };
  }
  return state;
};

export default appReducer;
