import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PaginationHeader from "../components/ecommerce/main/PaginationHeader";
import AllProductsScreen from "../screens/e-commerce/AllProductsScreen";
import EcommerceCartScreen from "../screens/e-commerce/EcommerceCartScreen";
import EcommerceHomeScreen from "../screens/e-commerce/EcommerceHomeScreen";
import PaymentScreen from "../screens/e-commerce/PaymentScreen";
import ProductDetailsScreen from "../screens/e-commerce/ProductDetailsScreen";
import ShopScreen from "../screens/e-commerce/ShopScreen";
import SearchLivreurScreen from "../screens/e-commerce/SearchLivreurScreen";
import ShippingInfoScreen from "../screens/e-commerce/ShippingInfoScreen";
import ShopsScreen from "../screens/e-commerce/ShopsScreen";
import BoutiqueListeScreen from "../screens/liste_e-commerce/BoutiqueListeScreen";
import CategorieListeScreen from "../screens/liste_e-commerce/CategorieListeScreen";
import PlusRecommandeScreen from "../screens/liste_e-commerce/PlusRecommandeListeScreen";
import WishlistTab from "../screens/wishlist/WishlistTab";
export default function EcommerceNavigator() { 
    
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator>
                              <Stack.Group screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}>
                                        <Stack.Screen name="EcommerceHomeScreen" component={EcommerceHomeScreen} />
                                        <Stack.Screen name="EcommerceCartScreen" component={EcommerceCartScreen} />
                                        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                                        <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} />
                                        <Stack.Screen name="ShopsScreen" component={ShopsScreen} />
                                        <Stack.Screen name="ShopScreen" component={ShopScreen} />

                                        <Stack.Screen name="BoutiqueListeScreen" component={BoutiqueListeScreen}/>
                                        <Stack.Screen name="CategorieListeScreen" component={CategorieListeScreen}/>
                                        <Stack.Screen name="PlusRecommandeScreen" component={PlusRecommandeScreen}/>
                              </Stack.Group>
                    </Stack.Navigator>
          )
}