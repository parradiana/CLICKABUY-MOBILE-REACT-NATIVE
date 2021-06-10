import Toast from 'react-native-toast-message'

import axios from "axios";
import API from "../../helpers/api";



const storeActions = {
  
  increaseQuantity: (idItem, number) => {
    return (dispatch) => {
      dispatch({ type: "INCREASE_QUANTITY", payload: { idItem, number } });
    };
  },

  deleteProductFromCart: (product) => {
    return (dispatch) => {
      dispatch({ type: "DELETE_PRODUCT_FROM_CART", payload: product });
        Toast.show({
          text1: 'Done!,',
          text2: `Product removed`,
          type: 'info'
      });
    };
  },
  clearCart: () => {
    return (dispatch) => {
      dispatch({ type: "CLEAR_CART" });
      Toast.show({
        text1: 'Done!,',
        text2: `Cart is now empty`,
        type: 'info'
    });
    };
  },
  reloadCartLS: (cartLS) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/reloadCartLS", { cartLS });
        if (data.success) dispatch({ type: "RELOAD_CART", payload: data.response });
        else {
          Toast.show({
            text1: 'Stop!',
            text2: `${data.error}`,
            type: 'error'
        });
        }
      } catch (err) {
        console.log(err);
        Toast.show({
          text1: 'Stop!',
          text2: 'Internal server error, try in a moment',
          type: 'error'
      });
      }
    };
  },

  /*rateStore: (storeId, numberRate, token) => {
    return (dispatch) => {
      try {
        const response = axios.put(API + "/storeRate/" + storeId, {numberRate}, {
          headers:{
              'Authorization': 'Bearer ' +token 
          }
        })
        
      } catch (err) {
        console.log(err);
        showToastError500();
      }
    };
  },*/
  
};

export default storeActions;
