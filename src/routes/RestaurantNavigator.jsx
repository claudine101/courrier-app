import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import RestaurantHeader from "../components/restaurants/main/RestaurantHeader";
import AllNotesScreen from "../screens/e-commerce/AllNotesScreen";
import ShopScreen from "../screens/e-commerce/ShopScreen";

import CategorieMenuScreen from "../screens/liste_restaurant/CategorieMenuScreen";
import MenuScreen from "../screens/liste_restaurant/MenuScreen";
import MenuScreenCategorie from "../screens/liste_restaurant/MenuScreenCategorie";
import RestaurantProcheScreen from "../screens/liste_restaurant/RestaurantProcheScreen";
import AllFiltersScreen from "../screens/restaurant/AllFiltersScreen";

import AllMenuScreen from "../screens/restaurant/AllMenuScreen";
import MenuDetailScreen from "../screens/restaurant/MenuDetailScreen";
import MenusRestaurantScreen from "../screens/restaurant/MenusRestaurantScreen";
import RechercheScreen from "../screens/restaurant/RechercheScreen";
import RestaurantCartScreen from "../screens/restaurant/RestaurantCartScreen";
import RestaurantHomeScreen from "../screens/restaurant/RestaurantHomeScreen";
import RestaurantScreen from "../screens/restaurant/RestaurantScreen";


export default function RestaurantNavigator() {
          const Stack = createStackNavigator()
          return (

                    <Stack.Navigator >
                              <Stack.Group screenOptions={{ headerShown: false }}>
                                        <Stack.Screen name="RestaurantHomeScreen" component={RestaurantHomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="MenuDetailScreen" component={MenuDetailScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="RestaurantCartScreen" component={RestaurantCartScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="MenusRestaurantScreen" component={MenusRestaurantScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="AllMenuScreen" component={AllMenuScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="RestaurantProcheScreen" component={RestaurantProcheScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="CategorieMenuScreen" component={CategorieMenuScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="MenuScreenCategorie" component={MenuScreenCategorie} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                                        <Stack.Screen name="RechercheScreen" component={RechercheScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                                        <Stack.Screen name="AllFiltersScreen" component={AllFiltersScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                              </Stack.Group>
                              <Stack.Screen name="ShopScreen" component={ShopScreen} options={{
                                        headerShown: true,
                                        header: props => <RestaurantHeader {...props} />,
                                        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
                              }} />
                    </Stack.Navigator>
          )
}