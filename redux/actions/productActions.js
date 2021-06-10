import API from '../../helpers/api'
import Toast from 'react-native-toast-message'
import axios from 'axios'

const productsActions = {
    getProductsFromStore: (idStore) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API+'/productsFromStore/'+idStore)               
                dispatch({type: 'FETCH_PRODUCTS_STORE', payload: response.data.response})
            } catch (error) {
                console.log(error)
                Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                });
            }
        }
    },
    getAllProducts: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API+'/products')
                dispatch({ type: 'FETCH_ALL_PRODUCTS', payload: response.data.response })
                
            } catch (error) {
                console.log(error)
                Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                });
            }
        }
    },
    filterProducts: (value) => {
        return (dispatch, getstate) => {
            
            dispatch({ type: 'FILTER_PRODUCTS', payload: value })
        }
    },
    filterProductsCurrentStore: (value) => {
        return (dispatch, getstate) => {
            dispatch({ type: 'FILTER_PRODUCTS_CURRENT_STORE', payload: value })
        }
    },
    
    likeProduct: (token, idProduct) => {
        console.log(token)
        console.log(idProduct)
        return async (dispatch, getState) => {
            try {
                const response = await axios.put(API+'/likeproduct', { idProduct }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })

                Toast.show({
                    text1: 'Great!,',
                    text2: `Product liked`,
                    type: 'success'
                });
                
                dispatch({type: 'UPDATE_PRODUCT_OF_ALL_PRODUCTS', payload: response.data.response})
                
            } catch (error) {
                console.log(error)
                Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                });
            }
        }
    },
    addReview: (inputreview, id) => {
        var review = inputreview.review
        var vote = inputreview.vote
        return async (dispatch, getState) => {
            try {
                const response = await axios.post(API+'/reviews/' + id, { review, vote }, {
                    headers: {
                        'Authorization': 'Bearer ' + inputreview.token
                    }
                })
                return response.data.response
            } catch (error) {
                console.log(error)
                Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                });
            }
        }
    },
    editReview: (idProduct, review, idReview) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put(API+'/reviews/' + idProduct, { review, idReview })
                return response.data.response.reviews
            } catch (error) {
                console.log(error)
                Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                });
            }
        }
    },
    deleteReview: (idProduct, idReview) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete(API+'/reviews/' + idProduct, {
                    data: {
                        idReview: idReview
                    }
                })
                Toast.show({
                    text1: 'Done!,',
                    text2: `Review removed`,
                    type: 'info'
                });
                return response.data.response
            } catch (error) {
                console.log(error)
                Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                });
            }
        }
    },
    rateProduct: (productId, numberRate, token) => {
        return (dispatch) => {

            try {
                const response = axios.put(API+'/productRate/' + productId, { numberRate }, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                Toast.show({
                    text1: 'Great!,',
                    text2: `Product rated`,
                    type: 'success'
                });
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
    filterProductsByMyFilter: (productFiltered,inputSearch) => {
        return (dispatch)=>{
            dispatch({type:"UPDATE_PRODUCT_MY_FILTER",payload:{productFiltered,inputSearch}})
        }
    }
}
export default productsActions