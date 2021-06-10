import { createDrawerNavigator, } from '@react-navigation/drawer'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignUpStore from '../pages/SignUpStore';
import Store from '../pages/Store'
import ShoppingCart from '../pages/ShoppingCart'
import Category from "../pages/Category"


import React from 'react'
import { navegationStack, categoryStack, cartStack, favoritesStack, loginStack, signupStack } from './Stack'
import DrawerCustom from '../components/DrawerCustom';
//import Category  from '../pages/Category'


const drawer = createDrawerNavigator();

const Drawer = (props) => {
    return (
        //aqui creamos el navegador con el .Navigator, por defecto carga el primero siempre
        <drawer.Navigator
            drawerType={'front'}
            // overlayColor='#2d003dbb'
            drawerContent={props => <DrawerCustom {...props} />}
        >
            <drawer.Screen name="Home" component={navegationStack} />
            <drawer.Screen name="loginpage" component={loginStack} />
            <drawer.Screen name="signuppage" component={signupStack} options={{ title: "Sign Up" }} />
            <drawer.Screen name="Store" component={Store} options={{ title: "Store", headerShown: false }} />
            <drawer.Screen name="shoppingCart" component={cartStack} options={{ title: "ShoppingCart", headerShown: false }} />
            <drawer.Screen name="favorites" component={favoritesStack} options={{ title: "Favorites", headerShown: false }} />
            {/* <drawerNavegator.Screen name ="SignUpStore"  component={SignUpStore} options={{title:"Sign Up Store"}}/> */}
            {/* <drawerNavegator.Screen name ="Category"  component={categoryStack} /> */}
        </drawer.Navigator>
    )
}

export default Drawer
