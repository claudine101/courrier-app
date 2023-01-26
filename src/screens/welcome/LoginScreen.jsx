import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useRef, useState, useEffect } from 'react'
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image } from "react-native";
import { COLORS } from '../../styles/COLORS';
import ConnexionScreen from './ConnexionScreen';
import InscriptionScreen from './InscriptionScreen';

const TopBar = createMaterialTopTabNavigator()

export default function LoginScreen() {
          const { height } = useWindowDimensions()

          useEffect(() => {
                    (async () => {
                              await AsyncStorage.setItem('onboarding', JSON.stringify({ finished: true }))
                    })()
          }, [])
          return (
                    <>
                              <View style={styles.container}>
                                        <View style={{ backgroundColor: "#fff" }}>
                                                  <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                                        </View>
                                        <View style={styles.tabIndicator} />
                                        <TopBar.Navigator
                                                  screenOptions={{
                                                            tabBarStyle: styles.tabBar,
                                                            tabBarLabelStyle: {
                                                                      color: '#777',
                                                                      textTransform: 'none',
                                                                      fontSize: 15
                                                            },
                                                            tabBarIndicatorStyle: {
                                                                      height: 3,
                                                                      backgroundColor: COLORS.primary,
                                                            }
                                                  }}
                                        >
                                                  <TopBar.Screen name='Inscription' component={InscriptionScreen} options={{ headerShown: false }} />
                                                  <TopBar.Screen name='Connexion' component={ConnexionScreen} options={{ headerShown: false }} />
                                        </TopBar.Navigator>
                              </View>
                    </>
          )
}

const styles = StyleSheet.create({
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
                    marginHorizontal: 20,
          },
          tabIndicator: {
                    width: "90%",
                    height: 5,
                    backgroundColor: '#C0DDDD',
                    position: 'absolute',
                    top: 143,
                    marginHorizontal: 20
          }
})