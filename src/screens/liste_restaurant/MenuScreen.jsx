import React, { useCallback, useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, StatusBar, TouchableNativeFeedback, TextInput, ScrollView } from "react-native";
import { Ionicons, AntDesign, MaterialIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import Menu from "../../components/restaurants/main/Menu";
import { Modalize } from "react-native-modalize";
import fetchApi from "../../helpers/fetchApi";
import { ActivityIndicator } from "react-native-paper";
import CategoriesResto from "../../components/restaurants/home/CategoriesResto";
import CategoriesModalizeResto from "../../components/restaurants/AllMenu/CategoriesModalizeResto";
import { HomeMenuSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import * as Location from 'expo-location';
import RestosModalize from "../../components/restaurants/AllMenu/RestosModalize";

/**
 * composant pour afficher les menus avec filtres de categories ou filtre des restaurants
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 24/1/2023
 * @returns 
 */

export default function MenuScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const { categorie } = route.params

    const [loadingCategories, setLoadingCatagories] = useState(true)
    const [loadingRestos, setLoadingRestos] = useState(true)

    const [categories, setCategories] = useState([])
    const [restos, setRestos] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(categorie)
    // const [selectedResto, setSelectedResto] = useState(shop)

    const categoriesModalizeRef = useRef()
    const restosModalizeRef = useRef()

    const [loadingForm, setLoadingForm] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [isRestoOpen, setIsRestoOpen] = useState(false)

    const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [products, setProducts] = useState([])




    const fecthProduits = async () => {
        try {
            const response = await fetchApi("/resto/menu/categories", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setCategories(response.result)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoadingCatagories(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fecthProduits()
    }, []))

    useEffect(() => {
        (async () => {
            try {
                var url = "/resto/menu"
                if (selectedCategory) {
                    var url = `/resto/menu?category=${selectedCategory.ID_CATEGORIE_MENU}`
                }
                const reponse = await fetchApi(url)
                setProducts(reponse.result)
            }
            catch (error) {
                console.log(error)
            }
        })()
    }, [selectedCategory])

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setLoadingForm(false)
            })
            return () => {
                clearTimeout(timer)
            }
        }
        if (isRestoOpen) {
            const timer = setTimeout(() => {
                setLoadingForm(false)
            })
            return () => {
                clearTimeout(timer)
            }
        }
    }, [isOpen, isRestoOpen])




    var location
    useEffect(() => {
        const fecthRestos = async (lat, long) => {
            try {
                if (lat && long) {
                    return await fetchApi(`/partenaire/service/resto?lat=${lat}&long=${long}`)
                } else {
                    return await fetchApi('/partenaire/service/resto')
                }
            }
            catch (error) {
                console.log(error)
            } finally {
                setLoadingRestos(false)
            }
        }
        const askLocationFetchRestos = async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                const restaurants = await fecthRestos()
                setLoadingRestos(false)
                setRestos(restaurants.result)
                return;
            }
            location = await Location.getCurrentPositionAsync({});
            const restaurants = await fecthRestos(location.coords.latitude, location.coords.longitude)
            setLoadingRestos(false)
            setRestos(restaurants.result)
        }
        askLocationFetchRestos()

    }, [location])


    return (
        <>
            <CategoriesModalizeResto
                categoriesModalizeRef={categoriesModalizeRef}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                loadingForm={loadingForm}
                setLoadingForm={setLoadingForm}
                loadingCategories={loadingCategories}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <RestosModalize
                restosModalizeRef={restosModalizeRef}
                restos={restos}
                // selectedResto={selectedResto}
                // setSelectedResto={setSelectedResto}
                loadingForm={loadingForm}
                setLoadingForm={setLoadingForm}
                loadingRestos={loadingRestos}
                isRestoOpen={isRestoOpen}
                setIsRestoOpen={setIsRestoOpen}
            />


            <View style={styles.container}>
                <View style={styles.cardHeader}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableNativeFeedback
                            style={{}}
                            onPress={() => navigation.goBack()}
                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                            <View style={styles.headerBtn}>
                                <Ionicons name="arrow-back-sharp" size={24} color="black" />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableNativeFeedback
                            style={{}}
                            onPress={() => navigation.goBack()}
                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                            <View style={styles.headerBtn}>
                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                            </View>
                        </TouchableNativeFeedback>
                        <EcommerceBadge />
                    </View>
                </View>
                <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[1]}>
                    <Text style={styles.titlePrincipal}></Text>
                    <View>
                        <View style={styles.quickFilters}>
                            <View style={styles.filterCategoryShop}>
                                <TouchableNativeFeedback useForeground
                                    onPress={() => {
                                        categoriesModalizeRef.current.open()
                                        setIsOpen(true)
                                    }}
                                >
                                    <View style={styles.quickFilterBtn}>
                                        <View style={styles.quickFilterBtnHeader}>
                                            <Entypo name="shopping-cart" size={20} color={COLORS.primary} />
                                            <Text style={styles.quickFilterTitle}>
                                                {selectedCategory ? selectedCategory.NOM : 'Catégories'}
                                                <Entypo name="chevron-small-down" size={12} color="#777" />
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback useForeground onPress={() => {
                                    restosModalizeRef.current.open()
                                    setIsRestoOpen(true)
                                }}>
                                    <View style={[styles.quickFilterBtn, { marginLeft: 10 }]}>
                                        <View style={styles.quickFilterBtnHeader}>
                                            <Entypo name="shop" size={20} color={COLORS.primary} />
                                            <Text style={styles.quickFilterTitle}>
                                                Restaurants
                                                <Entypo name="chevron-small-down" size={12} color="#777" />
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View>
                                <TouchableNativeFeedback useForeground>
                                    <View style={styles.filterBtn}>
                                        <SimpleLineIcons name="equalizer" size={24} color={COLORS.primary} style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                    </View>
                    {loadingProducts ? <HomeMenuSkeletons wrap noTitle /> :
                        products.length == 0 ? <View style={styles.emptyContainer}>
                            <Image source={require('../../../assets/images/no-money.png')} style={styles.emptyImage} />
                            <Text style={styles.emptyFeedback}>Aucun résultat trouvé</Text>
                        </View> :
                            <View style={styles.products}>
                                {products.map((product, index) => {
                                    return (
                                        <Menu
                                            menu={product}
                                            index={index}
                                            totalLength={products.length}
                                            key={index}
                                            fixMargins
                                        />
                                    )
                                })}
                            </View>}

                </ScrollView>
            </View>
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerBtn: {
        padding: 10
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },
    titlePrincipal: {
        fontSize: 0,
        fontWeight: "bold",
        marginBottom: 0,
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10
    },
    quickFilters: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    filterCategoryShop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quickFilterBtn: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#aaa',
        minWidth: 120,
        borderRadius: 8,
        overflow: 'hidden'
    },
    quickFilterBtnHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quickFilterTitle: {
        fontSize: 12,
        marginLeft: 5,
        color: '#777'
    },
    quickFilterValue: {
        fontSize: 12
    },
    filterBtn: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#aaa',
        overflow: 'hidden'
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    emptyImage: {
        width: 200,
        height: 200
    },
    emptyFeedback: {
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 30,
        fontSize: 16,
        color: COLORS.ecommercePrimaryColor,
        paddingHorizontal: 10
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10
    },

})