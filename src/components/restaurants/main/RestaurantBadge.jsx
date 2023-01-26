import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity,TouchableNativeFeedback, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { restaurantCartSelector } from "../../../store/selectors/restaurantCartSelectors"
import { ecommerceCartSelector } from "../../../store/selectors/ecommerceCartSelectors";
import { COLORS } from "../../../styles/COLORS";
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";


export default function RestaurantBadge() {
        const navigation = useNavigation()
        const menusInCart = useSelector(restaurantCartSelector)
        const scale = useSharedValue(1)
        const scaleAnimatedStyles = useAnimatedStyle(() => ({
                transform: [{ scale: scale.value }]
        }))

        const onPress = () => {
                navigation.navigate('RestaurantCartScreen')
        }

        useEffect(() => {
                if (menusInCart.length > 0) {
                        scale.value = withRepeat(withTiming(1.5, { duration: 200 }), 2, true)
                }
        }, [menusInCart])

        return (
                <TouchableNativeFeedback
                        style={{}}
                        onPress={onPress}
                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                        <Animated.View style={[styles.btn, scaleAnimatedStyles]}>
                                <Ionicons name="cart-outline" size={30} color={COLORS.ecommercePrimaryColor} />
                                {menusInCart.length > 0 ? <View style={styles.badge}>
                                        <Text style={styles.badgeText} numberOfLines={1}>{menusInCart.length}</Text>
                                </View> : null}
                        </Animated.View>
                </TouchableNativeFeedback>
        )
}

const styles = StyleSheet.create({
        btn: {
                marginRight: 5,
                padding: 10
        },
        badge: {
                minWidth: 25,
                minHeight: 20,
                borderRadius: 20,
                paddingHorizontal: 3,
                backgroundColor: COLORS.ecommerceRed,
                position: 'absolute',
                top: 5,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
        },
        badgeText: {
                textAlign: 'center',
                fontSize: 10,
                color: '#FFF',
                fontWeight: "bold"
        }
})