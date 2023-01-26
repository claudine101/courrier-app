import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import Shops from "../../components/ecommerce/home/Shops";
import Product from "../../components/ecommerce/main/Product";
import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";import Restaurants from "../../components/restaurants/home/Restaurants";
import HomeMenus from "../../components/restaurants/home/HomeMenus";
import Menu from "../../components/restaurants/main/Menu";
import RestaurantBadge from "../../components/restaurants/main/RestaurantBadge";

export default function RestaurantHomeScreen() {
    const { height } = useWindowDimensions()

    const [loadingCategories, setLoadingCatagories] = useState(true)
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)


    const [loadingSubCategories, setLoadingSubCategories] = useState(false)
    const [sousCategories, SetSousCategories] = useState([])
    const [selectedsousCategories, setSelectedsousCategories] = useState(null)


    const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
    const [loadingMenus, setLoadingMenus] = useState(false)
    const [menus, setMenus] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const navigation = useNavigation()
    const fecthCategories = async () => {
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
        fecthCategories()
    }, []))

    const onCategoryPress = (categorie) => {
        if (loadingSubCategories || loadingMenus) return false
        if (categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU) {
            return setSelectedCategorie(null)
        }
        setSelectedCategorie(categorie)
        setSelectedsousCategories(null)
    }
// *************************
    const selectedItemSousCategories = (souscategorie) => {
        if (loadingSubCategories || loadingMenus) return false
        if (souscategorie.ID_PRODUIT_SOUS_CATEGORIE == selectedsousCategories?.ID_PRODUIT_SOUS_CATEGORIE) {
            return setSelectedsousCategories(null)
        }
        setSelectedsousCategories(souscategorie)
        // setSelectedsousCategories(null)
    }

    //fetch des sous  categories
    useEffect(() => {
        (async () => {
            try {
                setLoadingSubCategories(true)
                if (selectedCategorie?.ID_CATEGORIE_PRODUIT) {
                    const subCategories = await fetchApi(`/products/sub_categories/${selectedCategorie?.ID_CATEGORIE_PRODUIT}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                    SetSousCategories(subCategories.result)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingSubCategories(false)
            }
        })()
    }, [selectedCategorie])
// *************************
    useEffect(() => {
        (async () => {
            try {
                if (firstLoadingMenus == false) {
                    setLoadingMenus(true)
                }
                var url = "/resto/menu"
                if (selectedCategorie) {
                    url = `/resto/menu?category=${selectedCategorie?.ID_CATEGORIE_MENU}`
                }
                const menus = await fetchApi(url)
                setMenus(menus.result)
                console.log(error)
            } finally {
                setFirstLoadingMenus(false)
                setLoadingMenus(false)
            }
        })()
    }, [selectedCategorie])

    useEffect(() => {
        (async () => {
            try {
                if (firstLoadingMenus == false) {
                    setLoadingMenus(true)
                }
                var url = "/partenaire/service/resto"
                // if (selectedCategorie) {
                //     url = `/partenaire/ecommerce?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}`
                // }
                const restaurant = await fetchApi(url)
                setRestaurants(restaurant.result)
            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingMenus(false)
                setLoadingMenus(false)
            }
        })()
    }, [selectedCategorie, selectedsousCategories])

    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <View style={styles.menuOpenerLine} />
                    <View style={[styles.menuOpenerLine, { width: 15 }]} />
                    <View style={[styles.menuOpenerLine, { width: 25 }]} />
                </TouchableOpacity>
                <RestaurantBadge />
            </View>
            <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[2]}>
                <Text style={styles.titlePrincipal}>Restaurants</Text>
                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
                    <View style={styles.searchSection}>
                        <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                        <TextInput
                            style={styles.input}
                            placeholder="Recherche..."
                        />
                    </View>
                    <View style={styles.cardRecherche}>
                        <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                    </View>
                </View>
                {(loadingCategories || firstLoadingMenus) ? <CategoriesSkeletons /> :
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, backgroundColor: '#fff', }}>
                            {categories.map((categorie, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => onCategoryPress(categorie)}>
                                        <View style={{ alignContent: "center", alignItems: "center" }}>
                                            <View style={[styles.cardPhoto, { backgroundColor: categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU ? COLORS.handleColor : "#DFE1E9" }]}>
                                                <Image source={{ uri: categorie.IMAGE }} style={styles.DataImageCategorie} />
                                            </View>
                                            <Text style={[{ fontSize: 12, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>}
                {selectedCategorie ? ((loadingSubCategories || loadingMenus) ? <SubCategoriesSkeletons /> : <SubCategories
                    sousCategories={sousCategories}
                    selectedItemSousCategories={selectedItemSousCategories}
                    selectedsousCategories={selectedsousCategories}
                />) : null}

                {(firstLoadingMenus || loadingCategories || loadingMenus || loadingSubCategories) ? <HomeProductsSkeletons /> :
                    <HomeMenus menus={menus} selectedCategorie={selectedCategorie} />}
                {(firstLoadingMenus || loadingCategories || loadingMenus || loadingSubCategories) ? <HomeProductsSkeletons /> :
                    <Restaurants restaurants={restaurants} />
                }
                <TouchableNativeFeedback
                    accessibilityRole="button"
                    background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                >
                    <View style={styles.productsHeader}>
                        <Text style={styles.title}>Recommandé pour vous</Text>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableNativeFeedback>

                <View style={styles.products}>
                    {menus.map((menu, index) => {
                        return (
                            <Menu
                                menu={menu}
                                index={index}
                                totalLength={menus.length}
                                key={index}
                                fixMargins
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
        height: 60
    },
    menuOpener: {
    },
    menuOpenerLine: {
        height: 3,
        width: 30,
        backgroundColor: COLORS.ecommercePrimaryColor,
        marginTop: 5,
        borderRadius: 10
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: "100%"
    },
    cardOrginal: {
    },
    titlePrincipal: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10
    },

    searchSection: {
        flexDirection: "row",
        marginTop: 10,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundColor: "#D7D9E4",
        width: "84%",
        height: 50,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        marginLeft: 10
    },
    cardRecherche: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: COLORS.ecommerceRed,
        marginTop: 8,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    DataImageCategorie: {
        minWidth: 40,
        minHeight: 40,
        borderRadius: 10,
    },
    cardPhoto1: {
        marginTop: 10,
        width: 50,
        height: 50,
        backgroundColor: "#DFE1E9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cardPhoto: {
        marginTop: 10,
        width: 50,
        height: 50,
        //backgroundColor: "#242F68",
        backgroundColor: "#DFE1E9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    title: {
        fontWeight: 'bold'
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
})