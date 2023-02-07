import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommandeTabScreen from "../screens/commande/CommandeTabScreen";
import LivraisonTabScreen from "../screens/commande/LivraisonTabScreen";
import StatusTabScreen from "../screens/commande/StatusTabScreen";
import { COLORS } from "../styles/COLORS"

const TopTabs = createMaterialTopTabNavigator()

export default function CommandeDetailsTabs({commande, serviceCategory}) {
        return (
                <TopTabs.Navigator
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
                        <TopTabs.Screen name="CommandeTabScreen" component={CommandeTabScreen} initialParams={{commande, serviceCategory}} options={{ title: "Commande" }} />
                        <TopTabs.Screen name="LivraisonTabScreen" component={LivraisonTabScreen} initialParams={{commande, serviceCategory}} options={{ title: "Livraison" }} />
                        <TopTabs.Screen name="StatusTabScreen" component={StatusTabScreen} initialParams={{commande, serviceCategory}} options={{ title: "Statut" }} />
                </TopTabs.Navigator>
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