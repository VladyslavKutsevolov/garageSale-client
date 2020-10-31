import {
  CREATE_SALE,
  GET_ALL_SALES,
  GET_SALE_DATA,
  GET_ALL_COMMENTS,
  GET_USER_DATA,
  CREATE_PRODUCT,
  FILTER_BY_CATEGORY
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
      payload.categories && payload.categories.push({ name: 'All' });

      return payload.categories;
    };

    return {
      ...state,
      sales: state.sales,
      categories: addAllToCommnets(),
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
      saleData: [...state.saleData, payload.product]
    };
  }

  if (type === GET_USER_DATA) {
    return { ...state, loginUser: payload.userData };
  }

  return state;
};

export default appReducer;
