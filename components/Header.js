
import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, Feather, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';

export default function App(props) {

    const { fatherProps, title } = props

    return (
        <>
            <StatusBar />
            <View style={styles.header}>
                {/* <Image style={styles.tinyLogo} source={require('../assets/logo.jpg')} /> */}
                <TouchableOpacity onPress={() => fatherProps.navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={30} color="black" />
                    {/* <AntDesign name="leftcircle" size={30} color="white" /> */}
                </TouchableOpacity >
                <View style={styles.filterContainerHome}>
                    <FontAwesome5 name="tags" size={20} color="black" />
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Clickabuy</Text>
                    {/* <TextInput placeholder="Find your product" placeholderTextColor="#000000" /> */}
                    {/* <SimpleLineIcons name="magnifier" size={20} color="black" /> */}
                </View>
                <Text style={styles.headerTitle}>{title && title}</Text>
                <View style={styles.buttonsCartLike}>
                    {/* <TouchableOpacity onPress={() => fatherProps.navigation.navigate('favorites')}>
                        <Feather name="heart" size={25} color="black" />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => fatherProps.navigation.navigate('shoppingCart')}>
                        <Ionicons name="md-cart-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        width: '100%',
        display: 'flex',
        backgroundColor: '#ffffff',
        // backgroundColor: '#000000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomColor: '#000000',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        // borderBottomWidth: 1
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 15,
        fontWeight: 'bold'
    },
    marca: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonsCartLike: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'red',
        width: '15%',
        justifyContent: 'space-around'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    menu: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterContainerHome: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000000',
        // borderWidth: 1,
        borderRadius: 50,
        width: '36%',
        paddingHorizontal: 10,
        paddingVertical: 3,
        justifyContent: 'space-between',
        marginLeft: 70

    }
});