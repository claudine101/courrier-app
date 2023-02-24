import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useRef } from "react";
import { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { MaterialTabBar, MaterialTabItem, Tabs } from 'react-native-collapsible-tab-view'
import { useEffect } from "react";
import ShopCollapsableHeader, { HEADER_HEIGHT } from "../../components/ecommerce/shop/ShopCollapsableHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import Product from "../../components/ecommerce/main/Product";
import ProductsTabScreen from "./tabs/ProductsTabScreen";
import DetailsShopTabScreen from "./tabs/DetailsShopTabScreen";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES"
import MenuTabScreen from "../restaurant/tabs/MenuTabScreen";
import AvisDetailsTabScreen from "./tabs/AvisDetailsTabScreen";
import useFetch from "../../hooks/useFetch";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import Rating from "../../components/ecommerce/details/Rating";
import Loading from "../../components/app/Loading";

const TopTab = createMaterialTopTabNavigator()

export default function ShopScreen() {
        const [activeIndex, setActiveIndex] = useState(0)
        const route = useRoute()
        const [products, setProducts] = useState([])
        const [loading, setLoading] = useState(false)
        const { shop } = route.params
        const navigation = useNavigation()

        var serviceResto = IDS_SERVICE_CATEGORIES.resto
        var serviceEco = IDS_SERVICE_CATEGORIES.ecommerce

        var url
        if (shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.ecommerce) {
                url = `/ecommerce/ecommerce_produits_notes/notes/${shop.ID_PARTENAIRE_SERVICE}`
        } else if (shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.resto) {
                url = `/resto/restaurant_menus_notes/notes/${shop.ID_PARTENAIRE_SERVICE}`
        }
        const [loadingPartenaireNotes, partenaireNotes] = useFetch(url)

        const checkProduct = async (id, SERVICE) => {
                try {
                        setLoading(true)
                        var url
                        if (SERVICE == IDS_SERVICE_CATEGORIES.ecommerce) {
                                url = `/ecommerce/ecommerce_produits/one/${id}`
                        } else if (shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.resto) {
                                url = `/resto/restaurant_menus/one/${id}`
                        }
                        const response = await fetchApi(url)
                        if (SERVICE == IDS_SERVICE_CATEGORIES.ecommerce){
                                navigation.navigate("ProductDetailsScreen", { product: response.result, SERVICE: SERVICE })
                        }else if(shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.resto){
                                navigation.navigate("MenuDetailScreen", { product: response.result, SERVICE: SERVICE })
                        }
                }
                catch (error) {
                        console.log(error)
                } finally {
                        setLoading(false)
                }

        }

        const Header = () => {
                return <ShopCollapsableHeader shop={shop} />
        }
        const renderItem = React.useCallback(({ index }) => {
                return (
                        <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
                )
        }, [])
        const DATA = [0, 1, 2, 3, 4]

        const tabBar = props => (
                <MaterialTabItem
                        {...props}
                />
        )


        return (
                <Tabs.Container
                        renderHeader={Header}
                        headerHeight={HEADER_HEIGHT}
                        TabBarComponent={props => {
                                return <MaterialTabBar
                                        {...props}
                                        indicatorStyle={{ backgroundColor: '#949494', height: 2, elevation: 0, borderBottomWidth: 0 }}
                                        inactiveColor='#777'
                                        tabStyle={{ elevation: 0, height: "100%" }}
                                        style={{ elevation: 0, paddingHorizontal: 10, height: 50 }}
                                        labelStyle={{ color: 'red', fontWeight: 'bold', paddingHorizontal: 10 }}
                                        scrollEnabled
                                        contentContainerStyle={{ elevation: 0 }}
                                />
                        }}
                        onIndexChange={index => setActiveIndex(index)}
                >
                        <Tabs.Tab name="produits" label={<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                {(shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.resto && shop.ID_SERVICE != IDS_SERVICE_CATEGORIES.ecommerce) ?
                                        <Text style={[styles.headerLabel, { color: activeIndex == 0 ? '#000' : "#777" }]} >Menus</Text> :
                                        <Text style={[styles.headerLabel, { color: activeIndex == 0 ? '#000' : "#777" }]}>Produits</Text>}
                        </View>}>

                                {shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.ecommerce ? <ProductsTabScreen shop={shop} serviceResto={serviceResto} serviceEco={serviceEco} /> : null}
                                {shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.resto ? <MenuTabScreen shop={shop} serviceResto={serviceResto} serviceEco={serviceEco} /> : null}
                        </Tabs.Tab>
                        <Tabs.Tab name="commandes" label={<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={[styles.headerLabel, { color: activeIndex == 0 ? '#777' : "#000" }]}>Avis</Text>
                        </View>}
                        >
                                <Tabs.ScrollView>
                                        {loadingPartenaireNotes ?
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                                        <ActivityIndicator animating={true} size="large" color={"#000"} />
                                                </View> :
                                                <>
                                                {loading && <Loading />}
                                                <View style={styles.reviews}>
                                                        {partenaireNotes.result.map((review, index) => {
                                                                return (
                                                                        <TouchableOpacity key={index} onPress={() => {
                                                                                if (shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.ecommerce) {
                                                                                        checkProduct(review.ID_PRODUIT, shop.ID_SERVICE)
                                                                                } else if (shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.resto) {
                                                                                        checkProduct(review.ID_RESTAURANT_MENU, shop.ID_SERVICE)
                                                                                }
                                                                        }}
                                                                        >
                                                                                <Rating rating={review} index={index} />
                                                                        </TouchableOpacity>
                                                                )
                                                        })}
                                                </View>
                                                </>}
                                </Tabs.ScrollView>
                        </Tabs.Tab>
                        <Tabs.Tab name="supp" label={<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={[styles.headerLabel, { color: activeIndex == 0 ? '#777' : "#000" }]}>A propos</Text>
                        </View>}>
                                <DetailsShopTabScreen shop={shop} />
                        </Tabs.Tab>
                </Tabs.Container>
        )
}

const styles = StyleSheet.create({
        box: {
                height: 250,
                width: '100%',
                marginTop: 10
        },
        boxA: {
                backgroundColor: 'white',
        },
        boxB: {
                backgroundColor: '#D8D8D8',
        },
        header: {
                height: HEADER_HEIGHT,
                width: '100%',
                backgroundColor: '#2196f3',
        },
        actionBadge: {
                minWidth: 20,
                minHeight: 18,
                backgroundColor: "#000",
                borderRadius: 100,
                position: 'absolute',
                right: -25,
                // top: -9,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 3
        },
        actionBadgeText: {
                color: '#FFF',
                fontSize: 12,
                marginTop: -2,
                fontWeight: "bold"
        },
        headerLabel: {
                fontSize: 12
        },
        reviews: {
                marginTop: 10
        },
})