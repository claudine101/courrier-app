import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { ecommerceCartSelector } from "../../../store/selectors/ecommerceCartSelectors";
import { COLORS } from "../../../styles/COLORS";
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";


export default function EcommerceBadge() {
          const navigation = useNavigation()
          const productsInCart = useSelector(ecommerceCartSelector)
          const scale = useSharedValue(1)
          const scaleAnimatedStyles = useAnimatedStyle(() => ({
                    transform: [{ scale: scale.value }]
          }))

          const onPress = () => {
                    navigation.navigate('EcommerceCartScreen')
                //     navigation.navigate('SearchLivreurScreen')
          }
          
          useEffect(() => {
                    if(productsInCart.length > 0) {
                              scale.value = withRepeat(withTiming(1.5, { duration: 200 }), 2, true)
                    }
          }, [productsInCart])
          
          return (
                    <TouchableNativeFeedback
                              style={{}}
                              onPress={onPress} 
                              background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                              <Animated.View style={[styles.btn, scaleAnimatedStyles]}>
                                        <Ionicons name="cart-outline" size={30} color={COLORS.ecommercePrimaryColor} />
                                        {productsInCart.length > 0 ? <View style={styles.badge}>
                                                  <Text style={styles.badgeText} numberOfLines={1}>{ productsInCart.length }</Text>
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