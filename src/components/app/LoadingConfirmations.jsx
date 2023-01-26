import React, { useEffect } from 'react'
import { View, Text, StyleSheet, BackHandler } from 'react-native'
import { Portal } from 'react-native-portalize'
import LottieView from 'lottie-react-native';
import Animated, { withTiming } from 'react-native-reanimated';

export default function LoadingConfirmations() {
          useEffect(() => {
                    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
                              return true
                    })
                    return () => {
                              handler.remove()
                    }
          }, [])
          const entering = () => {
                    'worklet';
                    const animations = {
                              opacity: withTiming(1, { duration: 150 }),
                    };
                    const initialValues = {
                              opacity: 0,
                    };
                    return {
                              initialValues,
                              animations,
                    };
          };
          const exiting = () => {
                    'worklet';
                    const animations = {
                              opacity: withTiming(0, { duration: 200 }),
                    };
                    const initialValues = {
                              opacity: 1,
                    };
                    return {
                              initialValues,
                              animations,
                    }
          }
          return (
                    <Portal>
                              <Animated.View style={styles.loadingContainer} entering={entering} exiting={exiting}>
                                        <View style={styles.content}>
                                                  <LottieView style={{ width: 150, height: 150 }} source={require('../../../assets/lotties/loadingConfirmation.json')} autoPlay />
                                        </View>
                              </Animated.View>
                    </Portal>
          )
}

const styles = StyleSheet.create({

          loadingContainer: {
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          content: {
                    width: '80%',
                    maxWidth: 400,
                    // backgroundColor: '#fff',
                    borderRadius: 10,
                    // elevation: 5,
                    // shadowColor: '#c4c4c4',
                    justifyContent: 'center',
                    alignItems: 'center',
          },
          modalTitle: {
                    fontSize: 13,
                    fontWeight: 'bold',
                    opacity: 0.8,
                    marginBottom: 20,
                    color: '#fff'
          },
})