import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../styles/COLORS"
import BoutiqueResearchScreen from "./BoutiqueResearchScreen";
import EcommerceResearchScreen from "./EcommerceResearchScreen";
import MenusResearchScreen from "./MenusResearchScreen";
import RestaurantResearchScreen from "./RestaurantResearchScreen";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES"

console.log(IDS_SERVICE_CATEGORIES.ecommerce)


/**
 * screen pour afficher les top tabs pour les recherche des produits, menu, boutique et restaurant
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 2/2/2023
 * @returns 
 */

const TopTab = createMaterialTopTabNavigator()

export default function SearchTopTabsScreen({search, service}) {
        
        return (
                <TopTab.Navigator
                        screenOptions={{
                                tabBarStyle: styles.tabBar,
                                tabBarIndicatorContainerStyle: {
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#F1F1F1'
                                },
                                tabBarPressColor: '#ddd',
                                tabBarIndicatorStyle: {
                                        height: 1,
                                        backgroundColor: COLORS.ecommercePrimaryColor
                                },
                                tabBarLabelStyle: {
                                        color: '#000',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                }
                        }}
                >
                        <TopTab.Screen name="EcommerceResearchScreen" component={EcommerceResearchScreen} initialParams={{search}} options={{ title: "Produits"}}/>
                        <TopTab.Screen name="MenusResearchScreen" component={MenusResearchScreen} initialParams={{search}} options={{ title: "Menus"}}/>
                        <TopTab.Screen name="BoutiqueResearchScreen" component={BoutiqueResearchScreen} initialParams={{search}} options={{ title: "Boutique"}}/>
                        <TopTab.Screen name="RestaurantResearchScreen" component={RestaurantResearchScreen} initialParams={{search}} options={{ title: "Restaurant"}}/>

                </TopTab.Navigator>
        )
}

const styles = StyleSheet.create({
        tabBar: {
                backgroundColor: '#fff',
                paddingHorizontal: 0,
                paddingVertical: 0,
                elevation: 0,
        },
})