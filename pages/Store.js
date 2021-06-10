import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'

import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import storeActions from "../redux/actions/storeActions";
import productsActions from "../redux/actions/productActions";
import ProductCard from '../components/ProductCard'

const Store = (props) => {
  const { route, getProductsFromStore, productsCurrentStore, storesForCategory, navigation, usserLoged } = props
  const { nameStore, logoStore, storeHero, rate, _id } = route.params

  const [store, setStore] = useState(null);
  //console.log(productsCurrentStore)
  //console.log(route)
  //console.log(store)
  useEffect(() => {
    !storesForCategory.length
      ? navigation.navigate("Home")
      : setStore(storesForCategory.find((store) => store._id === _id));
    getProductsFromStore(_id)
  }, []);

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


  if (!store || !storesForCategory.length) return null

  return (
    <>

      <Header fatherProps={props} />
      <ScrollView>
        <ImageBackground source={{ uri: storeHero && storeHero.url }} style={styles.storeBanner}>
          <View style={styles.storeLogoContainer}>
            <Image source={{ uri: logoStore.url }} style={styles.storeLogo}></Image>

          </View>
          <Text style={styles.titleStore}>{nameStore}</Text>

          <View style={styles.seekerStoreContainer}>
            <TextInput defaultValue="Search your product"></TextInput>
            <TouchableOpacity>
              <Ionicons name="search-circle-sharp" size={40} color="black" />
            </TouchableOpacity>
            {/* <Button
                                 onPress={onPressLearnMore}
                                title="Search!"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            /> */}
          </View>
        </ImageBackground>
        <View style={styles.container}>
          {/* <View style={styles.nameStore}>
          </View>
          <View style={styles.filters}>
            <View>
              <Text>Filters</Text>
              <View style={styles.byPrice}>
                <Text>Sort by price</Text>
                <Button
                  title="-"
                  color="gray"
                />
                <TextInput defaultValue="0"></TextInput>
                <Button
                  title="+"
                  color="gray"
                />
              </View>
              <View style={styles.byPriceRange}>
                <Text>By price range</Text>
                <View style={styles.inpPriceRange}>
                  <TextInput defaultValue="0"></TextInput>
                  <Text>to</Text>
                  <TextInput defaultValue="100000"></TextInput>
                </View>
              </View>
              <View style={styles.byOpinions}>
                <Text>By opinions of customers</Text>
                <View style={styles.assessment}>
                  <Text>1</Text>
                  <Text>2</Text>
                  <Text>3</Text>
                  <Text>4</Text>
                  <Text>5</Text>
                </View>
              </View>
            </View>
          </View> */}
          {productsCurrentStore.map(product => {
            return (
              <ProductCard key={product._id} product={product} navigation={navigation}/>
            )

          })}
          
        </View>
      </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom:20
  },
  storeBanner: {
    width: '100%',
    height: 230,

    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5
  },
  storeLogo: {
    width: 80,
    height: 80,
  },
  storeLogoContainer: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 5
  },
  titleStore: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },





  nameStore: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'pink',
  },
  seekerStoreContainer: {
    backgroundColor: '#ffffff',
    width: '80%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'space-between',
    paddingRight: 2,
    paddingLeft: 15,
    marginTop: 15

    // borderColor: 'gray',
    // borderWidth: 1,
  },
  btnSearch: {
    width: '80%',
    marginTop: 20,
  },
  byPrice: {
    backgroundColor: 'blue',
    marginBottom: 10,
    marginTop: 10,
  },
  byPriceRange: {
    backgroundColor: 'pink',
  },
  inpPriceRange: {
    display: 'flex',
    flexDirection: 'row',
  },
  byOpinions: {
    backgroundColor: 'yellow',
  },
  cardProduct: {
    backgroundColor: 'white',
    width: '90%',
  },
  nameProduct: {
    textAlign: 'center',
  },
  imgProduct: {
    width: 30,
    height: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    storesForCategory: state.categoryReducer.stores,
    //products: state.productReducer.products,
    productsCurrentStore: state.productReducer.productsCurrentStore,
    userLogged: state.authReducer.userLogged,
    /*filterProductCurrentStore: state.productReducer.filterProductCurrentStore*/
  };
};

const mapDispatchToProps = {
  getProductsFromStore: productsActions.getProductsFromStore,
  /*filterProductsCurrentStore: productsActions.filterProductsCurrentStore,
  rateStore: storeActions.rateStore,
  getCurrentStore: storeActions.getCurrentStore*/
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);

