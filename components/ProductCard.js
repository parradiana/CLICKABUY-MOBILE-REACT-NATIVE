import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import React, { useState } from "react";
import productsActions from "../redux/actions/productActions";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'

const Product = ({ product, likeProduct, userLogged, navigation }) => {
    
    const { stock, nameProduct, price, productImg, userLiked, reviews } = product;
    const [loadingHeart, setLoadingHeart] = useState(true);

    const likes = async () => {
        if (!userLogged) {
            Toast.show({
                text1: 'Stop!',
                text2: 'You must be logged in to like an article',
                type: 'error'
            });
        } else {
            setLoadingHeart(false);
            likeProduct(userLogged.token, product._id);
            setLoadingHeart(true);
        }
    };

    /*let ratingCounter = 0;
    reviews.forEach((rating) => {
      ratingCounter = ratingCounter + rating.vote;
    });
    var starsValue = ratingCounter / reviews.length;
    */
    return (
        <View style={styles.cardProduct} key={product._id}>
            <View style={{flexDirection:'row', justifyContent: 'center', marginTop: 15}}>
            <Text style={styles.nameProduct}>{product.nameProduct}</Text>
            {/* <TouchableOpacity onPress={() => loadingHeart ? likes() : null}>
                {userLogged && userLiked.includes(userLogged.email) ? (
                    <FontAwesome name="heart" size={24} color="black" />
                ) : (
                    <FontAwesome name="heart-o" size={24} color="black" />
                )}
            </TouchableOpacity> */}

            </View>
            {<Image style={styles.imgProduct} source={{ uri: product.productImg.url }}></Image>}
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 15}}>
                <Text style={{fontSize: 18}}>Price: $ {product.price} </Text>
                <Text style={{fontSize: 18}}>Stock: {product.stock}</Text>
            </View>
            
            {/* <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 6 }}>
                <Text style={{fontSize: 18}}>Rate: </Text>
            </View> */}

            {/* <Button
                title="Add to buy"
                color="gray"
            />
            <TouchableOpacity style={{ backgroundColor: "grey" }} onPress={() => { navigation.navigate("ProductPage", product) }}>
                <Text>View More</Text>
            /> */}
            <TouchableOpacity style={{ backgroundColor: "black", borderRadius: 30, width: '50%', padding: 5, marginLeft: 90, marginBottom: 6 }} onPress={() => { navigation.navigate("ProductPage", product) }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>View More</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',

    },
    nameStore: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'pink',
        marginTop: 10
    },
    buscadorPrincipal: {
        width: '80%',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10
    },
    btnSearch: {
        width: '80%',
        marginTop: 20,
    },
    filters: {
        marginTop: 50,
        backgroundColor: 'white',
        width: '80%',

    },

    assessment: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    byPrice: {

        backgroundColor: 'blue',
        marginBottom: 10,
        marginTop: 10,
    },
    byPriceRange: {
        backgroundColor: 'pink',
        marginTop: 10
    },

    byOpinions: {
        flexDirection: "row",
        backgroundColor: 'yellow',
        marginTop: 10
    },
    cardProduct: {
        marginTop: 10,
        backgroundColor: 'white',
        width: '95%',
        borderRadius: 10,
        borderColor: '#EA957F',
        borderWidth: 1
    },
    nameProduct: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 20,
        marginBottom: 6,
        width: '60%'
    },
    imgProduct: {
        marginLeft: 100,
        width: 180,
        height: 180,
    },
});


const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart,
        userLogged: state.authReducer.userLogged,
    };
};
const mapDispatchToProps = {
    addProductToCart: cartActions.addProductToCart,
    deleteProductFromCart: cartActions.deleteProductFromCart,
    likeProduct: productsActions.likeProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
