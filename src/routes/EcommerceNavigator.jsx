import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AllProductsScreen from "../screens/e-commerce/AllProductsScreen";
import EcommerceCartScreen from "../screens/e-commerce/EcommerceCartScreen";
import EcommerceHomeScreen from "../screens/e-commerce/EcommerceHomeScreen";
import ProductDetailsScreen from "../screens/e-commerce/ProductDetailsScreen";
import ShopScreen from "../screens/e-commerce/ShopScreen";
import ShopsScreen from "../screens/e-commerce/ShopsScreen";
import BoutiqueListeScreen from "../screens/liste_e-commerce/BoutiqueListeScreen";
import CategorieListeScreen from "../screens/liste_e-commerce/CategorieListeScreen";
import PlusRecommandeScreen from "../screens/liste_e-commerce/PlusRecommandeListeScreen";
import EcommerceHeader from "../components/ecommerce/main/EcommerceHeader";
<<<<<<< HEAD
=======
import RechercheScreen from "../screens/restaurant/RechercheScreen";
import RechercheAllScreen from "../screens/research/RechercheAllScreen";
import AllNotesScreen from    "../screens/e-commerce/AllNotesScreen"
>>>>>>> feat/ratings
export default function EcommerceNavigator() { 
    
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator>
                              <Stack.Group screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}>
                                        <Stack.Group screenOptions={{ headerShown: false,  }}>
                                                  <Stack.Screen name="EcommerceHomeScreen" component={EcommerceHomeScreen} />
                                                  <Stack.Screen name="EcommerceCartScreen" component={EcommerceCartScreen} />
                                                  <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                                                  <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} />
                                                  <Stack.Screen name="ShopsScreen" component={ShopsScreen} />
                                                  <Stack.Screen name="BoutiqueListeScreen" component={BoutiqueListeScreen}/>
                                                  <Stack.Screen name="CategorieListeScreen" component={CategorieListeScreen}/>
                                                  <Stack.Screen name="PlusRecommandeScreen" component={PlusRecommandeScreen}/>
                                        </Stack.Group>
                                        <Stack.Screen name="ShopScreen" component={ShopScreen} options={{ 
                                                  headerShown: true,
                                                  header: props => <EcommerceHeader {...props} />
                                        }} />
                              </Stack.Group>
                    </Stack.Navigator>
          )
}