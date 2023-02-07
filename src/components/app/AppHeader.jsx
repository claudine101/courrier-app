import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableNativeFeedback, View } from "react-native";
import { StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";

export default function AppHeader() {
          const navigation = useNavigation()
          return (
                    <View style={styles.cardHeader}>
                              <TouchableNativeFeedback
                                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                        <View style={styles.menuOpener}>
                                                  <View style={styles.menuOpenerLine} />
                                                  <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                  <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.imageContainer}>
                                        <Image source={require('../../../assets/images/chapchap.png')} style={styles.logo} />
                              </View>
                              <TouchableNativeFeedback
                                        onPress={() => navigation.navigate("SearchHistoryScreen", {service:1})}
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                        <View style={{ marginTop: 25, padding: 10 }}>
                                                  <AntDesign name="search1" size={24} color={COLORS.primary}  />
                                        </View>
                              </TouchableNativeFeedback>
                    </View>
          )
}

const styles = StyleSheet.create({
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    height: 88,
          },
          menuOpener: {
                    marginTop: 25,
                    padding: 10
          },
          menuOpenerLine: {
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.primary,
                    marginTop: 5,
                    borderRadius: 10
          },
          imgBackground: {
                    flex: 1,
                    width: '100%',
                    height: "100%"
          },
          imageContainer: {
                    height: "100%",
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          logo: {
                    resizeMode: 'center',
                    height: "50%",
                    width: "50%",
                    marginTop: 25
          },
})