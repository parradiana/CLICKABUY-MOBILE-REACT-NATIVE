
import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../components/Header';
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'
import { useNavigation } from '@react-navigation/core';

const Separator = () => (
    <View style={styles.separator} />
);

const ShoppingCart = (props) => {
    const navigation = useNavigation()

    let { cart, clearCart, increaseQuantity, deleteProductFromCart } = props
    return (
        <>
            <Header fatherProps={props} />

            <View style={styles.container}>
                <View style={styles.cart}>
                    <Text style={{fontWeight: 'bold', fontSize: 30}}>My Cart</Text>
                    <Separator />
                    <ScrollView style={{ height: "76%", width: "100%" }}>
                        {cart.map(itemCart => {
                            return (
                                <View key={itemCart._id} style={{ flexDirection: "row", width: "100%", height: 100, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: 'gray' }}>
                                    
                                    {/* Contenedor izquierdo */}
                                    {/* foto articulo */}
                                    <View style={styles.imageContainer}>
                                        <ImageBackground source={{ uri: itemCart.productImg.url }} style={styles.image} />
                                    </View>
                                    
                                    {/* Contenedor derecho */}
                                    <View style={styles.infoContainer}>

                                        <View style={styles.topContainer}>
                                            {/* Nombre producto */}
                                            <View>
                                                <Text style ={{color:"black", marginBottom: 6, fontSize: 17, width: '100%'}}>{itemCart.nameProduct}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.bottomContainer}>
                                              {/* delete */}
                                            <View style={styles.deleteContainer}>
                                                <TouchableOpacity onPress={() => deleteProductFromCart(itemCart)}>
                                                    <Text style ={{color:"#757575", fontWeight: '500'}}>Delete</Text>
                                                </TouchableOpacity>
                                            </View>

                                                {/* contador */}
                                                <View style={styles.counterContainer}>
                                                    <TouchableOpacity style={styles.counterBtn} onPress={() => increaseQuantity(itemCart._id, -1)}>
                                                        <Text style={styles.counterBtnText}>-</Text>
                                                    </TouchableOpacity>
                                                    <View style={styles.counterQuantyContainer}>
                                                        <Text style={styles.counterQuanty}>{itemCart.quantity}</Text>
                                                    </View>
                                                    <TouchableOpacity style={styles.counterBtn} onPress={() => increaseQuantity(itemCart._id, +1)}>
                                                        <Text style={styles.counterBtnText}>+</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                {/* precio */}
                                                <Text style ={{color:"black", width: 95}}>$USD {itemCart.quantity * itemCart.price}</Text>
                                            </View>
                                        </View>
                                </View>
                            )
                        })}

                    </ScrollView>
                </View>
                <View style={styles.purchaseContainer}>
                    {/* <Separator /> */}
                    <View style={styles.buttons}>
                        <Button style={styles.btnCancel}
                            /* onPress={onPressLearnMore} */
                            title="Cancel Order"
                            color="black"
                            onPress={() => clearCart()}
                        />
                        <Button style={styles.btnReady}
                            onPress={() => navigation.navigate('domicilio')} 
                            title="Ready"
                            color="black"
                        />
                    </View>
                </View>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    btnConfirm:{
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#EA957F',
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    btnConfirmPurchase:{
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    purchaseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        width: '100%'
    },
    deleteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '20%'
    },
    counterBtnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    counterContainer:{
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    counterQuanty: {
        width: 25,
        height: 25,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 3,
        marginTop: 4
    },
    counterQuantyContainer: {
        alignItems: 'center'
    },
    counterBtn: {
        width: 25,
        height: 25,
        backgroundColor: 'black',
        borderRadius: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoContainer: {
        width: '75%'
    },
    imageContainer:{
        width: '25%',
        overflow: 'hidden',
        borderRadius: 30
    },
    image: {
        width: 80,
        height: 80
    },
    topContainer:{
        flexDirection: 'row'
    },
    counterContainer: {
        alignItems: "center",
        flexDirection: 'row'
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    cart: {
        height: 'auto',
        width: '90%',
        backgroundColor: 'white',
    },
    productBuy: {
        display: 'flex',
        flexDirection: 'row',
    },
    btnCancelProduct: {
        width: 'auto',
        height: 'auto'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        paddingLeft: 15
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = {
    clearCart: cartActions.clearCart,
    deleteProductFromCart: cartActions.deleteProductFromCart,
    increaseQuantity: cartActions.increaseQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)

/*
<View style={{flexDirection:"row" ,width:"100%",backgroundColor:"blue", height:80,justifyContent:"space-between"}}>
                            <View style={{backgroundColor:"green", width:"25%", height:"100%"}}>
                                
                            </View>
                            <View>
                                <Text>Nombre</Text>
                                <TouchableOpacity style={{backgroundColor:"grey"}} onPress={()=>deleteProductFromCart("itemCart")}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                
                                <TouchableOpacity style={{backgroundColor:"grey"}} onPress={()=>increaseQuantity(itemCart._id,+1)}>  
                                    <Text>+</Text>
                                </TouchableOpacity>
                                <Text>Cantidad articulos</Text>
                                <TouchableOpacity style={{backgroundColor:"grey"}} onPress={()=>increaseQuantity(itemCart._id,-1)}>  
                                    <Text>-</Text>
                                </TouchableOpacity>
                            </View>
                            <Text>$USD : subtotal</Text>
                        </View>

*/