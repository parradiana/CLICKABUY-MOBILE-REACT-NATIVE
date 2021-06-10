import React, { useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
// import {StatusBar} from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authActions from '../redux/actions/authActions'
import { connect } from "react-redux";



const Home = (props) => {


  AsyncStorage.getItem("token")
    .then(token => {
      if (!props.userLogged && token && token !== "undefined") {
        props.loginForced(JSON.parse(token))
      }
    })
    .catch(err => console.log(err))



  return (
    <>
      <View style={styles.contenedorHome}>
        <View style={{ alignItems: 'center' }}>
          <FontAwesome5 name="tags" size={100} color="white" />
          <Text style={styles.logo}>clickabuy</Text>
          <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', marginTop: 30 }}>You need it, you want it, with clickabuy you can have it</Text>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Categories')} style={styles.buttonGetStarted}>
          <Text style={{ color: '#ea957f', fontSize: 27, textAlign: 'center' }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </>
  )

}


const mapStateToProps = (state) => {
  return {
    userLogged: state.authReducer.userLogged
  };
};

const mapDispatchToProps = {
  loginForced: authActions.loginForced

};
export default connect(mapStateToProps, mapDispatchToProps)(Home);



const styles = StyleSheet.create({
  contenedorHome: {
    backgroundColor: '#ea957f',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logo: {
    fontFamily: 'Poppins_500Medium',
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    marginTop: 50
  },
  buttonGetStarted: {
    // marginTop: ,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '85%'
  }
})
