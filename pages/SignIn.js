import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux'
import authActions from "../redux/actions/authActions";
import Header from '../components/Header'

import Toast from 'react-native-toast-message'

const SignIn = (props) => {

    const [newUser, setNewUser] = useState({ email: '', password: '' })
    const [passwordNotShow, setPasswordNotShow] = useState(true)
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => { setNewUser({ ...newUser, country: selectedValue }) }, [selectedValue])


    const getInput = (e, field) => { setNewUser({ ...newUser, [field]: e }) }


    const sendSignInUser = (e = null, user) => {
        if (user.email && user.password) {
            props.logInUser(user)
            e && setNewUser({ email: '', password: '' })
            props.navigation.navigate('Home')
        } else {
            Toast.show({
                text1: 'Stop!',
                text2: 'All the fields are mandatory',
                type: 'error'
            });
        }
    }

    return (
        <ImageBackground source={{ uri: `url('https://www.solofondos.com/wp-content/uploads/2016/03/outrun-vaporwave-hd-wallpaper-preview.jpg)` }} style={styles.signUpImg}>
            <StatusBar backgroundColor='#2d003d' />
            <Header fatherProps={props} />

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpTitle}>Hello, Friend!</Text>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="email" size={25} color="#000" />
                        <TextInput placeholder="Email" placeholderTextColor='#000' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'email')} />
                    </View>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="vpn-key" size={25} color="#000" />
                        <TextInput placeholder="Password" placeholderTextColor='#000' secureTextEntry={passwordNotShow} style={styles.signUpInput} onChangeText={(e) => getInput(e, 'password')} />
                        {
                            passwordNotShow
                                ? <MaterialCommunityIcons name="eye" size={20} color="#000" onPress={() => setPasswordNotShow(false)} />
                                : <MaterialCommunityIcons name="eye-off" size={20} color="#000" onPress={() => setPasswordNotShow(true)} />
                        }
                    </View>
                </View>

                <Text style={styles.signUpSend} onPress={(e) => sendSignInUser(e, newUser)} >Sign In</Text>
                {/* <Text>
                    <Text style={{ color: 'black', fontSize: 20 }}>Don't have an account yet?</Text> <Text
                        style={{ color: 'black', fontSize: 20, textDecorationLine: 'underline' }} onPress={() => props.navigation.navigate('signup')} >Sign Up!</Text>
                </Text> */}

            </View>
        </ImageBackground>
    )
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    signUpImg: {
        width: '100%',
        minHeight: ScreenHeight,
    },
    signUpContainer: {
        width: '100%',
        // backgroundColor: '#2d003dcc',
        minHeight: ScreenHeight,
        alignItems: 'center',
        paddingTop: 80
    },
    signUpTitle: {
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 40
    },
    signUpFieldContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    signUpInputContainer: {
        flexDirection: 'row',
        color: '#ffffff',
        alignItems: 'center',
        paddingVertical: 10,
        // paddingHorizontal: 15,
        width: '90%',
        // marginVertical: 10,
        // borderRadius: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginTop: 50
    },
    signUpInput: {
        color: '#000',
        flex: 1,
        marginLeft: 15,
        fontSize: 16
    },
    signUpDropdown: {
        color: '#ffffff',
        flex: 1,
        marginLeft: 7,
        fontSize: 16,
        height: '100%'
    },
    errorField: {
        color: '#dd0000',
        marginTop: 2,
        // backgroundColor:'blue',
        width: '85%',
        fontSize: 12
    },
    signUpSend: {
        backgroundColor: '#2d003d',
        backgroundColor: '#000000',
        // paddingHorizontal: 45,
        width: '82%',
        paddingVertical: 12,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 5,
        color: '#ffffff',
        // color: '#2d003d',
        marginTop: '50%',
        marginBottom: 20
    }
})


const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}


const mapDispatchToProps = {
    logInUser: authActions.logInUser,

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
// export default SignIn