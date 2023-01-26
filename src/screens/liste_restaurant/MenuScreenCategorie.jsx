import React, { useCallback, useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, StatusBar, TextInput, ScrollView } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import Menu from "../../components/restaurants/main/Menu";
import { Modalize } from "react-native-modalize";
import fetchApi from "../../helpers/fetchApi";

export default function MenuScreenCategorie() {
    const navigation = useNavigation()
    const MenumodalizeRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [select, setSelect] = useState(null)
    const route = useRoute()
    const categorie = route.params
    //console.log(categorie.categorie.NOM)
    const [menus, setMenus] = useState([])

    // const route = useRoute()
    const openmodalize = () => {
        setIsOpen(true)
        MenumodalizeRef.current?.open()
    }

    const selectedMenu = (categorie) => {
        MenumodalizeRef.current?.close()
        //console.log(categorie)
        setSelect(categorie)
    }

    useEffect(() => {
        (async () => {
            try {

                const reponse = await fetchApi(`/resto/menu/categories`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                setCategories(reponse.result)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                var url = "/resto/menu"
                if (select) {
                    url = `/resto/menu?category=${select?.ID_CATEGORIE_MENU}`
                }
                const menus = await fetchApi(url)
                setMenus(menus.result)
            }
            catch (error) {
                console.log(error)
            }
        })()
    }, [select])

    return (
        <>
            <View>
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
                <TouchableOpacity onPress={openmodalize} style={styles.modelCard} >

                    <Text style={styles.inputText}>{select ? select.NOM : categorie.categorie.NOM}</Text>
                    <AntDesign name="caretdown" size={16} color="#777" />


                </TouchableOpacity>




                <ScrollView>
                    {menus.length == 0 ? <View style={styles.notMenu}>
                        <Text style={styles.textNotFound}>Aucun menu trouvez</Text>
                    </View> :
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
                        </View>}
                </ScrollView>


            </View>

            <Modalize
                ref={MenumodalizeRef}
                adjustToContentHeight
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}
                onClosed={() => {
                    setIsOpen(false)
                    // handleChange('menu', "")
                    // setLoadingForm(true)
                }}
            >
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Les categories</Text>


                <ScrollView>
                    <View >
                        {categories.map((categorie, index) => {
                            return (
                                <TouchableOpacity style={styles.modalItem} key={index} onPress={() => selectedMenu(categorie)}>
                                    <View style={styles.categoryPhoto}>
                                        <Image source={{ uri: categorie.IMAGE }} style={styles.DataImageCategorie} />
                                    </View>
                                    <View style={styles.cardName}>
                                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor }}>{categorie.NOM}</Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </Modalize>


        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,


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
    cardName: {
        marginLeft: 10
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    DataImageCategorie: {
        borderRadius: 10,
        width: "65%",
        height: "65%"

    },
    notMenu: {
        padding: 5,
        marginTop: 10,
        marginHorizontal: 10
    },
    textNotFound: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#777"
    }

})