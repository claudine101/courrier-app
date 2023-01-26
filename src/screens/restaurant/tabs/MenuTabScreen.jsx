import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from 'react'
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Tabs } from 'react-native-collapsible-tab-view'
import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import fetchApi from "../../../helpers/fetchApi";
import Product from "../../../components/ecommerce/main/Product";
import Menu from "../../../components/restaurants/main/Menu";

export default function MenuTabScreen({ shop, serviceResto, serviceEco }) {
        const [products, setProducts] = useState([])
        const [loading, setLoading] = useState(true)
        const navigation = useNavigation()


        const renderProducts = ({ item: product, index }) => {
                return (
                        <Menu
                                menu={product}
                                index={index}
                                totalLength={products.length}
                                key={index}
                                fixMargins
                        />

                )
        }

        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                var url = `/resto/menu?partenaireService=${shop.ID_PARTENAIRE_SERVICE}`
                                const produits = await fetchApi(url)
                                setProducts(produits.result)
                        } catch (error) {
                                console.log(error)
                        } finally {
                                setLoading(false)
                        }
                })()
        }, []))

        return (
                <>
                        {loading ? <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.container}>
                                        <View style={styles.loadingContainer}>
                                                <ActivityIndicator size={"large"} color='#777' />
                                        </View>
                                </View>
                        </Tabs.ScrollView> :
                                products.length == 0 ?
                                        <Tabs.ScrollView>
                                                <View style={styles.container}>
                                                        <View style={styles.emptyContainer}>
                                                                <Feather name="check-square" size={24} color="#777" />
                                                                <Text style={styles.emptyFeedback}>
                                                                        Pas de menu dans ce restaurant
                                                                </Text>
                                                        </View>
                                                </View>
                                        </Tabs.ScrollView> :
                                        <Tabs.FlatList
                                                data={products}
                                                renderItem={renderProducts}
                                                contentContainerStyle={styles.products}
                                        />
                        }
                </>

        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        emptyContainer: {
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30
        },
        emptyFeedback: {
                marginTop: 10,
                color: '#777',
                textAlign: "center",
                paddingHorizontal: 30
        },
        products: {
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap'
        }
})