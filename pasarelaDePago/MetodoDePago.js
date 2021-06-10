import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';

const MetodoDePago = () => {
    const navigation = useNavigation()
    
    return(
        <View style={styles.generalContainer}>
            <View style={styles.contenedorTitulo}>
                <Text style={styles.titulo}>Choose a payment method</Text>
            </View> 

            <View style={styles.contenedorOpcionesDePago}>
                <TouchableHighlight onPress={()=> navigation.navigate('creditCard')} style={styles.contenedorOpcionDePago} underlayColor='#858585'>
                    <View style={styles.opcionDePago1}>
                        <View style={styles.iconoOpcion1}>
                            <FontAwesome5 name="credit-card" size={24} color="green" />
                            {/* <FontAwesome name="credit-card" size={24} color="rgb(61, 137, 250)" /> */}
                        </View>
                        <Text style={styles.textoOpcionDePago}>Visa Debito</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={()=> navigation.navigate('creditCard')} style={styles.contenedorOpcionDePago} underlayColor='#858585'>
                    <View style={styles.opcionDePago2}>
                        <View style={styles.iconoOpcion2}>
                            <Ionicons name="ios-card-outline" size={30} color="green" />
                        </View>
                        <Text style={styles.textoOpcionDePago}>Visa Credito</Text>    
                    </View>
                </TouchableHighlight>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: 'rgb(230,230,230)',
        height: '100%'
    },
    contenedorTitulo: {
        height: 120,
        width: '100%',
        backgroundColor: 'rgb(246,90,14)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 23,
        color: 'white',
    },
    contenedorOpcionesDePago: {
        marginTop: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    contenedorOpcionDePago: {
        backgroundColor: 'green',
        width: 170,
        height: 170,
        borderRadius: 7
    },
    contenedorPagoEnEfectivo: {
        // backgroundColor: 'green',
        alignItems: 'center',
        marginTop: 20
    },  
    opcionDePago1: {
        borderRadius: 7,
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    opcionDePago2: {
        borderRadius: 7,
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    opcionDePago3: {
        borderRadius: 7,
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    iconoOpcion1: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'white',
        backgroundColor: 'rgb(230,230,230)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconoOpcion2: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'rgb(230,230,230)',
        alignItems: 'center',
        justifyContent: 'center'
    
    },
    iconoOpcion3: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'white',
        backgroundColor: 'rgb(230,230,230)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoOpcionDePago: {
        fontSize: 17,
        textAlign: 'center'
    },
    textoOpcionDePagoEspecial: {
        fontSize: 17,
        textAlign: 'center',
        marginLeft: 5
    },
    contenedorIconoFlecha: {
        flex: 1,
        alignItems: 'flex-end'
    },
    iconoFlecha: {
        marginRight: 20
        // backgroundColor: 'green'
    },  
    contenedorBotonContinuar: {
        height: 70,
        alignItems: 'center'
    },
    botonContinuar: {
        borderRadius: 5,
        color: 'white',
        width: '80%',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white'
    }
})

export default MetodoDePago