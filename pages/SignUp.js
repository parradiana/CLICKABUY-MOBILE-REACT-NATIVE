import React, { useEffect, useState } from 'react'
import { Button, View, Platform, Text, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { connect } from 'react-redux'
import authActions from "../redux/actions/authActions";

import Header from '../components/Header'
import Toast from 'react-native-toast-message'

const SignUp = (props) => {

    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', userImg: '', loggedWithGoogle: false })
    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', userImg: '' })
    const [passwordNotShow, setPasswordNotShow] = useState(true)
    // const [selectedValue, setSelectedValue] = useState('')


    // useEffect(() => { setNewUser({ ...newUser, country: selectedValue }) }, [selectedValue])
    const getInput = (e, field) => { setNewUser({ ...newUser, [field]: e }) }


    const sendNewUser = async (e = null, user) => {

        if (!(user.firstName === '' || user.lastName === '' || user.email === '' || user.password === '')) {

            let formData = new FormData();
            formData.append("loggedWithGoogle", newUser.loggedWithGoogle);
            formData.append("firstName", newUser.firstName);
            formData.append("lastName", newUser.lastName);
            formData.append("email", newUser.email);
            formData.append("password", newUser.password);

            const catchErrors = await props.signUpUser(formData)


            if (catchErrors) {
                setErrors({ firstName: '', lastName: '', email: '', password: '' })
                catchErrors.map(err => setErrors(prevState => {
                    return { ...prevState, [err.label]: err.message }
                }))
            } else if (e) {
                setNewUser({ firstName: '', lastName: '', email: '', password: '', userImg: '' })
                props.navigation.navigate('Home')
            }
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
            <StatusBar />
            <Header fatherProps={props} />

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpTitle}>Welcome</Text>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="person" size={25} color="#000000" />
                        <TextInput placeholder="First Name" placeholderTextColor="#000000" style={styles.signUpInput} onChangeText={(e) => getInput(e, 'firstName')} />
                    </View>
                    <Text style={styles.errorField}>{errors.firstName}</Text>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="person" size={25} color="#000000" />
                        <TextInput placeholder="Last Name" placeholderTextColor='#000000' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'lastName')} />
                    </View>
                    <Text style={styles.errorField}>{errors.lastName}</Text>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="email" size={25} color="#000000" />
                        <TextInput placeholder="Email" placeholderTextColor='#000000' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'email')} />
                    </View>
                    <Text style={styles.errorField}>{errors.email}</Text>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="vpn-key" size={25} color="#000000" />
                        <TextInput placeholder="Password" placeholderTextColor='#000000' secureTextEntry={passwordNotShow} style={styles.signUpInput} onChangeText={(e) => getInput(e, 'password')} />
                        {
                            passwordNotShow
                                ? <MaterialCommunityIcons name="eye" size={20} color="#000000" onPress={() => setPasswordNotShow(false)} />
                                : <MaterialCommunityIcons name="eye-off" size={20} color="#000000" onPress={() => setPasswordNotShow(true)} />
                        }
                    </View>
                    <Text style={styles.errorField}>{errors.password}</Text>
                </View>

                {/* <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="camera-alt" size={25} color="#000000" />
                        <TextInput placeholder="Url picture (Optional)" placeholderTextColor='#000000' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'userImg')} />
                    </View>
                    <Text style={styles.errorField}>{errors.userPic}</Text>
                </View> */}

                <Text style={styles.signUpSend} onPress={(e) => sendNewUser(e, newUser)} >SIGN UP</Text>
                {/* <Text>
                    <Text style={{ color: 'black', fontSize: 20 }}>Alredy have an account?</Text> <Text
                        style={{ color: 'black', fontSize: 20, textDecorationLine: 'underline' }} onPress={() => props.navigation.navigate('signin')}>Sign In!</Text>
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
        paddingTop: 50
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
        marginTop: 60,
        marginBottom: 20
    }
})


// export default SignUp

const mapDispatchToProps = {
    signUpUser: authActions.signUpUser,
};

export default connect(null, mapDispatchToProps)(SignUp)