import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar, Modal, ActivityIndicator } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from "moment/moment";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../styles/COLORS";
import fetchApi from "../../../helpers/fetchApi";
import Loading from "../../../components/app/Loading";
import EcommerceBadge from "../../../components/ecommerce/main/EcommerceBadge";
/**
 * un screen pour afficher tous les commentaires effectuees sur un menu
 * @author Innocent <ndayikenguerukiye.innocent@mediabox.bi>
 * @date 27/1/2023
 * @param {*} param0 
 * @returns 
 */
export default function AllNotesMenusScreen() {
    const route = useRoute()
    const { product } = route.params
    const navigation = useNavigation()
    const [menunote, setMenuNote] = useState([])
    const [loading, setLoading] = useState(true)
    moment.updateLocale('fr', {
        calendar: {
            sameDay: "[Aujourd'hui]",
            lastDay: '[Hier]',
            nextDay: 'DD-M-YYYY',
            lastWeek: 'DD-M-YYYY',
            sameElse: 'DD-M-YYYY',
        },
    })
    useEffect(() => {

        (async () => {
            try {
                var url = `/resto/restaurant_menus_notes?ID_RESTAURANT_MENU=${product.produit.ID_RESTAURANT_MENU}`
                const menusNotes = await fetchApi(url)
                setMenuNote(menusNotes.result)
                //console.log(menusNotes)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <>
            {loading && <Loading />}
            <View style={styles.cardHeader}>
                <TouchableNativeFeedback
                    style={{}}
                    onPress={() => navigation.goBack()}
                    background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                    <View style={styles.headerBtn}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableNativeFeedback>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableNativeFeedback
                        style={{}}
                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                        <View style={styles.headerBtn}>
                            <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                        </View>
                    </TouchableNativeFeedback>
                    <EcommerceBadge />
                </View>
            </View>
            <ScrollView>
                {menunote.map((note, index) => {
                    return (

                        <View key={index} style={{ marginTop: 15 }}>
                            <View style={styles.cardPrincipal}>
                                <View style={styles.cardNotes}>
                                    <AntDesign name="user" size={24} color="black" />
                                </View>
                                <View style={styles.description}>
                                    <View>
                                        <View >
                                            <Text style={{ fontWeight: "bold" }}>{note.NOM} {note.PRENOM}</Text>
                                        </View>
                                        <View style={styles.etoiles}>
                                            {new Array(5).fill(0).map((_, index) => {
                                                return (
                                                    <View key={index}  >
                                                        {note.NOTE < index + 1 ? <AntDesign name="staro" size={12} color="black" /> :
                                                            <AntDesign name="star" size={12} color="black" />}
                                                    </View>
                                                )
                                            })}
                                        </View>
                                        <View style={styles.cardDescription}>
                                            <View><Text>{note.COMMENTAIRE}</Text></View>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <View><Text>{moment(note.DATE_INSERTION).format('HH:mm')} </Text></View>

                                    </View>

                                </View>

                            </View>


                        </View>

                    )
                })
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    cardNotes: {
        width: 40,
        height: 40,
        backgroundColor: "#ddd",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    description: {
        marginLeft: 15,
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    cardPrincipal: {
        flexDirection: "row",

    },
    cardDescription: {
        marginTop: 5,

    },
    etoiles: {
        flexDirection: "row",
        flex: 1
    },
    titleModifier: {
        fontSize: 12,
        color: COLORS.primary,

    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60,
        backgroundColor: '#F1F1F1',
    },
    cardCommentaire: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})