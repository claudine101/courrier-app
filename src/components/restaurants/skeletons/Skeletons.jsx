import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { COLORS } from "../../../styles/COLORS";

export const CategoriesSkeletons = () => {
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
export const shopsSkeletons = () => {
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

export const HomeProductsSkeletons = ({ wrap = false }) => {
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
                    <View style={{...styles.title, height: 15, width: '25%', backgroundColor: '#d9ddde', marginLeft: 10, marginTop: 20, borderRadius: 5, marginBottom: 10}} />
                    <View style={[{ flexDirection: "row", alignItems: "center"}, wrap && { flexWrap: "wrap" }]}>
                              {(new Array(10).fill(0)).map((category, index) => {
                                        return (
                                                  <View key={index.toString()} style={[styles.product,additionStyles, wrap && { marginTop: 10 }]}>
                                                            <View style={{...styles.actionIcon, backgroundColor: '#d9ddde'}}>
                                                            </View>
                                                            <View style={{...styles.actionTitle, width: 50, height: 10, borderRadius: 10,backgroundColor: '#d9ddde'}} />
                                                  </View>
                                        )}
                              )}
                    </View>
                    </>
          )
}

const styles = StyleSheet.create({
          product: {
                    maxWidth: 200,
                    backgroundColor: COLORS.skeleton,
                    borderRadius: 8
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
          categoryPhoto: {
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    backgroundColor: COLORS.skeleton
          },
          categoryText: {
                    borderRadius: 5,
                    width: 30,
                    height: 5,
                    backgroundColor: COLORS.skeleton,
                    marginTop: 5
          }
})