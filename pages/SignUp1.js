import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup'
import * as Google from "expo-google-app-auth"
/* import * as ImagePicker from 'expo-image-picker'; */
import * as ImagePicker from 'expo-image-picker';
import authActions from "../redux/actions/authActions";
import { connect } from "react-redux";
import Header from '../components/Header'



import axios from 'axios';
/* import SignUp from './SignUp' */
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text, SafeAreaView, Alert, Image, TouchableOpacity, Button, ScrollView } from 'react-native'
/* import { TextInput } from 'react-native-paper'; */
/* import React from 'react'; */
/*  import { Button, TextInput, View } from 'react-native'; */
import { Formik } from 'formik';




const loginValidationSchema = yup.object().shape({
  firstName: yup
    .string("Enter a valid name")
    .required("Name is required")
    .min(2, "Your name must contain at least 2 letters")
    .max(20, "Your name can’t contain more than 20 letters.")
    .trim()
    .required("This field is mandatory")
    .matches(new RegExp("[a-zA-Z]$"), "This field can only contain letters"),

  lastName: yup
    .string("Enter a valid last name")
    .required("Name is required")
    .trim()
    .min(3, "Your last name must contain at least 3 letters")
    .max(20, "Your last name cannot contain more than 20 letters")
    .matches(new RegExp("[a-zA-Z]$"), "This field can only contain letters"),

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


const signInAsync = async (navigation) => {
  console.log("LoginScreen.js 6 | loggin in");
  try {
    const { type, user } = await Google.logInAsync({
      iosClientId: `285115957331-u8cahaafg23d942kr97sv3g65u3lc4j8.apps.googleusercontent.com`,
      androidClientId: `285115957331-f4bpnq6ampgdpden0khjk3epeubrv1ml.apps.googleusercontent.com`,
    });

    if (type === "success") {
      console.log("LoginScreen.js 17 | success:", user);
      let formData = new FormData();
      formData.append("loggedWithGoogle", true);
      formData.append("firstName", user.givenName);
      formData.append("lastName", user.familyName);
      formData.append("email", user.email);
      formData.append("password", "a" + user.googleId);
      formData.append("userImg", user.imageUrl);
      props.signUpUser(formData);

      /*  props.history.push("/"); */
    }
  } catch (error) {
    console.log("LoginScreen.js 19 | error with login", error);
  }
};

const enviarInfo = (user) => {
  console.log("datos para SignUp", user)
  console.log("datos para values")
  let formData = new FormData();
  formData.append("loggedWithGoogle", values.loggedWithGoogle);
  formData.append("firstName", values.firstName);
  formData.append("lastName", values.lastName);
  formData.append("email", values.email);
  formData.append("password", values.password);
  /*  formData.append("userImg", photo.userImg); */
  /*       props.signUpUser(formData);
       props.SignUpUser(values);
      props.history.push("/"); */

}





function SignUp() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <Header fatherProps={props} />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ loggedWithGoogle: false }, { firstName: "" }, { lastName: "" }, { email: '' }, { password: "" }}
        onSubmit={values => enviarInfo(values)}

      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <ScrollView style={{
            flexDirection: "col",
            /*  justifyContent:"space-around", */
            height: "100%",
            padding: 20
          }}>
            <Text style={{ marginBottom: 15, marginTop: "10%" }}>Join US -SignUp Screen</Text>

            <View>
              <TextInput name="firstName" placeholder="enter your first name" placeholderTextColor='grey' color='black'
                style={{ marginBottom: "5%" }}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}

              />
              {(errors.firstName && touched.firstName) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.firstName}</Text>
              }

              <TextInput name="lastName" placeholder="enter your last name" placeholderTextColor='grey' color='black'
                style={{ marginBottom: "5%" }}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}

              />
              {(errors.lastName && touched.lastName) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastName}</Text>
              }



              <TextInput name="email" placeholder="Hi, please enter registered email" placeholderTextColor='grey' color='black'
                style={{ marginBottom: "5%" }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {(errors.email && touched.email) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
              }
              <TextInput placeholder="your password" placeholderTextColor='grey' color='black'
                style={{ marginBottom: "5%" }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />

              {(errors.password && touched.password) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }

              <View>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </View>

              <Button onPress={handleSubmit} title="SignUp" disabled={!isValid} />
            </View>
            <View >
              <Button title="SignUp with Google" onPress={signInAsync} />
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  )
};

const mapDispatchToProps = {
  signUpUser: authActions.signUpUser,
};

export default connect(null, mapDispatchToProps)(SignUp);



const styles = StyleSheet.create({

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
})