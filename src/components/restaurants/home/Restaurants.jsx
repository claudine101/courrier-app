import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList, ScrollView } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
// import Product from '../main/Product';
// import Shop from '../main/Shop';
import Restaurant from '../main/Restaurant';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../../../styles/COLORS";

/**
 * composant pour afficher tous les restaurants
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 24/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function Restaurants({ lat, long, restaurants }) {
    const navigation = useNavigation()
    return (
        <>
            <TouchableNativeFeedback
                onPress={() => navigation.navigate("RestaurantProcheScreen", { restaurants: restaurants })}
                accessibilityRole="button"
                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
            >
                <View style={styles.shopsHeader}>
                    <Text style={styles.title}>Restaurants</Text>
                    <MaterialIcons name="navigate-next" size={24} color="black" />
                </View>

            </TouchableNativeFeedback>

            <ScrollView
                style={styles.shops}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {restaurants.map((restaurant, index) => {
                    return (
                        <Restaurant
                            restaurant={restaurant}
                            index={index}
                            totalLength={restaurants.length}
                            key={index}
                        // lat={lat} 
                        // long={long} 
                        />
                    )
                })}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    homeshops: {
        marginBottom: "-6%",
        marginTop: -11,
    },
    shopsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10
},
    title: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 17,
        fontWeight: "bold"
    },
    shops: {
        paddingHorizontal: 10,
}
})