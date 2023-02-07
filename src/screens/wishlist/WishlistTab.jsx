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
                                        <View style={styles.cardHeader}>
                                                  <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                                            <View style={styles.menuOpenerLine} />
                                                            <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                            <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                                  </TouchableOpacity>
                                                  <EcommerceBadge />
                                        </View>
                                        <Text style={styles.titlePrincipal}>Liste de souhaits</Text>
                                        <TopBar.Navigator
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
                                                                      textTransform: 'none'
                                                            }
                                                  }}
                                        >
                                                  <TopBar.Screen name='EcommerceWishlistScreen' component={EcommerceWishlistScreen} options={{ title: "Produits" }} />
                                                  <TopBar.Screen name='RestaurantWishlistScreen' component={RestaurantWishlistScreen} options={{ title: "Menus" }} />
                                                  <TopBar.Screen name='EvenementWishlistScreen' component={EvenementWishlistScreen} options={{ title: "Boutiques" }} />

                                        </TopBar.Navigator>
                              </View>
                    </>
          )
}

const styles = StyleSheet.create({
          tabBar: {
                    backgroundColor: '#fff',
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    elevation: 0,
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60
          },
          titlePrincipal: {
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 12,
                    color: COLORS.ecommercePrimaryColor,
                    marginHorizontal: 10
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
})