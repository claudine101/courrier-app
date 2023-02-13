import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar, Modal, ActivityIndicator } from "react-native"
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { COLORS } from "../../styles/COLORS";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useRoute } from "@react-navigation/native";
import Loading from "../../components/app/Loading";
import fetchApi from "../../helpers/fetchApi";
import { useNavigation } from "@react-navigation/native";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES";
/**
 * un Screen pour modifier les commentaires effectuees sur un produits
 * @author Innocent <ndayikengurukiye.innocent@mediabox.bi>
 * @date 8/2/2023
 * @param {*} param0 
 * @returns 
 */
export default function EditRatingScreen() {
    const route = useRoute()
    const navigation = useNavigation()
    const { userRating, SERVICE } = route.params
    const [note, setNote] = useState(userRating.NOTE)
    const [loading, setLoading] = useState(false)
    const [data, handleChange] = useForm({
        commentaire: userRating.COMMENTAIRE
    })
    const onSubmit = async () => {

        try {
            var url = `/ecommerce/ecommerce_produits_notes/${userRating.ID_NOTE}`
            if (SERVICE == IDS_SERVICE_CATEGORIES.resto) {
                url = `/resto/restaurant_menus_notes/${userRating.ID_NOTE}`
            }
            setLoading(true)
            const form = new FormData()
            form.append("COMMENTAIRE", data.commentaire)
            form.append("NOTE", note)

            const Notes = await fetchApi(url, {
                method: "PUT",
                body: form
            })
            if (SERVICE == IDS_SERVICE_CATEGORIES.resto) {
                navigation.navigate('RestaurantHomeScreen')

            } else if (SERVICE == IDS_SERVICE_CATEGORIES.ecommerce) {
                navigation.navigate('EcommerceHomeScreen')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {loading && <Loading />}
            <View style={styles.container}>
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

                <View style={styles.notes}>
                    {new Array(5).fill(0).map((_, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => setNote(index + 1)} style={styles.etoiles}>
                                {note < index + 1 ? <AntDesign name="staro" size={25} color={COLORS.primary} /> :
                                    <AntDesign name="star" size={25} color={COLORS.primary} />}
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <View style={styles.selectControl}>
                    <OutlinedTextField
                        label={"Commentaire"}
                        fontSize={13}
                        value={data.commentaire}
                        onChangeText={e => handleChange("commentaire", e)}
                        lineWidth={0.5}
                        activeLineWidth={0.5}
                        baseColor={COLORS.smallBrown}
                        tintColor={COLORS.primary}
                        containerStyle={{ flex: 1, marginTop: 25, }}
                        inputContainerStyle={{ borderRadius: 10 }}
                        multiline
                        autoFocus
                    />
                </View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={onSubmit} style={[styles.addBtn]}>
                        <Text style={[styles.addBtnText]}>Modifier</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )


}
const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60,
        backgroundColor: '#FFF',
    },
    headerBtn: {
        padding: 10
    },
    notes: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 10
    },

    etoiles: {
        marginLeft: 5,
        display: "flex",

    },
    actionContainer: {
        paddingHorizontal: 10
    },
    delete: {
        paddingHorizontal: 10
    },
    addBtn: {
        paddingVertical: 10,
        width: "100%",
        alignSelf: "center",
        backgroundColor: COLORS.ecommercePrimaryColor,
        borderRadius: 10,
        paddingVertical: 15,
        marginBottom: 10,
        marginTop: 10
    },
    addBtnText: {
        color: '#FFF',
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        flex: 1
    },
    selectControl: {
        flex: 1,
        paddingHorizontal: 10
    }
}

)