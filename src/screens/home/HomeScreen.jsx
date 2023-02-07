import React, { useCallback, useState } from "react";
import {
          Text, StyleSheet, View, ScrollView, ImageBackground, Dimensions,
          Image,
          FlatList,
          useWindowDimensions,
          TouchableOpacity,
          TouchableNativeFeedback
} from "react-native";
import { Feather, FontAwesome, EvilIcons, AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import Carousel from "../../components/app/Carousel";
import ServicesCategories from "../../components/app/ServicesCategories";
import { COLORS } from "../../styles/COLORS";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import AppHeader from "../../components/app/AppHeader";

export default function HomeScreen() {
          const navigation = useNavigation()
          return (
                    <>
                    <View style={styles.imgBackground}>
                              <AppHeader />
                              <Carousel />
                              <ServicesCategories />
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
                    height: 88
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
          }
})