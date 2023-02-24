import React, { useCallback, useRef, useState } from "react";
import { Text, View, StatusBar, StyleSheet, ScrollView, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign, MaterialIcons, FontAwesome, SimpleLineIcons, Feather, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import CategoriesModilizeFiltres from "../../components/ecommerce/allProducts/CategoriesModilizeFiltres";
import { useEffect } from "react";
import { OutlinedTextField } from 'rn-material-ui-textfield'
import { useForm } from "../../hooks/useForm";
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import fetchApi from "../../helpers/fetchApi";

const OrdersFiltres = [
    {
        name: "Les moins chers",
        iconImage: <MaterialCommunityIcons name="check-decagram" size={24} color="black" />
    },
    {
        name: "Les plus chers",
        iconImage: <MaterialCommunityIcons name="bookmark-check" size={24} color="black" />
    },
    {
        name: "Les plus achetes",
        iconImage: <FontAwesome5 name="clipboard-check" size={24} color="black" />
    },
    {
        name: "Les Notes et revues",
        iconImage: <MaterialIcons name="grade" size={24} color="black" />
    },
    {
        name: "Les nouveautes",
        iconImage: <Ionicons name="ios-newspaper" size={24} color="black" />
    }
]

/**
 * Screens pour afficher les filtres par rapport des prix, categorie les plus cher, plus achettees et notes.... cote e-commerce
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 20/2/2023
 * @returns 
 */
export default function AllFiltersScreen() {
    const navigation = useNavigation()
    const categotiesModalizeRef = useRef()
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [data, handleChange] = useForm({
        minumum: "",
        maximum: "",
    })


    const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
        minumum: {
            required: true,
            length: [1, 11],
            number: true
        },
        maximum: {
            required: true,
            length: [1, 11],
            number: true
        }
    }, {
        minumum: {
            required: "Le prix minumun est obligatoire",
            length: "Prix invalide",
            number: 'Prix invalide'
        },
        maximum: {
            required: "Le prix maximum est obligatoire",
            length: "Prix invalide",
            number: 'Prix invalide'
        }
    })


    const checkFiltres = async (index) => {
        setSelected(index)
    }

    const sendInformation = () =>{
        var countFiltre = 0
        if(selected){
            countFiltre +=1
        }
        if(data.minumum){
            countFiltre +=1
        }
        if(data.maximum){
            countFiltre +=1
        }
        if(selectedCategory){
            countFiltre +=1
        }
        navigation.navigate("EcommerceHomeScreen", {order_by:selected, min_prix:data.minumum, max_prix:data.maximum, category:selectedCategory?.ID_CATEGORIE_PRODUIT, countFiltre})
    }

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                // setLoadingForm(false)
            })
            return () => {
                clearTimeout(timer)
            }
        }
    }, [isOpen])

    useEffect(() => {
        (async () => {
            try {
                const allCategorie = await fetchApi('/ecommerce/ecommerce_produits/ecommerce_produit_categorie')
                setCategories(allCategorie.result)
            }
            catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <>
            <ScrollView>
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
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.secionTitle}>Ordonne par</Text>
                    </View>
                    {OrdersFiltres.map((oders, index) => {
                        return (
                            <TouchableNativeFeedback
                                key={index}
                                onPress={() => checkFiltres(index+1)}>
                                <View style={styles.principal}>
                                    <View style={styles.iconsPrincipal}>
                                        {oders.iconImage}
                                    </View>
                                    <View style={styles.cardIcons}>
                                        <Text style={styles.filtres}>{oders.name}</Text>
                                        {selected == index+1 ? <Feather name="check" size={24} color="black" /> : null}
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    })}

                </View>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.secionTitle}>Prix</Text>
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label={"Prix minumum"}
                                fontSize={13}
                                value={data.minumum}
                                onChangeText={e => handleChange("minumum", e)}
                                // onBlur={() => {
                                //     checkFieldData('minumum')
                                // }}
                                // error={hasError('minumum') ? getError('minumum') : ''}
                                lineWidth={0.5}
                                activeLineWidth={0.5}
                                baseColor={COLORS.smallBrown}
                                tintColor={COLORS.primary}
                                containerStyle={{ flex: 1, marginTop: 15, }}
                                inputContainerStyle={{ borderRadius: 10 }}
                                keyboardType="decimal-pad"
                                suffix="FBU"
                            />
                            <View style={styles.cardSeparator}></View>

                            <OutlinedTextField
                                label={"Prix maximum"}
                                fontSize={13}
                                value={data.maximum}
                                onChangeText={e => handleChange("maximum", e)}
                                // onBlur={() => {
                                //     checkFieldData('maximum')
                                // }}
                                // error={hasError('maximum') ? getError('maximum') : ''}
                                lineWidth={0.5}
                                activeLineWidth={0.5}
                                baseColor={COLORS.smallBrown}
                                tintColor={COLORS.primary}
                                containerStyle={{ flex: 1, marginTop: 15, }}
                                inputContainerStyle={{ borderRadius: 10 }}
                                keyboardType="decimal-pad"
                                suffix="FBU"
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.selectControl}>
                    <TouchableOpacity style={styles.selectContainer} onPress={() => {
                        categotiesModalizeRef.current.open()
                        setIsOpen(true)
                    }}>
                        <View style={{}}>
                            <Text style={[styles.selectLabel]}>
                                Catégorie
                            </Text>
                            <Text style={[styles.selectedValue, { color: '#333' }]}>
                                {selectedCategory ? selectedCategory.NOM : 'Selectionner'}
                            </Text>
                        </View>
                        <EvilIcons name="chevron-down" size={30} color="#777" />
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <View style={styles.actionContainer}>
                <TouchableOpacity style={[styles.addBtn]} onPress={sendInformation}>
                    <Text style={[styles.addBtnText]}>Appliquer</Text>
                </TouchableOpacity>
            </View>
            <CategoriesModilizeFiltres
                categotiesModalizeRef={categotiesModalizeRef}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingVertical: 10,
    },
    filtres: {
        fontSize: 15,
        marginLeft: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10
    },
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

    secionTitle: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 17,
        fontWeight: "bold"
    },
    cardIcon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: "red"
    },
    principal: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    container: {
        flex: 1,
        marginHorizontal: 15
    },
    cardIcons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        paddingVertical: 10
    },
    iconsPrincipal: {
        // width: 30,
        // height: 30,
        // justifyContent: "center",
        // alignItems: "center",
        paddingVertical: 10
    },
    inputCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    cardSeparator: {
        padding: 5
    },
    selectControl: {
        paddingHorizontal: 10
    },
    selectContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // marginHorizontal: 10,
        backgroundColor: "#fff",
        padding: 13,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#777",
        marginVertical: 10
    },
    selectLabel: {
        color: '#777',
        fontSize: 13
    },
    actionContainer: {
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

})








