import { createStackNavigator } from '@react-navigation/stack';

import Categories from '../pages/Categories'
import React from 'react'
import Category from "../pages/Category"
import ShoppingCart from '../pages/ShoppingCart';
import Store from '../pages/Store';
import ProductPage from '../pages/ProductPage';
import FavoritesPage from '../pages/FavoritesPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import Home from '../pages/Home'
import Domicilio from '../pasarelaDePago/Domicilio';
import MetodoDeEnvio from '../pasarelaDePago/MetodoDeEnvio';
import MetodoDePago from '../pasarelaDePago/MetodoDePago';
import CreditCard from '../pasarelaDePago/CreditCard';
import ConfirmarCompra from '../pasarelaDePago/ConfirmarCompra';
import PagoEnEfectivo from '../pasarelaDePago/PagoEnEfectivo';


const stackNavegator = createStackNavigator();

export const navegationStack = () => {
    return (
        //aqui creamos el navegador con el .Navigator, por defecto carga el primero siempre
        <stackNavegator.Navigator>
            <stackNavegator.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <stackNavegator.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
            <stackNavegator.Screen name="Category" component={Category} options={{ headerShown: false }} />
            <stackNavegator.Screen name="store" component={Store} options={{ headerShown: false }} />
            <stackNavegator.Screen name="ProductPage" component={ProductPage} options={{ headerShown: false }} />
        </stackNavegator.Navigator>
    )
}
// export const cartStack = () => {
//     return (
//         <stackNavegator.Navigator>
//             <stackNavegator.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
//         </stackNavegator.Navigator>
//     )
// }

export const cartStack = () => {
    return (
        <stackNavegator.Navigator>
            <stackNavegator.Screen name="shoppingCart" component={ShoppingCart} options={{ headerShown: false }} />
            <stackNavegator.Screen name="domicilio" component={Domicilio} options={{ headerShown: false }} />
            <stackNavegator.Screen name="metodoDeEnvio" component={MetodoDeEnvio} options={{ headerShown: false }} />
            <stackNavegator.Screen name="metodoDePago" component={MetodoDePago} options={{ headerShown: false }} />
            <stackNavegator.Screen name="pagoEnEfectivo" component={PagoEnEfectivo} options={{ headerShown: false }} />
            <stackNavegator.Screen name="creditCard" component={CreditCard} options={{ headerShown: false }} />
            <stackNavegator.Screen name="confirmarCompra" component={ConfirmarCompra} options={{ headerShown: false }} />
            <stackNavegator.Screen name="Categories" component={Categories} options={{ headerShown: false }} />

        </stackNavegator.Navigator>
    )
}

export const favoritesStack = () => {
    return (
        <stackNavegator.Navigator>
            <stackNavegator.Screen name="favorites" component={FavoritesPage} options={{ headerShown: false }} />
        </stackNavegator.Navigator>
    )
}

export const loginStack = () => {
    return (
        <stackNavegator.Navigator>
            <stackNavegator.Screen name="loginpage" component={SignInPage} options={{ headerShown: false }} />
            <stackNavegator.Screen name="login" component={SignIn} options={{ headerShown: false }} />
        </stackNavegator.Navigator>
    )
}

export const signupStack = () => {
    return (
        <stackNavegator.Navigator>
            <stackNavegator.Screen name="signuppage" component={SignUpPage} options={{ headerShown: false }} />
            <stackNavegator.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
        </stackNavegator.Navigator>
    )
}

