import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, useWindowDimensions, View, Image, Text } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const IMAGES = [{
          uri: require('../../../assets/images/family.jpg'),
}, {
          uri: require('../../../assets/images/delivery.jpg')
}, {
          uri: require('../../../assets/images/delivery.jpg')
}]
const PAGINATION_WIDTH  = 80
export default function Carousel() {
          const { width } = useWindowDimensions()

          const dotTranslateX = useSharedValue(0)
          const animatedDotStyles = useAnimatedStyle(() => ({
                    transform: [{ translateX: dotTranslateX.value }]
          }))
          const [activendex, setActiveIndex] = useState(0)
          useEffect(() => {
                    dotTranslateX.value = withSpring((activendex * 80) / IMAGES.length)
          }, [activendex])
          return (
                    <View style={styles.carouselCotnainer}>
                              <FlatList
                                        data={IMAGES}
                                        horizontal
                                        pagingEnabled
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item, index }) => {
                                                  return (
                                                            <View style={[styles.viewBox, { width: width }]}>
                                                                      <Image source={item.uri} style={styles.carouselImage} />
                                                            </View>
                                                  )
                                        }}
                                        style={styles.carousel}
                                        onScroll={(e) => setActiveIndex(parseInt(e.nativeEvent.contentOffset.x / (width - 40)))}
                              />
                              <View style={styles.pagination}>
                                        <Animated.View style={[styles.pageDot, animatedDotStyles, { width: PAGINATION_WIDTH / IMAGES.length }]} />
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          carousel: {
                    width: "100%"
          },
          carouselCotnainer: {

          },
          pagination: {
                    width: PAGINATION_WIDTH,
                    height: 5,
                    backgroundColor: '#ddd',
                    borderRadius: 10,
                    marginTop: 5,
                    alignSelf: 'center'
          },
          pageDot: {
                    height: "100%",
                    backgroundColor: '#8E8E8E',
                    borderRadius: 10,
          },

          viewBox: {
                    padding: 10,
                    height: 150,
                    maxWidth: 500,
                    paddingHorizontal: 20
          },
          slider: {
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'pink'
          },
          carouselImage: {
                    borderRadius: 10,
                    height: '100%',
                    width: '100%',
                    resizeMode: "contain"
          },
})