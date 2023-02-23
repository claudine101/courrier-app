import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, TouchableNativeFeedback } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import RestaurantHome from "../../components/restaurants/main/RestaurantHome";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import Restaurant from "../../components/restaurants/main/Restaurant";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES"
import { RestaurantSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import useFetch from "../../hooks/useFetch";

export default function RestaurantProcheScreen() {
        const [loadingResto, restaurants] = useFetch(`/partenaires/partenaire_service?ID_SERVICE_CATEGORIE=${IDS_SERVICE_CATEGORIES.resto}`)
          const navigation = useNavigation()
          const route = useRoute()
        //   const { restaurants } = route.params
          return (
                    <View style={styles.container}>
                              <View style={styles.cardHeader}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                  <TouchableNativeFeedback
                                                            style={{}}
                                                            onPress={() => navigation.goBack()}
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                            <View style={{ padding: 10 }}>
                                                                      <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                  <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                            <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                  </TouchableOpacity>
                                                  <EcommerceBadge />
                                        </View>
                              </View>


                              <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[1]}>
                                        <Text style={styles.titlePrincipal}></Text>
                                        <View>
                                                  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 10 }}>
                                                  </View>
                                        </View>
                                        { loadingResto ? <RestaurantSkeletons/> :
                                        <View style={styles.resto}>
                                                  {restaurants.result.map((restaurant, index) => {
                                                            return (
                                                                      <Restaurant
                                                                                restaurant={restaurant}
                                                                                index={index}
                                                                                totalLength={restaurants.length}
                                                                                key={index}
                                                                      // lat={lat} 
                                                                      // long={long} 
                                                                      />
                                                            )
                                                  })}

                                        </View>}

                              </ScrollView>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          resto: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingHorizontal: 10,
                    justifyContent: "space-around"
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60
          },
          searchSection1: {
                    flexDirection: "row",
                    marginTop: -20,
                    marginBottom: 10,
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    alignItems: 'center',
                    backgroundColor: "white",
                    width: "95%",
                    height: 50,
                    marginHorizontal: 10,
                    paddingHorizontal: 10

          },
          input: {
                    flex: 1,
                    marginLeft: 10
          },
          titlePrincipal: {
                    fontSize: 0,
                    fontWeight: "bold",
                    marginBottom: 0,
                    color: COLORS.ecommercePrimaryColor,
                    marginHorizontal: 10
          },
})