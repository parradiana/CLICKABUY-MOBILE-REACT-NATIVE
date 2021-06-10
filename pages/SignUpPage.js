import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions, TouchableOpacity, Button } from 'react-native'
import * as Google from "expo-google-app-auth"
import { connect } from 'react-redux'

import Header from '../components/Header'
import authActions from '../redux/actions/authActions'


const SignUpPage = (props) => {

    const signInAsync = async (navigation) => {
        try {
            const { type, user } = await Google.logInAsync({
                iosClientId: `285115957331-u8cahaafg23d942kr97sv3g65u3lc4j8.apps.googleusercontent.com`,
                androidClientId: `285115957331-f4bpnq6ampgdpden0khjk3epeubrv1ml.apps.googleusercontent.com`,
            });

            if (type === "success") {
                // console.log("LoginScreen.js 17 | success:", user);
                let formData = new FormData();
                formData.append("loggedWithGoogle", true);
                formData.append("firstName", user.givenName);
                formData.append("lastName", user.familyName);
                formData.append("email", user.email);
                formData.append("password", "a" + user.id);
                formData.append("userImg", user.photoUrl);
                props.signUpUser(formData);
                props.navigation.navigate('Home')
            }
        } catch (error) {
            console.log("error with login", error);
        }
    };

    return (
        <View>
            <StatusBar></StatusBar>
            <Header fatherProps={props} />
            <View style={styles.signContainerPage}>
                <Text style={{fontSize: 40, marginBottom: '30%'}}>SIGN UP</Text>
                <View style={styles.buttonsContinueContainer}>
                    <TouchableOpacity style={styles.buttonRegLgc} onPress={() => props.navigation.navigate('signup')}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Continue with email</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#999' }}>- or -</Text>
                    <TouchableOpacity onPress={signInAsync} style={styles.buttonGoogle}>
                        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' }} style={{ width: 35, height: 35 }}></Image>
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 20 }}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{marginVertical: 30}}>Alredy have an account ?</Text>
                <TouchableOpacity style={styles.buttonRegLgcCTA} onPress={() => props.navigation.navigate('loginpage')}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Log In here!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signContainerPage: {
        // backgroundColor: 'red',
        height: '100%',
        width: '100%',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 50
    },
    buttonRegLgcCTA: {
        width: '70%',
        backgroundColor: '#EA957F',
        flexDirection: 'row',
        height: 55,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    buttonRegLgc: {
        width: '70%',
        backgroundColor: '#000',
        flexDirection: 'row',
        height: 55,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    buttonGoogle: {
        width: '70%',
        backgroundColor: '#000',
        flexDirection: 'row',
        height: 55,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    buttonsContinueContainer: {
        width: '100%',
        alignItems: 'center',
        height: '20%',
        justifyContent:'space-around',
        marginBottom: '30%'
    }
})

const mapDispatchToProps = {
    signUpUser: authActions.signUpUser,
};

export default connect(null, mapDispatchToProps)(SignUpPage)
