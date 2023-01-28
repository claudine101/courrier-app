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
import registerPushNotification from "./helpers/registerPushNotification";
import * as Notifications from 'expo-notifications';
import { setNotificationTokenAction } from "./store/actions/appActions";
import * as ExpoLinking from 'expo-linking';

const Stack = createStackNavigator()

export default function AppContainer() {
        const dispatch = useDispatch()
        const user = useSelector(userSelector)
        const [userLoading, setUserLoading] = useState(true)
        const [showOnBoarding, setShowOnBoarding] = useState(false)
        useEffect(() => {
                Notifications.setNotificationHandler({
                        handleNotification: async () => ({
                                shouldShowAlert: true,
                                shouldPlaySound: true,
                                shouldSetBadge: true,
                        }),
                });
                (async function () {
                        const token = await registerPushNotification()
                        dispatch(setNotificationTokenAction(token.data))
                        const user = await AsyncStorage.getItem("user")
                        //       await AsyncStorage.removeItem('user')
                        const onboarding = JSON.parse(await AsyncStorage.getItem('onboarding'))
                        setShowOnBoarding(!onboarding || !onboarding.finished)
                        dispatch(setUserAction(JSON.parse(user)))
                        setUserLoading(false)
                })()
        }, [dispatch])
        // const prefix = ExpoLinking.createURL('/')
        if (userLoading) {
                return (
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator color="#007BFF" animating={userLoading} size='large' />
                        </View>
                )
        }

        return (
                // userLoading ?
                //         <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                //                 <ActivityIndicator color="#007BFF" animating={userLoading} size='large' />
                //         </View> :
                <>
                        {!user ? <WelcomeNavigator showOnBoarding={showOnBoarding} /> :
                                <RootNavigator />
                        }
                </>
        )
}