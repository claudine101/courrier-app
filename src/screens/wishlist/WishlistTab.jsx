import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useRef, useState, useEffect } from 'react'
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import EcommerceBadge from '../../components/ecommerce/main/EcommerceBadge';
import { COLORS } from '../../styles/COLORS';
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import EcommerceWishlistScreen from './EcommerceWishlistScreen';
import EvenementWishlistScreen from './EvenementWishlistScreen';
import RestaurantWishlistScreen from './RestaurantWishlistScreen';
import { DrawerActions, useNavigation } from "@react-navigation/native";
const TopBar = createMaterialTopTabNavigator()

export default function WishlistTab() {
    const navigation = useNavigation()
    const { height } = useWindowDimensions()

    useEffect(() => {
        (async () => {
            await AsyncStorage.setItem('onboarding', JSON.stringify({ finished: true }))
        })()
    }, [])
    const screenOptions = {
        // tabBarPressColor: '#000',
        tabBarScrollEnabled: true,
        tabBarStyle: {
            backgroundColor: 'powderblue',
            borderRadius: 10,
        },
        tabBarItemStyle: {
            width: 100,
            padding: 3,
        },
        tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
        },
    }
    return (
        <>
            <View style={styles.container}>
                {/* <View style={{ backgroundColor: "#fff" }}>
                                                  <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                                        </View> */}
                {/* <View style={styles.tabIndicator} /> */}
                <View style={styles.cardHeader}>
                    <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <View style={styles.menuOpenerLine} />
                        <View style={[styles.menuOpenerLine, { width: 15 }]} />
                        <View style={[styles.menuOpenerLine, { width: 25 }]} />
                    </TouchableOpacity>
                    <EcommerceBadge />
                </View>
                <Text style={styles.titlePrincipal}>Souhaits</Text>
                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 10 }}>
                    <View style={styles.searchSection}>
                        <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                        <TextInput
                            style={styles.input}
                            placeholder="Recherche..."
                        />
                    </View>
                    <View style={styles.cardRecherche}>
                        <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                    </View>
                </View>
                <TopBar.Navigator

                    screenOptions={{
                        tabBarStyle: styles.tabBar,
                        tabBarLabelStyle: {
                            color: COLORS.ecommercePrimaryColor,
                            textTransform: 'none',
                            fontSize: 10
                        },
                        tabBarIndicatorStyle: {
                            height: 3,
                            backgroundColor: COLORS.ecommercePrimaryColor,
                        },
                        options:{
                            fontSize:10
                        }
                    }}
                >
                    <TopBar.Screen name='EcommerceWishlistScreen' component={EcommerceWishlistScreen} options={{ title: "Shops" }} />
                    <TopBar.Screen name='RestaurantWishlistScreen' component={RestaurantWishlistScreen} options={{ title: "Restaurant" }} />
                    <TopBar.Screen name='EvenementWishlistScreen' component={EvenementWishlistScreen} options={{ title: "Evenement" }} />

                </TopBar.Navigator>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },
    searchSection: {
        flexDirection: "row",
        marginTop: 10,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundColor: "#D7D9E4",
        width: "84%",
        height: 50,
        paddingHorizontal: 10
    },
    cardOrginal: {
    },
    titlePrincipal: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10
    },
    menuOpener: {
    },
    menuOpenerLine: {
        height: 3,
        width: 30,
        backgroundColor: COLORS.ecommercePrimaryColor,
        marginTop: 5,
        borderRadius: 10
    },
    container: {
        flex: 1,
    },
    image: {
        marginTop: 30,
        alignSelf: "center",
    },
    tabBar: {
        overflow: 'hidden',
        elevation: 0,
        marginHorizontal: 10,
    },
    // tabBar: {
    //     backgroundColor: COLORS.ecommercePrimaryColor,
    //     height: 50,
    //     maxHeight: 50,
    //     borderRadius: 50,
    //     paddingHorizontal: 0,
    //     paddingVertical: 0,
    //     paddingRight: 10,
    //     marginTop: 2,
    //     elevation: 10,
    //     shadowColor: '#c4c4c4',
    //     overflow: 'hidden',
    //     marginHorizontal: 10
    // },
    tabIndicator: {
        width: "90%",
        height: 5,
        backgroundColor: '#C0DDDD',
        position: 'absolute',
        top: 143,
        marginHorizontal: 20
    },
    input: {
        flex: 1,
        marginLeft: 10
    },
    cardRecherche: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: COLORS.ecommerceRed,
        marginTop: 8,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
})