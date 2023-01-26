import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image, ActivityIndicator, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import fetchApi from "../../helpers/fetchApi";
import { Modalize } from "react-native-modalize";
import Product from "../../components/ecommerce/main/Product";

/**
 * Screen pour afficher tous les categories
 * @author Vanny Boy <vanny@mediabox.bi>
 * @returns 
 */

export default function CategorieListeScreen() {
          const navigation = useNavigation()
          const route = useRoute()

          const [categories, setCategories] = useState([])
          const [loadingCategories, setLoadingCategories] = useState(true)

          useEffect(() => {
                    (async () => {
                              try {
                                        const reponse = await fetchApi("/products/categories", {
                                                  method: "GET",
                                                  headers: { "Content-Type": "application/json" },
                                        })
                                        setCategories(reponse.result)
                              }
                              catch (error) {
                                        console.log(error)
                              }
                              finally {
                                        setLoadingCategories(false)
                              }
                    })()
          }, [])




          return (
                    <>
                              <View style={styles.container}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableNativeFeedback
                                                            style={{}}
                                                            onPress={() => navigation.goBack()}
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                            <View style={{ padding: 10 }}>
                                                                      <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </TouchableOpacity>
                                                            <EcommerceBadge />
                                                  </View>
                                        </View>
                                        <ScrollView>
                                                  {loadingCategories ? <View style={{ flex: 1, justifyContent: 'center' }}>
                                                            <ActivityIndicator animating={true} size="large" color={"black"} />
                                                  </View> :
                                                  <View style={styles.categories}>
                                                            {categories.map((category, index) => {
                                                                      return (
                                                                                <TouchableWithoutFeedback 
                                                                                          onPress={() => navigation.navigate('AllProductsScreen', {
                                                                                                    category
                                                                                          })} key={index}>
                                                                                          <View style={[styles.category]}>
                                                                                                    <View style={styles.categoryPhoto}>
                                                                                                              <Image source={{ uri: category.IMAGE }} style={styles.image} />
                                                                                                    </View>
                                                                                                    <Text style={styles.categoryName}>{category.NOM}</Text>
                                                                                          </View>
                                                                                </TouchableWithoutFeedback>
                                                                      )
                                                            })}
                                                  </View>}
                                        </ScrollView>


                              </View>

                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
                    backgroundColor: '#fff',
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
          catego: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
          },
          categoryModel: {
                    alignItems: 'center',
                    borderRadius: 10,
                    marginLeft: 20,
                    // elevation: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
          },
          category: {
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginTop: 10
          },
          categoryPhoto: {
                    width: 80,
                    height: 80,
                    borderRadius: 8,
          },
          image: {
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
          },
          categoryName: {
                    marginTop: 2
          },
          categories: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around'
          }
})