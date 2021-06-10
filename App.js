import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import Toast from 'react-native-toast-message';
import thunk from "redux-thunk";
import AppLoading from 'expo-app-loading'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Drawer from './navegation/Drawer'
import { LogBox } from 'react-native';

const miStore = createStore(rootReducer, applyMiddleware(thunk))
const App = (props) => {
  LogBox.ignoreAllLogs();
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={miStore}>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{ zIndex: 2 }} />
        <NavigationContainer>

          <Drawer />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App

