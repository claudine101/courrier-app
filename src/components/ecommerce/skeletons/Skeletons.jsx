import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { COLORS } from "../../../styles/COLORS";

export const CategoriesSkeletons = () => {
          return (
                    <>
                    <View style={{ ...styles.title, height: 15, width: '25%', backgroundColor: '#d9ddde', marginLeft: 10, marginTop: 20, borderRadius: 5, marginBottom: 10 }} />
                    <View style={styles.categories}>
                              {new Array(50).fill(0).map((_, index) => {
                                        return (
                                                  <View style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                                            <View style={styles.categoryPhoto} />
                                                            <View style={styles.categoryText} />
                                                  </View>
                                        )
                              })}
                    </View>
                    </>
          )
}
export const CategoriesMenuSkeletons = () => {
          return (
                    <View style={styles.categories}>
                              {new Array(50).fill(0).map((_, index) => {
                                        return (
                                                  <View style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                                            <View style={styles.categoryPhoto} />
                                                            <View style={styles.categoryText} />
                                                  </View>
                                        )
                              })}
                    </View>
          )
}
export const SubCategoriesSkeletons = () => {
          return (
                    <View style={[styles.categories, { paddingVertical: 25 }]}>
                              {new Array(50).fill(0).map((_, index) => {
                                        return (
                                                  <View style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                                            <View style={[styles.categoryText, { height: 20, width: 60 }]} />
                                                  </View>
                                        )
                              })}
                    </View>
          )
}
export const ShopsSkeletons = () => {
          return (
                    <View style={[styles.categories, { paddingVertical: 1000 }]}>
                              {new Array(50).fill(0).map((_, index) => {
                                        return (
                                                  <View style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                                            <View style={[styles.categoryText, { height: 20, width: 60 }]} />
                                                  </View>
                                        )
                              })}
                    </View>
          )
}
export const estaurantSkeletons = () => {
          return (
                    <View style={[styles.resto,]}>
                              {new Array(50).fill(0).map((_, index) => {
                                        return (<>
                                                  <View style={[styles.restau, index == 0 && { marginLeft: 0 }]} key={index}>
                                                  </View>
                                                  <View style={[styles.categoryText, { height: 80, width: 100, borderRadius: 10 }]} />
                                        </>
                                        )
                              })}
                    </View>
          )
}
export const RestaurantSkeletons = () => {
          return (
                    <View style={styles.resto}>
                              {new Array(50).fill(0).map((_, index) => {
                                        return (
                                                  <View style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                                            <View style={styles.categoryPhotoResto} />
                                                            <View style={styles.categoryTextResto} />
                                                  </View>
                                        )
                              })}
                    </View>
          )
}
export const HomeProductsSkeletons = ({ wrap = false, noTitle = false }) => {
          const { width } = useWindowDimensions()
          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
          const PRODUCT_HEIGHT = 200
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    height: PRODUCT_HEIGHT,
                    marginLeft: PRODUCT_MARGIN,
                    marginRight: PRODUCT_MARGIN
          }
          return (
                    <>
                              {!noTitle && <View style={{ ...styles.title, height: 15, width: '25%', backgroundColor: '#d9ddde', marginLeft: 10, marginTop: 20, borderRadius: 5, marginBottom: 10 }} />}
                              <View style={[{ flexDirection: "row", alignItems: "center" }, wrap && { flexWrap: "wrap" }]}>
                                        {(new Array(10).fill(0)).map((category, index) => {
                                                  return (
                                                            <View key={index.toString()} style={[styles.product, additionStyles, wrap && { marginTop: 10 }]}>
                                                                      <View style={{ ...styles.actionIcon, backgroundColor: '#d9ddde' }}>
                                                                      </View>
                                                                      <View style={{ ...styles.actionTitle, width: 50, height: 10, borderRadius: 10, backgroundColor: '#d9ddde' }} />
                                                            </View>
                                                  )
                                        }
                                        )}
                              </View>
                    </>
          )
}
export const HomeMenuSkeletons = ({ wrap = false }) => {
          const { width } = useWindowDimensions()
          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
          const PRODUCT_HEIGHT = 270
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    height: PRODUCT_HEIGHT,
                    marginLeft: PRODUCT_MARGIN,
                    marginRight: PRODUCT_MARGIN
          }
          return (
                    <>
                              <View style={[{ marginTop: 15, marginBottom: 30, flexDirection: "row", alignItems: "center" }, wrap && { flexWrap: "wrap" }]}>
                                        {(new Array(10).fill(0)).map((category, index) => {
                                                  return (
                                                            <View style={[styles.menu, additionStyles,]}>
                                                            </View>
                                                  )
                                        }
                                        )}
                              </View>
                              <View style={{ marginBottom: -20, marginTop: -40, flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ ...styles.iconMenu, height: 30, width: '30%', backgroundColor: '#d9ddde', marginLeft: 10, marginTop: 20, borderRadius: 10, marginBottom: 10 }} />
                                        <View style={{ ...styles.iconMenu, height: 30, width: '25%', backgroundColor: '#d9ddde', marginLeft: 10, marginTop: 20, borderRadius: 10, marginBottom: 10 }} />

                              </View>
                              <View style={{ ...styles.prix, height: 15, width: '25%', backgroundColor: '#d9ddde', marginLeft: 10, marginTop: 20, borderRadius: 5, marginBottom: 10 }} />

                    </>
          )
}

const styles = StyleSheet.create({
          product: {
                    maxWidth: 200,
                    backgroundColor: COLORS.skeleton,
                    borderRadius: 8
          },
          menu: {
                    maxWidth: 300,
                    maxHeight: 150,
                    backgroundColor: COLORS.skeleton,
                    borderRadius: 10,
                    Top: -49
          },
          prix: {
                    maxWidth: 90,
                    maxHeight: 50,
                    Top: -200

          },
          iconMenu: {
                    maxWidth: 40,
                    maxHeight: 100,

          },
          categories: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    paddingBottom: 5
          },
          category: {
                    alignItems: 'center',
                    borderRadius: 10,
                    marginLeft: 20
          },
          restau: {
                    alignItems: 'center',
                    borderRadius: 10,
                    marginLeft: 20,
                    backgroundColor: COLORS.skeleton,

          },
          resto: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    paddingBottom: 5
          },
          categoryPhoto: {
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    backgroundColor: COLORS.skeleton
          },
          categoryPhotoResto: {
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    backgroundColor: COLORS.skeleton
          },
          categoryText: {
                    borderRadius: 5,
                    width: 40,
                    height: 6,
                    backgroundColor: COLORS.skeleton,
                    marginTop: 5
          },
          categoryTextResto: {
                    borderRadius: 5,
                    width: 100,
                    height: 10,
                    backgroundColor: COLORS.skeleton,
                    marginTop: 5
          }
})