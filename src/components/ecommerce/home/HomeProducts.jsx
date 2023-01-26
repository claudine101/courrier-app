import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import Product from '../main/Product';
import { HomeProductsSkeletons } from '../skeletons/Skeletons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../../../styles/COLORS";

export default function HomeProducts({ products, category, shop, title = "Tous les produits" }) {
          const navigation = useNavigation()
          return (
                    <View style={styles.homeProducts}>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                                        onPress={() => navigation.navigate('AllProductsScreen', {
                                                  category, shop
                                        })}
                              >
                                        <View style={styles.productsHeader}>
                                                  <Text style={styles.title}>{ title }</Text>
                                                  <MaterialIcons name="navigate-next" size={24} color="black" />
                                        </View>
                              </TouchableNativeFeedback>
                              <ScrollView
                                        style={styles.products}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 10 }}
                              >
                                        {products.map((product, index) => {
                                                  return (
                                                            <Product
                                                                      product={product}
                                                                      index={index}
                                                                      totalLength={products.length}
                                                                      key={index}
                                                            />
                                                  )
                                        })}

                              </ScrollView>
                    </View>
          )
}

const styles = StyleSheet.create({
          homeProducts: {
          },
          productsHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10
          },
          plus1: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginBottom: "-1%"
          },
          plusText: {
                    color: COLORS.ecommercePrimaryColor,
                    fontSize: 14,
          },
          title: {
                    color: COLORS.ecommercePrimaryColor,
                    fontSize: 17,
                    fontWeight: "bold"
          },
          products: {
                    // paddingHorizontal: 10,
          }
})