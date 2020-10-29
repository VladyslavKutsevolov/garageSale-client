import {
  CREATE_SALE,
  GET_ALL_SALES,
  GET_SALE_DATA,
  GET_ALL_COMMENTS
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
      saleData: payload.garageData
    };
  }

  if (type === GET_ALL_COMMENTS) {
    // console.log("listcomments", payload.listOfComments)
    // console.log("payloadid", payload.productId)
    const filteredComments = () =>
      payload.listOfComments.filter(comment => comment.product_id === payload.productId);
      console.log("function cal", filteredComments())
      return {
        ...state,
        comments: filteredComments()
      };
  }
  return state;
};

export default appReducer;
