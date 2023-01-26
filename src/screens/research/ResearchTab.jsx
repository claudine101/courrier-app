import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, {  useState, useEffect } from 'react'
import { Text, View, useWindowDimensions, StatusBar, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import EcommerceBadge from '../../components/ecommerce/main/EcommerceBadge';
import { COLORS } from '../../styles/COLORS';
import {  FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import EcommerceResearchScreen from './EcommerceResearchScreen';
import RestaurantResearchScreen from './RestaurantResearchScreen';
import { useForm } from '../../hooks/useForm';
import fetchApi from '../../helpers/fetchApi';
import SearchContext from '../../context/searchContext';
const TopBar = createMaterialTopTabNavigator()

export default function ResearchTab() {
    const navigation=useNavigation()
    const [products, setProducts] = useState([])
    const [menus, setMenus] = useState([])

    const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)

    const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
    const [loadingMenus, setLoadingMenus] = useState(false)
    const { height } = useWindowDimensions()
    // const [search, SetSearch]=useState(null)

    const route=useRoute()
    const {search}=route.params
    // console.log(search)
    const  contextValues={
        products,
        menus,
        firstLoadingProducts,
        loadingProducts,
        firstLoadingMenus,
        loadingMenus
    }
   
    useEffect(() => {
        (async () => {
            await AsyncStorage.setItem('onboarding', JSON.stringify({ finished: true }))
        })()
    }, [])
     //POUR LES PRODUITS
    useEffect(() => {
        (async () => {
            try {
                if (firstLoadingProducts == false) {
                    setLoadingProducts(true)
                }
                var url = `/products/research`
                if (search) {
                    url = `/products/research?q=${search}`
                }
                const produits = await fetchApi(url)
                setProducts(produits.result)
                console.log(products)
            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingProducts(false)
                setLoadingProducts(false)
            }
        })()
    }, [search])
 

    //POUR LES MENUS
    useEffect(() => {
        (async () => {
            try {
                if (firstLoadingMenus == false) {
                    setLoadingMenus(true)
                }
                var url = "/resto/menu/menu/research"
                if (search) {
                    url = `/resto/menu/menu/research?q=${search}`
                }
                console.log(url)
                const menus = await fetchApi(url)
                setMenus(menus.result)
                console.log(error)
            } finally {
                setFirstLoadingMenus(false)
                setLoadingMenus(false)
            }
        })()
    }, [search])

    return (
        <SearchContext.Provider value={contextValues}>
            <View style={styles.container}>
                <View style={styles.cardHeader}>
                    <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch( DrawerActions.toggleDrawer())}>
                        <View style={styles.menuOpenerLine} />
                        <View style={[styles.menuOpenerLine, { width: 15 }]} />
                        <View style={[styles.menuOpenerLine, { width: 25 }]} />
                    </TouchableOpacity>
                    {/* <EcommerceBadge /> */}
                </View>
                {/* <Text style={styles.titlePrincipal}>Liste des produits</Text> */}
     
      <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 5 }}>
                <TouchableOpacity  style={styles.searchSection} >
                    <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                    <Text style={styles.input}>{search?search:"Rechercher"}</Text>
                </TouchableOpacity>
                <View style={styles.cardRecherche}>
                    <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                </View>
            </View>
                <TopBar.Navigator
                   
                    screenOptions={{
                        tabBarStyle: styles.tabBar,
                        tabBarLabelStyle: {
                                  color: COLORS.ecommercePrimaryColor,
                                  textTransform: 'none',
                                  fontSize: 15
                        },
                        tabBarIndicatorStyle: {
                                  height: 3,
                                 backgroundColor: COLORS.ecommercePrimaryColor,
                        }
              }}
                >
                    <TopBar.Screen name='EcommerceResearchScreen' component={EcommerceResearchScreen}  initialParams={search} options={{ title: "E-commerce" }} />
                    <TopBar.Screen name='RestaurantResearchScreen' component={RestaurantResearchScreen} initialParams={search} options={{ title: "Restauration" }} />
                </TopBar.Navigator>
            </View>
            </SearchContext.Provider>
    )
}
const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
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
    cardOrginal: {
    },
    titlePrincipal: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      color: COLORS.ecommercePrimaryColor,
      marginHorizontal: 10
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
    container: {
        flex: 1,
    },
    image: {
        marginTop: 30,
        alignSelf: "center",
    },
    //   tabBar: {
    //             overflow: 'hidden',
    //             elevation: 0,
    //             marginHorizontal: 20,
    //   },
    // tabBar: {
    //     backgroundColor: COLORS.ecommercePrimaryColor,
    //     height: 50,
    //     maxHeight: 50,
    //     borderRadius: 50,
    //     paddingHorizontal: 0,
    //     paddingVertical: 0,
    //     paddingRight: 10,
    //     marginTop: 2,
    //     elevation: 10,
    //     shadowColor: '#c4c4c4',
    //     overflow: 'hidden',
    //     marginHorizontal: 10
    // },
    tabBar: {
        overflow: 'hidden',
        elevation: 0,
        marginHorizontal: 20,
},
    tabIndicator: {
        width: "90%",
        height: 5,
        backgroundColor: '#C0DDDD',
        position: 'absolute',
        top: 143,
        marginHorizontal: 20
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
})