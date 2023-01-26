import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import LoginScreen from '../screens/welcome/LoginScreen'
import OnBoardingScreen from '../screens/welcome/OnBoardingScreen'

export default function WelcomeNavigator({ showOnBoarding }) {
          const Stack = createStackNavigator()
          return (
                    <NavigationContainer 
                              theme={{
                                        colors: {
                                                  background: "#fff",
                                        },
                              }}>
                              <Stack.Navigator screenOptions={{ headerShown: false }}>
                                        {showOnBoarding ? <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} /> : null}
                                        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                                                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                                        }} />
                              </Stack.Navigator>
                    </NavigationContainer>
          )
}