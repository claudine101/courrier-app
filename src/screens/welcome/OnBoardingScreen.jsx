import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, Text, FlatList, Modal, useWindowDimensions, TouchableWithoutFeedback, BackHandler } from 'react-native'
import { BlurView } from 'expo-blur'
import { AntDesign } from '@expo/vector-icons';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const PAGINATION_WIDTH  = 80
export default function OnBoardingScreen() {
          const IMAGES = [{
                    uri: require('../../../assets/images/family.jpg'),
                    description: "e-commerce avec paiement digital sécurisé"
          }, {
                    uri: require('../../../assets/images/delivery.jpg'),
                    description: "Service de livrasion intégré"
          }]
          const [selectedIndex, setSelectedIndex] = useState(0)
          const { width, height } = useWindowDimensions()

          const navigation = useNavigation()
          const backHandler = useRef(null)

          const imageTranslateX = useSharedValue(0)
          const translateImageStyles = useAnimatedStyle(() => ({
                    transform: [{ translateX: imageTranslateX.value }]
          }))

          const textTranslateX = useSharedValue(0)
          const translateXTextStyles = useAnimatedStyle(() => ({
                    transform: [{ translateX: textTranslateX.value }]
          }))

          const dotTranslateX = useSharedValue(0)
          const animatedDotStyles = useAnimatedStyle(() => ({
                    transform: [{ translateX: dotTranslateX.value }]
          }))

          const rotateY = useSharedValue(0)
          const rotateYStyles = useAnimatedStyle(() => ({
                    transform: [{ rotateY: `${rotateY.value}deg` }]
          }))
          const SPRING_CONFIG = {
                    damping: 80,
                    overshootClamping: true,
                    restDisplacementThreshold: 0.1,
                    restSpeedThreshold: 0.1,
                    stiffness: 300
          }
          const changeImageIndex = (increment) => {
                    if (increment > 0) {
                              setSelectedIndex(lastIndex => lastIndex < IMAGES.length - 1 ? + 1 : IMAGES.length - 1)
                              imageTranslateX.value = withSpring(-width * IMAGES.length, SPRING_CONFIG)
                              textTranslateX.value = withDelay(10, withSpring(-width * IMAGES.length, SPRING_CONFIG))
                              if(selectedIndex == IMAGES.length-1) {
                                        navigation.navigate("LoginScreen")
                              }
                    } else {
                              setSelectedIndex(lastIndex => lastIndex > 0 ? lastIndex - 1 : 0)
                              imageTranslateX.value = withSpring(0, SPRING_CONFIG)
                              textTranslateX.value = withDelay(10, withSpring(0, SPRING_CONFIG))
                    }
          }
          useEffect(() => {
                    dotTranslateX.value = withSpring((selectedIndex * 80) / IMAGES.length)
          }, [selectedIndex])
          const gestureHandler = useAnimatedGestureHandler({
                    onStart(_, context) {
                              context.startTranslateX = imageTranslateX.value
                    },
                    onActive(event, context) {
                              imageTranslateX.value = withSpring(event.translationX + context.startTranslateX, SPRING_CONFIG)
                              // textTranslateX.value = withDelay(10, withSpring(event.translationX + context.startTranslateX))
                    },
                    onEnd(event) {
                              "worklet"
                              if (event.translationX > 0) {
                                        runOnJS(changeImageIndex)(-1)
                              } else {
                                        runOnJS(changeImageIndex)(1)
                              }
                    }
          })

          const onNextPress = () => {
                    if (selectedIndex == 0) {
                              setSelectedIndex(lastIndex => lastIndex < IMAGES.length - 1 ? + 1 : IMAGES.length - 1)
                              imageTranslateX.value = withSpring(-width * IMAGES.length, SPRING_CONFIG)
                              textTranslateX.value = withDelay(10, withSpring(-width * IMAGES.length, SPRING_CONFIG))
                    } else {
                              navigation.navigate("LoginScreen")
                    }
          }
          const onBackPress = () => {
                    if (selectedIndex > 0) {
                              setSelectedIndex(lastIndex => lastIndex > 0 ? lastIndex - 1 : 0)
                              imageTranslateX.value = withSpring(0, SPRING_CONFIG)
                              textTranslateX.value = withDelay(10, withSpring(0, SPRING_CONFIG))
                    } else {
                    }
          }
          return (
                    <View style={styles.container}>
                              <Animated.View style={[styles.images, translateImageStyles, { width: width * IMAGES.length }]}>
                                        {IMAGES.map((image, index) => {
                                                  return (
                                                            <View style={[styles.imageContainer, { width: width * IMAGES.length, height }]} key={index.toString()}>
                                                                      <Image source={image.uri} style={[styles.image]} blurRadius={1.5} />
                                                            </View>
                                                  )
                                        })}
                              </Animated.View>
                              <View style={styles.sections}>
                                        <View style={[styles.section, { opacity: 0.9 }]} />
                                        <View style={[styles.section, { opacity: 0.6 }]} />
                              </View>
                              <Modal transparent onRequestClose={onBackPress}>
                                        <GestureHandlerRootView style={{ flex: 1 }}>
                                                  <PanGestureHandler onGestureEvent={gestureHandler}>
                                                            <Animated.View style={styles.content}>
                                                                      <View style={styles.logo}>
                                                                                <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.logoImage} />
                                                                      </View>
                                                                      <View style={styles.centerSection}>
                                                                                <View style={[styles.descriptions, { width: width * IMAGES.length }]}>
                                                                                          {IMAGES.map((image, index) => {
                                                                                                    return (
                                                                                                              <Animated.View style={[styles.description, translateXTextStyles, { width: width * IMAGES.length }]} key={index.toString()}>
                                                                                                                        <View style={{ width }}>
                                                                                                                                  <Text style={styles.title}>
                                                                                                                                            {image.description}
                                                                                                                                  </Text>
                                                                                                                        </View>
                                                                                                              </Animated.View>
                                                                                                    )
                                                                                          })}
                                                                                </View>
                                                                                <TouchableWithoutFeedback onPress={onNextPress}>
                                                                                          <View style={[styles.nextBtn]}>
                                                                                                    <AntDesign name="arrowright" size={24} color="#fff" />
                                                                                          </View>
                                                                                </TouchableWithoutFeedback>
                                                                      </View>
                                                                      <View style={styles.bottomSection}>
                                                                                <Text style={styles.developCompany}>Conçu par Mediabox Burundi</Text>
                                                                                <View style={styles.pagination}>
                                                                                          <Animated.View style={[styles.pageDot, animatedDotStyles, { width: PAGINATION_WIDTH / IMAGES.length }]} />
                                                                                </View>
                                                                      </View>
                                                            </Animated.View>
                                                  </PanGestureHandler>
                                        </GestureHandlerRootView>
                              </Modal>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          images: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute'
          },
          imageContainer: {
                    overFlow: "hidden"
          },
          image: {
                    resizeMode: "cover",
                    width: '100%',
                    height: "100%"
          },
          sections: {
                    flexDirection: 'row',
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
          },
          section: {
                    flex: 1,
                    backgroundColor: '#6f6e81'
          },
          content: {
                    position: 'absolute',
                    width: '100%',
                    height: "100%",
                    justifyContent: 'space-between',
                    paddingVertical: 50,
                    paddingHorizontal: 40
          },
          logo: {
          },
          logoImage: {
                    width: 150,
                    height: 90,
                    resizeMode: 'contain',
                    marginLeft: -10
          },
          title: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 30
          },
          descriptions: {
                    flexDirection: 'row',
          },
          description: {
          },
          nextBtn: {
                    width: 60,
                    height: 60,
                    backgroundColor: '#458d8d',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25,
                    elevation: 1,
                    shadowColor: '#000'
          },
          developCompany: {
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 'bold'
          },
          pagination: {
                    width: PAGINATION_WIDTH,
                    height: 5,
                    backgroundColor: '#8E8E8E',
                    borderRadius: 10,
                    marginTop: 10
          },
          pageDot: {
                    height: "100%",
                    backgroundColor: '#fff',
                    borderRadius: 10
          }
})