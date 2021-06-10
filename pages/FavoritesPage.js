import React ,{useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, TouchableOpacity, StatusBar } from 'react-native';
import ProductCard from '../components/ProductCard'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productActions'
import Header from '../components/Header'

const FavoritesPage = ({ navigation, userLogged, products,getAllProducts }) => {
    useEffect(() => {
        if(products.length === 0)
            getAllProducts()
        /*navigation.addListener("focus",()=>{
            this.props.clearItineraries();
        })*/
    }, []);
    if(products.length === 0) return null

    console.log(products)
    const favorites = products.filter(product => {
        if (userLogged && product.userLiked.find(email => email === userLogged.email))
            return true;
        return false;
    })
    return (
        <View style={{ flexDirection: "row", width: "100%", backgroundColor: "blue", height: "90%", justifyContent: "space-between" }}>
            <Header title={'Favorities'} />
            {
                favorites.length === 0
                    ? <View>
                        <Text>You have no favorites yet</Text>
                    </View>
                    : <ScrollView style={{ width: "90%", height: "90%" }}>
                        {favorites.map(favorite => {
                            return (
                                <ProductCard key={favorite._id} product={favorite}  />
                            )

                        })}
                    </ScrollView>

            }

        </View>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productReducer.products,
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    getAllProducts : productActions.getAllProducts
}

export default connect(mapStateToProps,mapDispatchToProps)(FavoritesPage)