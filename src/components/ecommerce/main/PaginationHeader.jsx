import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { StatusBar, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export default function PaginationHeader() {
          const { width } = useWindowDimensions()
          const INDICATOR_MARGIN = 10
          const PAGINATION_WIDTH = width - 20 - (INDICATOR_MARGIN * 3)
          const INDICATOR_WIDTH = (PAGINATION_WIDTH / 3) - INDICATOR_MARGIN

          const translateX = useSharedValue(0)
          const animatedStyles = useAnimatedStyle(() => ({
                    transform: [{ translateX: translateX.value }]
          }))

          const route = useRoute()
          const navigation = useNavigation()
          const ROUTES = ["ShippingInfoScreen", "PaymentScreen"]

          useFocusEffect(useCallback(() => {
                    const index = ROUTES.indexOf(route.name)
                    if(index > 0) {
                              translateX.value = withTiming(index * INDICATOR_WIDTH + (INDICATOR_MARGIN+5), { duration: 300 })
                    }
          }, [route.name]))
          useEffect(() => {
                    const unsubscribe = navigation.addListener('beforeRemove', () => {
                              translateX.value = withDelay(100, withTiming(0, { duration: 300 }))
                    })
                    return unsubscribe
          }, [])
          return (
                    <View style={styles.container}>
                              <View style={[styles.pagination, { width: PAGINATION_WIDTH }]}>
                                        <Animated.View style={[styles.pageIndicator, { width: INDICATOR_WIDTH }, styles.selectedIndicator, animatedStyles]} />
                                        {new Array(3).fill(0).map((_, index) => {
                                                  return (
                                                            <View style={[styles.pageIndicator, { width: INDICATOR_WIDTH }]} key={index} />
                                                  )
                                        })}
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    backgroundColor: '#FFF',
                    width: "100%",
          },
          pagination: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: 'center',
                    position: 'relative',
                    marginTop: StatusBar.currentHeight,
                    backgroundColor: '#fff'
          },
          pageIndicator: {
                    height: 4,
                    backgroundColor: '#ddd',
                    marginVertical: 10,
                    borderRadius: 8
          },
          selectedIndicator: {
                    position: 'absolute',
                    backgroundColor: '#000',
                    left: 0,
                    zIndex: 1
          },
})