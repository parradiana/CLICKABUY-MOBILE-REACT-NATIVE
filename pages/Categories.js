
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import HeaderHome from '../components/HeaderHome'
import ReactNativeSelect from "@evolvier/react-native-select";
import { connect } from "react-redux";
import categoryActions from "../redux/actions/categoryActions"
import { MaterialCommunityIcons } from '@expo/vector-icons';

let ScreenHeight = Dimensions.get("window").height;


const Categories = (props) => {
  const { categories, getAllCategories, navigation } = props

  const [modalState, setModalState] = useState(true)


  useEffect(() => {
    getAllCategories()
  }, [])

  let data = categories.map(categories => ({ key: categories._id, title: categories.nameCategory }))

  let categoriesHome = categories.filter((cat, i) => i < 5)
  let categoriesModal = categories.filter((cat, i) => i >= 8)


  return (

    <View style={styles.container}>
      <HeaderHome fatherProps={props} />

      {/* {modalState
          && 
            <View style={styles.modalHomeContainer}>
              {
                categoriesModal.map(category => {
                  return (
                    <TouchableOpacity key={category._id} style={styles.categoriesCard} onPress={() => {
                      navigation.navigate("Category", { selectedItem: category._id, categories })
                    }} >
                      <ImageBackground source={{ uri: category.imageCategory }} style={{ width: 100, height: 100 }}>
                      </ImageBackground>
                      <Text>{category.nameCategory}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
        } */}
      <ScrollView style={{ position: 'relative', width: '100%', height: '100%' }}>
          <View style={{marginTop: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 30, marginLeft: 10, marginBottom: 10}}>Categories</Text>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>What are you looking for?</Text>
          </View>

        {/* 
      <View>
      <ReactNativeSelect
      items={data}
      onSubmit={(selectedItem) => { navigation.navigate("Category", { selectedItem, categories }) }}
      />
    </View> */}

        <View style={styles.categoriesCardsContainerHome}>
          {
            categories.map(category => {
              return (
                <TouchableOpacity key={category._id} style={styles.categoriesCard} onPress={() => {
                  navigation.navigate("Category", { selectedItem: category._id, categories })
                }} >
                  <ImageBackground source={{ uri: category.imageCategory }} style={{ width: 60, height: 60 }}>
                  </ImageBackground>
                  <Text style={styles.categoriesCardTitle}>{category.nameCategory}</Text>
                </TouchableOpacity>
              )
            })
          }
          {/* <TouchableOpacity style={styles.categoriesCardModal}>
              <MaterialCommunityIcons name="view-grid-outline" size={24} color="black" />
            </TouchableOpacity> */}

        </View>

        {/* <View>
        <TextInput style={styles.buscadorPrincipal} defaultValue="Search your product!"></TextInput>
        <Button
        title="Search!"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
        </View> */}
      </ScrollView>

    </View >
  );
}


const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer.categories,
    /*userLogged: state.authReducer.userLogged */
    /*   userLogged: state.authReducer.userLogged */
  };
};

const mapDispatchToProps = {
  getAllCategories: categoryActions.getAllCategories,

};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);



const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  buscadorPrincipal: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  categoriesCardsContainerHome: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  categoriesCard: {
    width: '28%',
    height: 120,
    backgroundColor: '#eeeeee',
    marginVertical: 8,
    // justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 15

  },
  categoriesCardTitle: {
    textAlign: 'center',
    maxWidth: '90%',
    marginTop: 5,
    fontWeight: 'bold'
  }
  // categoriesCardModal: {
  //   width: '28%',
  //   height: 120,
  //   backgroundColor: '#ffffff'
  // },
  // modalHomeContainer: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '60%',
  //   backgroundColor: 'red',
  //   zIndex: 5,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   bottom: 0
  // }
});