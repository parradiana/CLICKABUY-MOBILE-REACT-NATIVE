import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { ImageBackground, ScrollView, Text, View, Dimensions, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Image } from "react-native"
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import authActions from '../redux/actions/authActions';




const DrawerCustom = (props) => {


    return (
        <>
            <View style={styles.drawerUserContainer}>
                <View style={styles.userPicDrawerContainer} >
                    {props.userLogged
                        ? <Image source={{ uri: props.userLogged.userImg.url }} style={styles.userPicDrawer} />
                        : <Image source={{ uri: 'https://www.hrlact.org/wp-content/uploads/2020/12/generic-user-icon-300x300.jpg' }} style={{ width: 55, height: 55,  }}></Image>
                        // : <Text>No hay logueado</Text>
                    }

                </View>
                <Text style={styles.userNameDrawer}>Hi {props.userLogged ? props.userLogged.firstName : 'you'}! </Text>
            </View>

            {/* <DrawerItem
                label='Home'
                icon={() => <Ionicons name="ios-home-sharp" size={24} color="#2d003dcc" />}
                onPress={() => props.navigation.navigate('Home')}

            /> */}

            <DrawerItem
                label='Categories'
                icon={() => <Ionicons name="ios-football-outline" size={24} color="black" />}
                onPress={() => props.navigation.navigate('Categories')}

            />
            {
                props.userLogged ?
                    <DrawerItem
                        label='Log out'
                        icon={() => <FontAwesome name="sign-out" size={24} color="#2d003dcc" />}
                        onPress={() => props.logOutUser()}
                    />
                    :
                    <>
                        <DrawerItem
                            label='Log In'
                            icon={() => <FontAwesome name="sign-in" size={24} color="#2d003dcc" />}
                            onPress={() => props.navigation.navigate('loginpage')}
                        />
                        <DrawerItem
                            label='Sign Up'
                            icon={() => <FontAwesome name="sign-in" size={24} color="#2d003dcc" />}
                            onPress={() => props.navigation.navigate('signuppage')}
                        />
                    </>
            }

            {/* <DrawerItem
                label='Cities'
                icon={() => <MaterialCommunityIcons name="city-variant" size={24} color="#2d003dcc" />}
                onPress={() => props.navigation.navigate('cities')}
            />



            


            <DrawerItem
                label='Sign Up'
                icon={() => <Ionicons name="person-add" size={24} color="#2d003dcc" />}
                onPress={() => props.navigation.navigate('signup')}
            /> */}
            {/* <DrawerItem
                label='Sign Out'
                icon={() => <FontAwesome name="sign-out" size={24} color="#2d003dcc" />}
                onPress={props.logOutUser}
            />  */}


        </>
    )
}

const styles = StyleSheet.create({
    drawerUserContainer: {
        width: '100%',
        // height: 80,
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "#2d003d99",
        // borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 25,
        marginBottom: 10
    },
    userPicDrawerContainer: {
        width: 55,
        height: 55,
        borderRadius: 50,
        overflow: 'hidden',
    },
    userPicDrawer: {
        width: 55,
        height: 55
    },
    userNameDrawer: {
        marginLeft: 10,
        fontSize: 20,
        color: "#2d003d"
    }
})


const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    logOutUser: authActions.logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerCustom)



