import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup'
import * as Google from "expo-google-app-auth"
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import Header from '../components/Header'



import axios from 'axios';
/* import SignUp from './SignUp' */
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text, SafeAreaView, Alert, Image, TouchableOpacity, Button, ScrollView } from 'react-native'
import { Formik } from 'formik';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string("Enter a valid email address")
    .trim()
    .email("Enter a valid email")
    .required("This field is mandatory"),
  password: yup
    .string("Enter your password")
    .min(6, "Your password must be at least 6 characters long")
    .trim()
    .required("Password is required")
    .matches(
      /(?=.*\d)(?=.*[A-z])/,
      "Your password must be at least 6 characters long, contain a capital letter, minuscule letter and number"
    ),
})










function SignIn(props) {


  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: `285115957331-u8cahaafg23d942kr97sv3g65u3lc4j8.apps.googleusercontent.com`,
        androidClientId: `285115957331-f4bpnq6ampgdpden0khjk3epeubrv1ml.apps.googleusercontent.com`,
      });

      if (type === "success") {

        console.log("LoginScreen.js 17 | success:", user);
        props.logInUser({ email: user.email, password: "a" + user.id });
        /*  props.history.push("/"); */

      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
      /* props.history.push("/"); */
    }
  };



  const enviarInfo = (user) => {
    /*    console.log("datos para login",user) */
    props.logInUser(user)
    /*  props.history.push("/"); */

  }


  return (
    <View>
      <StatusBar barStyle="light-content" />
      <Header fatherProps={props} />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '' }, { password: "" }}
        onSubmit={values => enviarInfo(values)}

      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <ScrollView style={{
            flexDirection: "column",
            height: "100%",
            padding: 20
          }}>
            <Text style={{ marginBottom: 15, marginTop: "10%" }}>Welcome Back-Login Screen</Text>

            <View>
              <TextInput name="email" placeholder="Hi, please enter registered email" placeholderTextColor='grey' color='black'
                style={{ marginBottom: "10%" }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {(errors.email && touched.email) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
              }
              <TextInput placeholder="your password" placeholderTextColor='grey' color='black'
                style={{ marginBottom: "10%" }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />

              {(errors.password && touched.password) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }


              <Button onPress={handleSubmit} title="SignIn" disabled={!isValid} />

            </View>
            <View >
              <Button title="Login with Google" onPress={signInAsync} />
            </View>


          </ScrollView>
        )}
      </Formik>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  logInUser: authActions.logInUser,
};
export default connect(null, mapDispatchToProps)(SignIn);
  /* export default SignIn; */



/*const styles = StyleSheet.create({

  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
})*/