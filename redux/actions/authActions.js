import axios from "axios";
import API from "../../helpers/api";
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, SafeAreaView, Alert, Image, TouchableOpacity, Button, ScrollView } from 'react-native'


const authActions = {
  signUpUser: (objInputsValues) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/usersNative", objInputsValues, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log('ln 15',data)
        if (data.success) {
          console.log('authActions.js ln 16', data)
          dispatch({ type: "LOGIN_USER", payload: data.response });
          Toast.show({
            text1: 'Hi!,',
            text2: `Welcome ${data.response.firstName} ${data.response.lastName}`,
            type: 'success'
        });

          // showToast("success", `Welcome ${data.response.firstName} ${data.response.lastName}`); 

        } else {
          Toast.show({
            text1: 'Stop!',
            text2: 'Internal server error, try in a moment',
            type: 'error'
        });
          return data.error.errors;

          // return console.log(data.error.errors);
        }
      } catch (err) {
        console.log(err);
        Toast.show({
          text1: 'Stop!',
          text2: 'Internal server error, try in a moment',
          type: 'error'
      });
       /*  showToastError500(); */
      }
    };
  },
  logInUser: (objInputsValues) => {
    console.log("inputValues",objInputsValues)
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/login", objInputsValues);
        if (data.success) {
          dispatch({ type: "LOGIN_USER", payload: data.response });
          Toast.show({
            text1: 'Hi!,',
            text2: `Welcome ${data.response.firstName} ${data.response.lastName}`,
            type: 'success'
        });
        /*   showToast(
            "success",
            `Welcome ${data.response.firstName} ${data.response.lastName}`
          ); */
        } else {
          return data;
        }
      } catch (err) {
        console.log(err);
        Toast.show({
          text1: 'Stop!',
          text2: 'Internal server error, try in a moment',
          type: 'error'
      });
       /*  showToastError500(); */
      }
    };
  },
  loginForced: (token) => {
    return async (dispatch) => {
      try {

        const { data } = await axios.get(API + "/relogin", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({
          type: "LOGIN_USER",
          payload: {
            ...data.response,
            token,
          },
        });

      } catch (err) {
        if (err.response && err.response.status === 401) {
          Toast.show({
            text1: 'Stop!',
            text2: 'Internal server error, try in a moment',
            type: 'error'
        });
        }
        /*    localStorage.clear(); */
      }
    };
  },
  logOutUser: () => {
    return (dispatch) => {
      //showToast("info", "Come back later ", "top-right")
      dispatch({ type: "LOG_OUT" });
    };
  },


  checkUserRole: (token) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(API + "/userCheckRole", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({ type: "USER_ROLE", payload: response.data.response })

      } catch (err) {
        if (err) {
          console.log(err)
          Toast.show({
            text1: 'Stop!',
            text2: 'Internal server error, try in a moment',
            type: 'error'
        });
        }
      }
    }
  }


}

export default authActions;
