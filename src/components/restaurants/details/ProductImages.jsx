import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, runOnJS, withSpring } from 'react-native-reanimated'
import ImageView from "react-native-image-viewing";

export default function ProductImages({ images }) {
          const IMAGES = images.filter(img => img)
        //   console.log(images)
          const { width } = useWindowDimensions()
          const [activendex, setActiveIndex] = useState(0)

          const [imageIndex, setImageIndex] = useState(0)
          const [showImageModal, setShowImageModal] = useState(false)

          const PAGINATION_WIDTH = (IMAGES.length * 50) + IMAGES.length * 10

          const onPageChange = page => {
                    setActiveIndex(page)
          }

          const translationX = useSharedValue(0)
          const scrollHandler = useAnimatedScrollHandler((event) => {
                    'worklet';
                    const page = parseInt(event.contentOffset.x / (width - 40))
                    runOnJS(onPageChange)(page)
                    translationX.value = withSpring(((event.contentOffset.x * PAGINATION_WIDTH) / (width * IMAGES.length)))
          }, [width]);
          const translationStyles = useAnimatedStyle(() => ({
                    transform: [{ translateX: translationX.value }]
          }))
          const marginLeft = useCallback(() => ({
                    marginLeft: activendex > 0 ? (activendex == IMAGES.length - 1 ? 10 : 5 / activendex) : 0
          }), [activendex])
          return (
                    <View style={styles.container}>
                              <Animated.ScrollView
                                        style={styles.images}
                                        horizontal
                                        pagingEnabled
                                        showsHorizontalScrollIndicator={false}
                                        onScroll={scrollHandler}
                              // onScrollEndDrag={(e) => setActiveIndex(parseInt(e.nativeEvent.contentOffset.x / (width - 40)))}
                              >
                                        {IMAGES.map((image, index) => {
                                                  return (
                                                            <TouchableOpacity style={[styles.imageContainer, { width }]} key={index} onPress={() => {
                                                                      setImageIndex(index)
                                                                      setShowImageModal(true)
                                                            }}>
                                                                      <Image source={{ uri: image }} style={styles.productImage} />
                                                            </TouchableOpacity>
                                                  )
                                        })}
                              </Animated.ScrollView>
                              {IMAGES.length > 1 ? <View style={[styles.pagination, { width: PAGINATION_WIDTH }]}>
                                        <Animated.View style={[styles.paginationDot, styles.selectedDot, translationStyles, marginLeft()]} />
                                        {IMAGES.map((_, index) => {
                                                  return (
                                                            <View style={[styles.paginationDot]} key={index} />
                                                  )
                                        })}
                              </View> : null}
                              {showImageModal &&
                                        <ImageView
                                                  images={IMAGES.map(img => ({ uri: img }))}
                                                  imageIndex={imageIndex}
                                                  visible={showImageModal}
                                                  onRequestClose={() => setShowImageModal(false)}
                                                  swipeToCloseEnabled
                                                  keyExtractor={(_, index) => index.toString()}
                                        />
                              }
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    backgroundColor: '#F1F1F1',
                    // paddingBottom: 60,
                    height: 200
          },
          pagination: {
                    flexDirection: "row",
                    alignSelf: "center",
                    marginBottom: 10,
                    justifyContent: "space-between"
          },
          paginationDot: {
                    height: 3,
                    width: 50,
                    backgroundColor: '#ddd',
                    borderRadius: 10,
          },
          selectedDot: {
                    backgroundColor: '#000',
                    position: "absolute",
                    left: 0,
                    zIndex: 1
          },
          images: {
          },
          imageContainer: {
                    height: "100%",
          },
          productImage: {
                    width: '70%',
                    minHeight: 150,
                    maxHeight: 200,
                    alignSelf: 'center',
                    resizeMode: "center",
                    borderRadius: 10
          },
})