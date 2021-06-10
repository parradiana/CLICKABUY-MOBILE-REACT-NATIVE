import React from 'react'
import { ScrollView, TouchableHighlight, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PagoEnEfectivo = () => {
    return(
        <View style={styles.generalContainer}>
        <View style={styles.contenedorTitulo}>
            <Text style={styles.titulo}>Choose a receiving method</Text>
        </View>

        <View style={styles.freeShipContainer}>
        </View>

        <View style={styles.contenedorDeOpciones}>
            <View style={styles.contendorOpcion1y2}>
                <TouchableOpacity onPress={() => navigation.navigate('metodoDePago')}>
                    <View style={styles.opcion2}>
                        <Text style={styles.retireText}></Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.contendorOpcion3y4}>
                <TouchableOpacity onPress={() => navigation.navigate('metodoDePago')}>
                    <View style={styles.opcion3}>
                        <Text style={styles.retireText}>Agree with the seller</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('metodoDePago')}>
                    <View style={styles.opcion4}>
                        <Text style={styles.retireText}>Retire by FedEx</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View> 
    )
}

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: 'rgb(230,230,230)'
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
    retireText: {
        color: 'black',
        fontSize: 16
    },
    freeShipText: {
        color: '#24AD27',
        fontSize: 14
    },
    freeShipContainer: {
        // backgroundColor: 'green',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    contenedorDeOpciones: {
        // backgroundColor: 'green',
        // marginTop: 100,
        width: '100%',
    },
    contendorOpcion1y2: {
        // backgroundColor: 'orange',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    contendorOpcion3y4: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },  
    opcion1: {
        width: 170,
        height: 170,
        borderRadius: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    opcion2: {
        width: 170,
        height: 170,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    opcion3: {
        width: 170,
        height: 170,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    opcion4: {
        width: 170,
        height: 170,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default PagoEnEfectivo