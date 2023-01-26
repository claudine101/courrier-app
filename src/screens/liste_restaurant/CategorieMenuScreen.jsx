import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, StatusBar,TouchableWithoutFeedback, ActivityIndicator, TouchableNativeFeedback, TextInput, ScrollView } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import Menu from "../../components/restaurants/main/Menu";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import fetchApi from "../../helpers/fetchApi";

/**
 * les screens pour afficher tous les categories details
 * @author Vanny Boy <vanny@mediabox.bi>
 * @author 24/1/2023
 * @returns 
 */

export default function CategorieMenuScreen() {

    const navigation = useNavigation()
    const route = useRoute()
    // const { categories } = route.params

    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(true)


    useEffect(() => {
        (async () => {
            try {
                const reponse = await fetchApi("/resto/menu/categories", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                setCategories(reponse.result)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoadingCategories(false)
            }
        })()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <TouchableNativeFeedback
                    style={{}}
                    onPress={() => navigation.goBack()}
                    background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                    <View style={{ padding: 10 }}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableNativeFeedback>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                        <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                    </TouchableOpacity>
                    <EcommerceBadge />
                </View>
            </View>

            <ScrollView>

                {loadingCategories ? <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator animating={true} size="large" color={"black"} />
                </View> :

                    <View style={styles.resto}>
                        {categories.map((categorie, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => navigation.navigate('MenuScreen', {
                                        categorie
                                    })} key={index}
                                >
                                    <View style={{ ...styles.category, margin: 15 }} >
                                        <View style={styles.categoryPhoto}>
                                            <ImageBackground source={{ uri: categorie.IMAGE }} borderRadius={15} style={styles.categoryImage}>
                                            </ImageBackground>
                                        </View>
                                        <Text style={[{ fontSize: 14, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </View>}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    categoryPhoto: {
        backgroundColor: COLORS.skeleton,
        width: 80,
        height: 70,
        borderRadius: 8,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resto: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    actionIcon: {
        borderRadius: 15,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    categoryModel: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    category: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        marginTop: 5,
        backgroundColor: "#F5F4F1",

    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },

    input: {
        flex: 1,
        marginLeft: 10
    },
})