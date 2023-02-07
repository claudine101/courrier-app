import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react'
import { Text, View, useWindowDimensions, StatusBar, StyleSheet, TouchableOpacity, TouchableNativeFeedback, TextInput } from "react-native";
import { COLORS } from '../../styles/COLORS';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import SearchTopTabsScreen from './SearchTopTabsScreen';

export default function SearchResultTabsScreen() {
          const navigation = useNavigation()
          const route = useRoute()
          const { search } = route.params
          return (
                    <View style={styles.container}>
                              <View style={styles.searchHeader}>
                                        <TouchableNativeFeedback
                                                  style={{}}
                                                  onPress={() => navigation.goBack()}
                                                  background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                  <View style={{ padding: 10 }}>
                                                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground onPress={() => {
                                                  navigation.goBack()
                                                  navigation.navigate("SearchHistoryScreen", {service:1, search})
                                        }}>
                                                  <View  style={styles.searchSection} >
                                                            <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            <Text style={styles.input}>{ search }</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                              <SearchTopTabsScreen search={search} />
                    </View>
          )
}
const styles = StyleSheet.create({
          searchHeader: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: StatusBar.currentHeight + 10,
                    paddingHorizontal: 10
          },
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
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    backgroundColor: "#D7D9E4",
                    flex: 1,
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
                    marginHorizontal: 20,
          },
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