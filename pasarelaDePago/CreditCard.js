import React, { useState } from 'react'
import { StyleSheet, ScrollView, Alert, Text, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, View, Image, StatusBar } from 'react-native'
import {useNavigation} from '@react-navigation/core'
// import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextField, FilledTextField, OutlinedTextField,  } from 'rn-material-ui-textfield'

// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {CreditCardInput,} from 'react-native-credit-card-input';
import Toast from 'react-native-toast-message';
import AwesomeAlert from 'react-native-awesome-alerts';

const CreditCard = () => {
    const navigation = useNavigation()
  
    const [nada, setNada] = useState(false)

    const showAlert = () => {
      setNada(true)
    };

    const hideAlert = () => {
      setNada(false)
    };

    const _onChange = (e) => {
        /*
          {"status": {"cvc": "incomplete", "expiry": "incomplete", "number": "invalid"}, "valid": false, "values": {"cvc": "", "expiry": "", "number": "8", "type": undefined}}
         */
        console.log(e.values.number);
        // console.log(e.valid);
        console.log(e.values.cvc);
        console.log(e.values.expiry);
      };

      const continuar = () => {
        Toast.show({
          text1: 'Congratulations!',
          text2: 'Thank you for select us!',
          type: 'success'
        });
        navigation.navigate('Categories')
      }
      return (
        <View>
            <View></View>
            <View style={styles.contenedorTarjeta}>
                <CreditCardInput labelStyle={{color: 'white'}} inputStyle={{borderBottomColor: 'green'}} validColor="black" invalidColor="red" onChange={_onChange} />
            </View>
            <View style={styles.contenedorBotonContinuar}>
                <TouchableWithoutFeedback onPress={() => continuar()}>
                    <Text style={styles.botonContinuar}>Continuar</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    avoider: {
      flex: 1,
      padding: 36,
    },
    button: {
      margin: 36,
      marginTop: 0,
    },
    contenedorTarjeta: {
        backgroundColor: 'white',
        // backgroundColor: 'black',
        paddingTop: 30
    },
    contenedorBotonContinuar: {
        height: 70,
        alignItems: 'center',
        marginTop: 50,
    },
    botonContinuar: {
        borderRadius: 5,
        color: 'white',
        width: '80%',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        backgroundColor: 'orange',
        color: 'white'
    }
  })
  

export default CreditCard