import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../components/Header'
import { connect } from "react-redux";
import categoryActions from "../redux/actions/categoryActions"
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AntDesign } from '@expo/vector-icons';



function Category(props) {
    const { getCurrentCategory, stores, route } = props

    const thisCategory = route.params.categories.find(cat => cat._id === route.params.selectedItem)

    useEffect(() => {
        getCurrentCategory(route.params.selectedItem)
    }, [])

    // console.log(thisCategory)
    return (

        <View style={styles.container}>
            <Header fatherProps={props} />


            <ScrollView >

                <ImageBackground source={{ uri: thisCategory.bannerCategory }} style={styles.cetegoryBanner}>
                    <View style={{ width: '40%', heigth: '100%' }}></View>
                    <Text style={styles.nameCategory}>{thisCategory && thisCategory.nameCategory}</Text>
                </ImageBackground>
                <View >
                    <View style={styles.storeContainer}>
                        {stores.map((store) => {
                            return (
                                <TouchableOpacity style={styles.categoryStoreCard} key={store._id} onPress={() => { props.navigation.navigate("store", store) }} >
                                    <View style={styles.storeCardImgContainer}>
                                        <Image source={{ uri: store.logoStore.url }} style={{ width: 80, height: 80 }} />
                                    </View>
                                    <View style={styles.cardStore}>
                                        <Text style={styles.nameStore}>{store.nameStore}</Text>
                                        {/* <Text>{store.rate.length} </Text> */}
                                        {/* <Text>Category:  </Text> */}
                                        {/* <Rating
                                            showRating={false}
                                            readonly={true}
                                            // onFinishRating={this.ratingCompleted}
                                            style={{ paddingVertical: 10, color: 'red' }}
                                            startingValue={3}
                                            fractions={2}
                                            jumpValue={0.5}
                                            ratingColor='#eeeeee'
                                            imageSize={25}
                                        /> */}
                                    </View>
                                    <AntDesign name="rightcircle" size={35} color="#EA957F" />
                                </TouchableOpacity>
                            )
                        })}

                    </View>
                </View>
            </ScrollView>


        </View>
    );
}


const mapStateToProps = (state) => {
    return {
        stores: state.categoryReducer.stores

    };
};

const mapDispatchToProps = {
    getCurrentCategory: categoryActions.getCurrentCategory,
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);



const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    cetegoryBanner: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
    },
    nameCategory: {
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '60%',
        // backgroundColor: 'red',

    },


    storeContainer: {
        // backgroundColor: 'blue',
        // flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'center',

        // paddingHorizontal: 60
    },
    categoryStoreCard: {
        marginBottom: 10,
        // marginHorizontal: 10,
        width: '95%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        paddingRight:20,
        borderWidth: 1,
        borderColor: '#EA957F'
    },

    storeCardImgContainer: {
        // width: 100,
        // backgroundColor: 'blue',
        overflow: 'hidden',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 5
    },


    cardStore: {
        backgroundColor: 'white',
        // alignItems: 'flex-start',
        // height: 10,
        flex: 1,
        paddingHorizontal: 10,
    },
    nameStore: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 20,
        color: '#000',
        
    },
    imgStore: {
        width: 30,
        height: 30,
        marginHorizontal: 10
    },



});