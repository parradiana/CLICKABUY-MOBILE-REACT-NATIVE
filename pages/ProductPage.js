import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import productActions from '../redux/actions/productActions'
import cartActions from '../redux/actions/cartActions'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'

const ProductPage = (props) => {
    let { route, addProductToCart, cart, userLogged, deleteProductFromCart} = props;
    let product = route.params;
    let userLiked = route.params.userLiked
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
            props.likeProduct(userLogged.token, product._id);
            setLoadingHeart(true);
        }
    };
    return (
        <View style={{ backgroundColor: 'white' }}>
            <Header fatherProps={props} />
            {/* <ScrollView> */}
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                {/* <View> */}
                <Image style={styles.imageProductPage} source={{ uri: product.productImg.url }}></Image>
                {/* </View> */}
                <View style={{ justifyContent: "space-around", marginTop: 8}}>
                    <View style={{marginLeft: 30}}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, width: '75%', marginRight: 30}}>{product.nameProduct}</Text>
                        {/* <TouchableOpacity onPress={() => loadingHeart ? likes() : null}>
                            {userLogged && userLiked.includes(userLogged.email) ? (
                                <FontAwesome name="heart" size={30} color="black" />
                            ) : (
                                <FontAwesome name="heart-o" size={30} color="black" />
                            )}
                        </TouchableOpacity> */}
                    </View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Stars</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Price: $ {product.price}</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Stock : {product.stock}</Text>

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        {cart.find(item => item._id === product._id)
                            ? <TouchableOpacity style={{ backgroundColor: "black", padding: 15, borderRadius: 10, width: '40%', marginTop: 13, alignItems:'center' }} onPress={() => deleteProductFromCart(product)}>
                                    <FontAwesome5 name="trash" size={24} color="white"/>
                                </TouchableOpacity>
                            : <TouchableOpacity style={{ backgroundColor: "black", padding: 15, borderRadius: 10, width: '40%', marginTop: 13 }} onPress={() => addProductToCart(product)}>
                                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>ADD TO CART</Text>
                            </TouchableOpacity>
                        }

                        <TouchableOpacity style={{ backgroundColor: "black", marginLeft: 10, padding: 15, borderRadius: 10, width: '40%', marginTop: 13 }} onPress={() => console.log("Pasarela de pagos")}>
                            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>BUY NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* </ScrollView> */}
        </View>

    )
}
const styles = StyleSheet.create({
    imageProductPage: {
        marginTop: 30,
        marginLeft: 40,
        width: '80%',
        height: '44%',
        // flex: 1,
        // resizeMode: "cover",
        // justifyContent: "center"
        // resizeMode: 'contain'
    }
})
const mapStateToProps = state => {
    return {
        products: state.productReducer.products,
        cart: state.cartReducer.cart,
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    //getProductsFromStore: productsActions.getProductsFromStore,
    addProductToCart: cartActions.addProductToCart,
    deleteProductFromCart: cartActions.deleteProductFromCart,
    likeProduct: productActions.likeProduct,
    //increaseQuantity: cartActions.increaseQuantity
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)