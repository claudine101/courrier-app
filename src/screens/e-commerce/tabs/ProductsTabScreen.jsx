import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from 'react'
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { Tabs } from 'react-native-collapsible-tab-view'
import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import fetchApi from "../../../helpers/fetchApi";
import Product from "../../../components/ecommerce/main/Product";

export default function ProductsTabScreen({ shop }) {
          const [products, setProducts] = useState([])
          const [loading, setLoading] = useState(true)
          const navigation = useNavigation()


          const renderProducts = ({ item: product, index }) => {
                    return (
                              <Product
                                        product={product}
                                        index={index}
                                        totalLength={products.length}
                                        key={index}
                                        fixMargins
                              // IsLoadingMore={IsLoadingMore}
                              />
                    )
          }

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        var url = `/products?partenaireService=${shop.ID_PARTENAIRE_SERVICE}`
                                        const produits = await fetchApi(url)
                                        setProducts(produits.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, []))

          return (
                    <>
                              {loading ? <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={styles.container}>
                                                  <View style={styles.loadingContainer}>
                                                            <ActivityIndicator size={"large"} color='#777' />
                                                  </View>
                                        </View>
                              </Tabs.ScrollView> :
                                        products.length == 0 ?
                                                  <Tabs.ScrollView>
                                                            <View style={styles.container}>
                                                                      <View style={styles.emptyContainer}>
                                                                                <Image source={require('../../../../assets/images/mobile-shopping.png')} style={styles.emptyImage} />
                                                                                <Text style={styles.emptyFeedbackTitle}>
                                                                                          Aucun menu publié
                                                                                </Text>
                                                                                <Text style={styles.emptyFeedbackDesc}>
                                                                                          Commencer à publier un menu pour attirer vos clients
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                  </Tabs.ScrollView> :
                                                  <Tabs.FlatList
                                                            data={products}
                                                            renderItem={renderProducts}
                                                            contentContainerStyle={styles.products}
                                                  />
                              }
                    </>

          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
          },
          emptyContainer: {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30
          },
          emptyFeedbackTitle: {
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: 'center',
                    marginVertical: 10
          },
          emptyFeedbackDesc: {
                    color: '#777',
                    textAlign: "center",
                    paddingHorizontal: 30,
                    fontSize: 12
          },
          products: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap'
          }
})