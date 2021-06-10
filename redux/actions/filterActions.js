import API from '../../helpers/api'
import { showToast, showToastError500 } from '../../helpers/myToast'


const filterActions = {
    filterByInputSearch: (inputValue) => {
        return (dispatch, getState) => {
            console.log(getState())
            dispatch({ type: 'FILTER_SEARCH', payload: {inputValue,allStoreProducts:getState().productReducer.productsCurrentStore} })
        }
    },
    filterByStars: (number) => {
        return async (dispatch, getState) => {
            dispatch({ type: 'FILTER_CHKSTARS', payload: {number,allStoreProducts:getState().productReducer.productsCurrentStore} })
        }
    },
    
}
export default filterActions