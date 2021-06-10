import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup'
import { TextInput } from 'react-native-paper';
import ReactNativeSelect from "@evolvier/react-native-select";
import { connect } from "react-redux";
import storeActions from "../redux/actions/storeActions";
import adminStoreActions from "../redux/actions/adminStoreActions";


import axios from 'axios';
/* import SignUp from './SignUp' */
import { View, Picker, StyleSheet, Text, SafeAreaView, Alert, Image, TouchableOpacity, Button, ScrollView } from 'react-native'

import { Formik } from 'formik';







const loginValidationSchema = yup.object().shape({
    bName: yup
        .string("enter your business name")
        .required("This field is mandatory"),
    description: yup
        .string("please enter a description of your store")
})





function SignUpStore(props) {
    console.log("por favor", props.categories)

    let data = [
        {
            key: "William",
            title: "William",
            /*  subtitle: "Developer", */
        },
        {
            key: "10012",
            title: "Emma",
            subtitle: "UI/UX Designer",
        },
        {
            key: "10013",
            title: "James",
        },
    ];

    return (
        <View>

            <StatusBar barStyle="light-content" />
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ bName: '' }, { description: "" }}
                onSubmit={values => console.log("signUpStore", values)}

            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <ScrollView style={{
                        flexDirection: "column",
                        height: "100%",
                        padding: 20
                    }}>
                        <Text style={{ marginBottom: 15, marginTop: "10%" }}>SIGNUPSTORE-Login Screen</Text>

                        <View>
                            <TextInput name="bName" placeholder="Hi, please enter your business name" placeholderTextColor='grey' color='black'
                                style={{ marginBottom: "10%" }}
                                onChangeText={handleChange('bName')}
                                onBlur={handleBlur('bName')}
                                value={values.bName}

                            />
                            {(errors.bName && touched.bName) &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.bName}</Text>
                            }
                            <TextInput placeholder="a brief description of your store (optional)" placeholderTextColor='grey' color='black'
                                style={{ marginBottom: "10%" }}
                                onChangeText={handleChange('description')}
                                multiline={true}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />

                            <ReactNativeSelect
                                items={data}
                                onSubmit={(selectedItem) => console.log(selectedItem)}
                            />



                            <Button onPress={handleSubmit} title="Create Store" disabled={!isValid} />

                        </View>



                    </ScrollView>
                )}
            </Formik>
        </View>
    )
};


const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories,
        userLogged: state.authReducer.userLogged
        /*   userLogged: state.authReducer.userLogged */
    };
};

const mapDispatchToProps = {
    addRequest: adminStoreActions.addRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpStore);


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