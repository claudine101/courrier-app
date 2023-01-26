import React from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import ShopModal from "../../components/ecommerce/main/ShopModal";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";

/**
 * Screen pour afficher tous les boutiques des e-commerce
 * @author Vanny Boy <vanny@mediabox.bi>
 * @returns 
 */

export default function BoutiqueListeScreen() {
        const navigation = useNavigation()
        const route = useRoute()

        const { shops } = route.params
        return (
                <View style={styles.container}>
                        <View style={styles.cardHeader}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                        </TouchableOpacity>
                                        <EcommerceBadge />
                                </View>
                        </View>

                        <ScrollView>
                                <View style={styles.bout}>
                                        {shops.map((shop, index) => {
                                                return (
                                                        <ShopModal
                                                                shop={shop}
                                                                index={index}
                                                                totalLength={shops.length}
                                                                key={index}
                                                        />
                                                )
                                        })}
                                </View>
                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        cardHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: StatusBar.currentHeight,
                height: 60,
                backgroundColor: '#fff',
        },
        searchSection1: {
                flexDirection: "row",
                marginTop: -20,
                marginBottom: 10,
                padding: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd",
                alignItems: 'center',
                backgroundColor: "white",
                width: "95%",
                height: 50,
                marginHorizontal: 10,
                paddingHorizontal: 10

        },
        input: {
                flex: 1,
                marginLeft: 10
        },
        bout: {
                flexDirection: 'row',
                flexWrap: 'wrap',
        },
})