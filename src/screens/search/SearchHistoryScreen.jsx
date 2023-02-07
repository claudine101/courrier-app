import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TextInput, TouchableNativeFeedback, StatusBar, Keyboard, Text } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/COLORS';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SearchHistoryScreen() {
          const route = useRoute()
          const { search: defaultSerach } = route.params
          const [search, setSearch] = useState(defaultSerach ? defaultSerach : "")
          const navigation = useNavigation()
          const { service } = route.params
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
                                        <View style={styles.searchSection}>
                                                  <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                                  <TextInput
                                                            style={styles.input}
                                                            placeholder="Recherche..."
                                                            value={search}
                                                            onChangeText={(ex) => setSearch(ex)}
                                                            onSubmitEditing={() => {
                                                                      navigation.goBack()
                                                                      Keyboard.dismiss()
                                                                      navigation.navigate("SearchResultTabsScreen", { search: search, service: service })
                                                            }}
                                                            blurOnSubmit={false}
                                                            returnKeyType="search"
                                                            autoFocus
                                                  />
                                        </View>
                              </View>
                    </View>
          )

}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          searchHeader: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: StatusBar.currentHeight + 10,
                    paddingHorizontal: 10
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
                    alignItems: "center",
                    marginTop: 20
          },

})





