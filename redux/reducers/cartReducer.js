import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'

const initialState = { 
    cart: [],

};

const getIdsProductFormCart = (cart)  => {
    let newCartLS = cart.map(item => ({_id:item._id,quantity:item.quantity}));
    return newCartLS;
}

const cartReducer = (state = initialState, action) => {
    let newCart= null;
    switch (action.type) {
        case "ADD_PRODUCT_TO_CART":
            
            let itemCart = {...action.payload,quantity:1};
            newCart = [...state.cart,itemCart];
            
            AsyncStorage.setItem("cartLS", JSON.stringify(getIdsProductFormCart(newCart)))
                .catch(error  => {console.log(error); Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                })});
            return {
                ...state,
                cart: newCart,
            };
        case "INCREASE_QUANTITY":{
            const {idItem,number} = action.payload;
            newCart = state.cart.map(item => {
                if(idItem === item._id)
                    return {...item,quantity: item.quantity+number};
                return item;
            })
            AsyncStorage.setItem("cartLS", JSON.stringify(getIdsProductFormCart(newCart)))
                .catch(error  => {console.log(error); Toast.show({
                text1: 'Stop!',
                text2: 'Internal server error, try in a moment',
                type: 'error'
            })});
            return {
                ...state,
                cart:newCart
            }

        }
        
        case "DELETE_PRODUCT_FROM_CART":
            newCart = state.cart.filter(item => {
                return item._id !== action.payload._id
            });
            AsyncStorage.setItem("cartLS", JSON.stringify(getIdsProductFormCart(newCart)))
                .catch(error  => {console.log(error); Toast.show({
                text1: 'Stop!',
                text2: 'Internal server error, try in a moment',
                type: 'error'
            })});
            return {
                ...state,
                cart: newCart
            }
        case "RELOAD_CART":
            let cart = action.payload;
            AsyncStorage.setItem("cartLS", JSON.stringify(getIdsProductFormCart(cart)))
                .catch(error  => {console.log(error); Toast.show({
                text1: 'Stop!',
                text2: 'Internal server error, try in a moment',
                type: 'error'
            })});
            return {
                ...state,
                cart
            }

        case "CLEAR_CART":
            AsyncStorage.removeItem("cartLS")
                .catch(error  => {console.log(error); Toast.show({
                text1: 'Stop!',
                text2: 'Internal server error, try in a moment',
                type: 'error'
            })});
            return {
                ...state,
                cart : []
            }
        

        
        default:
            return state;
    }
};
export default cartReducer;