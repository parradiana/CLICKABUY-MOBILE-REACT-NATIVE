import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextField, FilledTextField, OutlinedTextField,  } from 'rn-material-ui-textfield'
import { useNavigation } from '@react-navigation/core';

const Domicilio = () => {
    const navigation = useNavigation()
    return (
        <>
            <View style={styles.contenedorTitulo}>
                <Text style={styles.textoTitulo}>Agregá un Domicilio</Text>
            </View>
            <View style={styles.contenedorDeInputs}>
                <TextField
                    style={styles.direccionesInput}
                    lineWidth={1}
                    width= {30}
                    label="Nombre y Apellido"
                    baseColor="rgb(0,0,0)"
                    />
                
                <TextField
                    style={styles.direccionesInput}
                    lineWidth={1}
                    width= {30}
                    label="Direccion"
                    baseColor="rgb(0,0,0)"
                    />

                <TextField
                    style={styles.direccionesInput}
                    lineWidth={1}
                    width= {30}
                    label="Localidad"
                    baseColor="rgb(0,0,0)"
                    />

                <TextField
                    style={styles.direccionesInput}
                    lineWidth={1}
                    width= {30}
                    label="Codigo Postal"
                    baseColor="rgb(0,0,0)"
                    />

                <TextField
                    style={styles.direccionesInput}
                    lineWidth={1}
                    width= {30}
                    label="Provincia"
                    baseColor="rgb(0,0,0)"
                    />
                <TextField
                    style={styles.direccionesInput}
                    lineWidth={1}
                    width= {30}
                    label="Telefono"
                    baseColor="rgb(0,0,0)"
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('metodoDeEnvio')}>
                <View style={styles.botonAvanzar}>
                    <Text style={styles.textoAvanzar}>Avanzar</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    contenedorTitulo: {
        width: '100%',
        height: 80,
        backgroundColor: 'rgb(254,134,148)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoTitulo: {
        fontSize: 22,
        color: 'black'
    },
    contenedorDeInputs: {
        // backgroundColor: 'green',
        width: '90%',
        marginLeft: '5%',
        marginTop: 30
    },
    botonAvanzar: {
        // backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    textoAvanzar: {
        fontSize: 25,
        backgroundColor: 'lightpink',
        paddingVertical: 10,
        paddingHorizontal: 30
    }
})

export default Domicilio
