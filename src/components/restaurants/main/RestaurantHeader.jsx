import { useNavigation } from "@react-navigation/native"
import React from "react"
import { StatusBar, StyleSheet, TouchableNativeFeedback, View } from "react-native"
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { COLORS } from "../../../styles/COLORS";
import RestaurantBadge from "./RestaurantBadge";

export default function RestaurantHeader()  {
          const navigation = useNavigation()
          return (
                    <View style={styles.cardHeader}>
                              <TouchableNativeFeedback
                                        style={{}}
                                        onPress={() => navigation.goBack()}
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                        <View style={styles.headerBtn}>
                                                  <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableNativeFeedback
                                                  onPress={() => navigation.navigate("SearchHistoryScreen", {service:1})}
                                                  style={{}}
                                                  background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                  <View style={styles.headerBtn}>
                                                            <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <RestaurantBadge />
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
                    backgroundColor: '#FFF',
          },
          headerBtn: {
                    padding: 10
          }
})