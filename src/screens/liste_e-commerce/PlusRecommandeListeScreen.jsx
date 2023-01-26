import React, { useEffect, useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image, ActivityIndicator } from "react-native";
import { AntDesign, FontAwesome, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import ShopModal from "../../components/ecommerce/main/ShopModal";
import Product from "../../components/ecommerce/main/Product";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import fetchApi from "../../helpers/fetchApi";
import { Modalize } from "react-native-modalize";
import * as Location from 'expo-location';

/**
 * screens pour afficher le produits recommandez pour vous avec une filtre des cotegories
 * screens pour afficher le produits avec une filtre par rapport a la categories deja selectionner 
 * @author Vanny Boy <vanny@mediabox.bi>
 * @returns 
 */

export default function PlusRecommandeScreen() {
        const navigation = useNavigation()
        const route = useRoute()

        const { selectedOneCategorie, ID_PARTENAIRE_SERVICE } = route.params

        const [categories, setCategories] = useState([])
        const [selectedCategorie, setSelectedCategorie] = useState(null)
        const [loadingCategories, setLoadingCatagories] = useState(true)

        const [isOpen, setIsOpen] = useState(false)

        const [LoadingProducts, setLoadingProducts] = useState(true)
        const [products, setProducts] = useState([])

        const [shops, setShops] = useState([])

        const CategoriemodalizeRef = useRef()
        const RestaurantmodalizeRef = useRef()

        const fetchCategories = async () => {
                setIsOpen(true)
                CategoriemodalizeRef.current?.open()
        }

        const fetchRestaurant = () => {
                setIsOpen(true)
                RestaurantmodalizeRef.current?.open()
        }

        const onCategoryPress = (categorie) => {
                setSelectedCategorie(categorie)
                CategoriemodalizeRef.current.close()
        }


        const fecthProduits = async () => {
                try {
                        if (ID_PARTENAIRE_SERVICE) {
                                const response = await fetchApi(`/products/products/${ID_PARTENAIRE_SERVICE}`, {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                                })

                                setProducts(response.result)
                        }
                }

                catch (error) {
                        console.log(error)
                }
                //  finally {
                //   setLoadingShopProducts(false)
                // }
        }
        useFocusEffect(useCallback(() => {
                fecthProduits()
        }, []))

        useEffect(() => {
                (async () => {
                        try {
                                const reponse = await fetchApi("/products/categories", {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                                })
                                setCategories(reponse.result)
                        }
                        catch (error) {
                                console.log(error)
                        } finally {
                                setLoadingCatagories(false)
                        }
                })()
        }, [])

        useEffect(() => {
                if (selectedOneCategorie) {
                        setSelectedCategorie(selectedOneCategorie)
                }
        }, [])

        useEffect(() => {
                (async () => {
                        try {
                                if (LoadingProducts == false) {
                                        setLoadingProducts(true)
                                }
                                var url = "/products"
                                if (selectedCategorie) {
                                        url = `/products?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}`
                                }
                                const produits = await fetchApi(url)
                                setProducts(produits.result)
                        }
                        catch (error) {
                                console.log(error)
                        }
                        finally {
                                setLoadingProducts(false)
                        }
                })()
        }, [selectedCategorie])

        useEffect(() => {
                const fecthShops = async (lat, long) => {
                        try {
                                if (lat && long) {
                                        return await fetchApi(`/partenaire/ecommerce?lat=${lat}&long=${long}`)
                                }
                                else {
                                        return await fetchApi('/partenaire/ecommerce')
                                }
                        }
                        catch (error) {
                                console.log(error)
                        }
                        // finally {

                        // }
                }
                const askLocationFetchShops = async () => {
                        let { status } = await Location.requestForegroundPermissionsAsync();
                        if (status !== 'granted') {
                                console.log('Permission to access location was denied');
                                const shops = await fecthShops()
                                setShops(shops.result)
                                return;
                        }
                        var location = await Location.getCurrentPositionAsync({});
                        const shops = await fecthShops(location.coords.latitude, location.coords.longitude)
                        setShops(shops.result)
                }
                askLocationFetchShops()
        }, [])




        return (<>
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

                        {ID_PARTENAIRE_SERVICE ? null
                        // <TouchableOpacity style={styles.cardResto} onPress={fetchRestaurant}>
                        //         <Ionicons name="restaurant-outline" size={28} color="white" />
                        // </TouchableOpacity>
                         :
                                <TouchableOpacity style={styles.modelCard} onPress={fetchCategories}>
                                        <Text style={styles.inputText}>{selectedCategorie ? selectedCategorie.NOM : "Selectionner"}</Text>
                                        <AntDesign name="caretdown" size={16} color="#777" />
                                </TouchableOpacity>
                        }



                        <ScrollView>
                                {LoadingProducts ? <View style={{ marginTop: 30 }}>
                                        <ActivityIndicator animating={true} size="large" color={"black"} />
                                </View> :
                                        <>
                                                {products.length == 0 ? <View style={styles.notResultat}>
                                                        <Text style={styles.textNotfound}>Pas de produits touvez</Text>
                                                </View> :

                                                        <View style={styles.products}>
                                                                {products.map((product, index) => {
                                                                        return (
                                                                                <Product
                                                                                        product={product}
                                                                                        index={index}
                                                                                        totalLength={products.length}
                                                                                        key={index}
                                                                                        fixMargins
                                                                                />
                                                                        )
                                                                })}
                                                        </View>}
                                        </>}
                        </ScrollView>


                </View>
                <Modalize
                        ref={CategoriemodalizeRef}
                        adjustToContentHeight
                        handlePosition='inside'
                        modalStyle={{
                                borderTopRightRadius: 25,
                                borderTopLeftRadius: 25,
                                paddingVertical: 20
                        }}
                        handleStyle={{ marginTop: 10 }}
                        scrollViewProps={{
                                keyboardShouldPersistTaps: "handled"
                        }}
                        onClosed={() => {
                                setIsOpen(false)
                                //     setLoadingForm(true)
                        }}
                >
                        <ScrollView>
                                <Text style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Catégories</Text>
                                <ScrollView>
                                        {categories.map((categorie, index) => {
                                                return (
                                                        <View key={index}>
                                                                <TouchableOpacity style={styles.modalItem} onPress={() => onCategoryPress(categorie)}>
                                                                        <View style={styles.categoryPhoto}>
                                                                                <Image source={{ uri: categorie.IMAGE }} style={styles.DataImageCategorie} />
                                                                        </View>
                                                                        {/* <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> */}
                                                                        {/* <MaterialCommunityIcons name="radiobox-blank" size={24} color="black" /> */}
                                                                        <View style={styles.cardName}>
                                                                                <Text numberOfLines={1} style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor }}>{categorie.NOM}</Text>
                                                                        </View>

                                                                </TouchableOpacity>
                                                        </View>
                                                )
                                        })}

                                </ScrollView>
                        </ScrollView>
                </Modalize>
                <Modalize
                        ref={RestaurantmodalizeRef}
                        adjustToContentHeight
                        handlePosition='inside'
                        modalStyle={{
                                borderTopRightRadius: 25,
                                borderTopLeftRadius: 25,
                                paddingVertical: 20
                        }}
                        handleStyle={{ marginTop: 10 }}
                        scrollViewProps={{
                                keyboardShouldPersistTaps: "handled"
                        }}
                        onClosed={() => {
                                setIsOpen(false)
                                //     setLoadingForm(true)
                        }}
                >
                        <ScrollView>
                                <Text style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Restaurant</Text>
                                <ScrollView>
                                        {shops.map((shop, index) => {
                                                return (
                                                        <View key={index}>
                                                                <TouchableOpacity style={styles.modalItem}>
                                                                        <View style={styles.categoryPhoto}>
                                                                                <Image source={{ uri: shop.LOGO }} style={styles.DataImageCategorie} />
                                                                        </View>
                                                                        <View style={styles.cardName}>
                                                                                <Text numberOfLines={1} style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor }}>{shop.NOM_ORGANISATION}</Text>
                                                                        </View>

                                                                </TouchableOpacity>
                                                        </View>
                                                )
                                        })}

                                </ScrollView>
                        </ScrollView>
                </Modalize>
        </>
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
        products: {
                flexDirection: 'row',
                flexWrap: 'wrap'
        },
        modelCard: {
                justifyContent: "space-between",
                flexDirection: "row",
                marginHorizontal: 10,
                marginTop: 10,
                backgroundColor: "#fff",
                padding: 9,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd"
        },
        inputText: {
                fontSize: 17,
                color: "#777"
        },
        modalItem: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center'
        },
        categoryPhoto: {
                backgroundColor: COLORS.skeleton,
                width: 70,
                height: 50,
                borderRadius: 8,
                padding: 3,
                justifyContent: 'center',
                alignItems: 'center'
        },
        DataImageCategorie: {
                borderRadius: 10,
                width: '65%',
                height: '65%',
        },
        cardName: {
                marginLeft: 10
        },
        notResultat: {
                padding: 5,
                marginTop: 10,
                marginHorizontal: 10
        },
        textNotfound: {
                fontWeight: "bold",
                fontSize: 18,
                color: "#777"
        },
        cardResto: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: COLORS.ecommerceRed,
                marginTop: 8,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginHorizontal: 10
        }

})