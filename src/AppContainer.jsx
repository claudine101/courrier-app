import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../src/store/selectors/userSelector"
import { setUserAction } from "./store/actions/userActions"
import WelcomeNavigator from "./routes/WelcomeNavigator";
import RootNavigator from "./routes/RootNavigator";

const Stack = createStackNavigator()

export default function AppContainer() {
          const dispatch = useDispatch()
          const user = useSelector(userSelector)
          const [userLoading, setUserLoading] = useState(true)
          const [showOnBoarding, setShowOnBoarding] = useState(false)
          useEffect(() => {
                    (async function () {
                               const user = await AsyncStorage.getItem("user")
                        //       await AsyncStorage.removeItem('user')
                        //       await AsyncStorage.removeItem('user')

                              const onboarding = JSON.parse(await AsyncStorage.getItem('onboarding'))
                              setShowOnBoarding(!onboarding || !onboarding.finished)
                              dispatch(setUserAction(JSON.parse(user)))
                              setUserLoading(false)
                    })()
          }, [dispatch])

        return (
                userLoading ?
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator color="#007BFF" animating={userLoading} size='large' />
                        </View> :
                        <>
                                {!user ? <WelcomeNavigator showOnBoarding={showOnBoarding} /> :
                                        <RootNavigator />
                                }
                        </>
        )
}