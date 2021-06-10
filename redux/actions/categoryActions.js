import axios from 'axios'
import Toast from 'react-native-toast-message'
import API from '../../helpers/api'

const categoryActions = {

    getAllCategories:() => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API+'/categories')

                dispatch({type: 'FETCH_CATEGORIES', payload: response.data.response})
            } catch (error) {
                /* showToastError500(); */
                console.log(error)
                Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                });
            }
        }
    },
    getCurrentCategory: (id) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API+'/store/' + id)
                if (response.data.success) {
                    dispatch({type: 'CURRENT_CATEGORY', payload: {id: id, stores: response.data.response}})
                } else {
                 /*    showToast("error",response.data.error) */
                 Alert.alert("error",response.data.error)
                 Toast.show({
                    text1: 'Stop!',
                    text2: `${response.data.error}`,
                    type: 'error'
                });
                }
            } catch (error){
                Toast.show({
                    text1: 'Stop!',
                    text2: 'Internal server error, try in a moment',
                    type: 'error'
                });
                console.log(error)
            }
        }
    }
}
export default categoryActions
