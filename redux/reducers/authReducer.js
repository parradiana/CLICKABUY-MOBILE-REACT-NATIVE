import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'

const initialState = {
  userLogged: null,
  userRole: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      AsyncStorage.setItem("token",JSON.stringify(action.payload.token))
            .catch(error  => {console.log(error); Toast.show({
            text1: 'Stop!',
            text2: 'Internal server error, try in a moment',
            type: 'error'
          })});
      AsyncStorage.setItem("userLogged",JSON.stringify(action.payload))
            .catch(error  => {console.log(error); Toast.show({
            text1: 'Stop!',
            text2: 'Internal server error, try in a moment',
            type: 'error'
          })});

      return {
        ...state,
        userLogged: action.payload,
      };

    case "LOG_OUT":
      AsyncStorage.clear().catch(error  => {console.log(error); Toast.show({
            text1: 'Stop!',
            text2: 'Internal server error, try in a moment',
            type: 'error'
          })});
      return {
        ...state,
        userLogged: null,
      };

    case "USER_ROLE":
      return {
        ...state,
        userRole: action.payload
      };

    default:
      return state;
  }
};
export default authReducer;
