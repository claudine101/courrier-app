import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from "../../../styles/COLORS"
import { useDispatch } from "react-redux";
import useFetch from '../../../hooks/useFetch'
import { addMenuAction } from "../../../store/actions/restaurantCartActions";


export default function AddCart({ menu, onClose, loadingForm }) {

        const [amount, setAmount] = useState(1)
        const [isFocused, setIsFocused] = useState(false)
        const dispatch = useDispatch()
        const [loadingVariants, variants] = useFetch(`/resto/menu/variants/${menu.produit.ID_RESTAURANT_MENU}`)
        const [selectedCombinaison, setSelectedCombinaison] = useState(null)
        const [selectedSize, setSelectedSize] = useState(null)

        /**
          * Contient  un tableau des valeurs des variantes qui sont sélectionnés
          */
        const [selectedValues, setSelectedValues] = useState([])

        const onChangeText = am => {
                setAmount(am)
        }

        const onAddToCart = () => {
                onClose()
                dispatch(addMenuAction(menu, amount, selectedCombinaison))
        }
        const onDecrementOther = () => {
                if (parseInt(amount) == 1) {
                        return false
                }
                if (parseInt(amount) <= 0) {
                        return 1
                }
                setAmount(l => parseInt(l) - 1)
        }

        const onIncrementOther = () => {
                if (amount == selectedCombinaison.QUANTITE) {
                        return false
                }
                setAmount(l => parseInt(l) + 1)
        }
        const checkAmount = useCallback(() => {
                setAmount(parseInt(amount) ? (parseInt(amount) >= selectedCombinaison.QUANTITE ? selectedCombinaison.QUANTITE : parseInt(amount)) : 1)
        }, [selectedCombinaison])

        let isnum = /^\d+$/.test(amount);

        const isValid = useCallback(() => {
                return isnum ? (parseInt(amount) > 0 && parseInt(amount) <= 100) : false
        }, [selectedCombinaison, amount])

        const isValueSelected = useCallback(idValue => {
                if (selectedValues.length > 0) {
                        const isThere = selectedValues.find(v => v.ID_VALUE == idValue)
                        return isThere ? true : false
                }
                return false
        }, [selectedValues])

        const handleValuePress = value => {
                if (isValueSelected(value.ID_VALUE)) return false
                const isVariantSelected = selectedValues.find(v => v.ID_VARIANT == value.ID_VARIANT)
                if (isVariantSelected) {
                        const removedVariant = selectedValues.filter(v => v.ID_VALUE != isVariantSelected.ID_VALUE)
                        setSelectedValues([...removedVariant, value])
                } else {
                        setSelectedValues(c => [...c, value])
                }
        }

        const getPrice = useCallback(() => {
                if (selectedCombinaison) {
                        return selectedCombinaison.PRIX
                }
                return menu.produit_partenaire.PRIX
        }, [selectedCombinaison])

        useEffect(() => {
                if (!loadingVariants) {
                        const combinaisons = variants.result.combinaisons
                        if (combinaisons && selectedValues.length > 0) {
                                const combinaison = combinaisons.find(comb => {
                                        const valueIds = comb.values.map(value => value.ID_VALUE);
                                        const selectedValuesIds = selectedValues.map(value => value.ID_VALUE)
                                        return valueIds.sort().toString() === selectedValuesIds.sort().toString();
                                })
                                setSelectedCombinaison(combinaison || null)
                        }
                }
        }, [loadingVariants, variants, selectedValues])
        useEffect(() => {
                if (!loadingVariants) {
                        const combinaisons = variants.result.combinaisons
                        if (combinaisons) {
                                const defaultCombinaison = combinaisons[0]
                                if (defaultCombinaison.values && defaultCombinaison.values.length > 0) {
                                        const variantsValues = [].concat(...variants.result.variants.map(variant => variant.values));
                                        const values = defaultCombinaison.values.map(value => {
                                                const otherKeys = variantsValues.find(v => v.ID_VALUE == value.ID_VALUE)
                                                return {
                                                        ...value,
                                                        ...otherKeys
                                                }
                                        })
                                        setSelectedValues(values)
                                }
                        }
                }
        }, [variants, loadingVariants])




        return (
                loadingForm ? <ActivityIndicator
                        animating
                        size={"small"}
                        color='#777'
                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                /> :
                        <View style={styles.container}>
                                <View style={styles.product}>
                                        <View style={styles.productImage}>
                                                <Image source={{ uri: menu.produit.IMAGE }} style={styles.image} />
                                        </View>
                                        <View style={styles.productDetails}>
                                                <Text numberOfLines={3} style={styles.productName}>
                                                        {menu.produit.NOM}
                                                </Text>
                                                <Text style={styles.productSeller}>
                                                        {menu.partenaire.NOM_ORGANISATION ? menu.partenaire.NOM_ORGANISATION : `${menu.partenaire.NOM} ${menu.partenaire.PRENOM}`}
                                                </Text>
                                                <Text style={styles.price}>
                                                        {getPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU
                                                </Text>
                                        </View>
                                </View>
                                {
                                        loadingVariants ? <View style={styles.loadingBlock}>
                                                <Text style={styles.loadingText}>Chargement</Text>
                                                <ActivityIndicator animating={true} size="small" style={{ marginLeft: 10 }} color='#777' />
                                        </View> :
                                                <>
                                                        <View style={styles.variantsSection}>
                                                                {variants.result.variants.length > 0 ? <View style={styles.variants}>
                                                                        {variants.result.variants.map((variant, index) => {
                                                                                return (
                                                                                        <View style={styles.variant} key={index}>
                                                                                                <Text style={styles.variantName}>{variant.VARIANT_NAME}</Text>
                                                                                                {variant.values && variant.values.length > 0 ? <View style={styles.variantValues}>
                                                                                                        {variant.values.map((value, index) => {
                                                                                                                return (
                                                                                                                        <TouchableOpacity
                                                                                                                                disabled={isValueSelected(value.ID_VALUE)}
                                                                                                                                key={index}
                                                                                                                                style={[styles.variantValue, index == 0 && { marginLeft: 0 }, isValueSelected(value.ID_VALUE) && { borderColor: 'blue' }]}
                                                                                                                                onPress={() => handleValuePress(value)}>
                                                                                                                                <Text style={styles.variantValueText}>{value.VALUE_NAME}</Text>
                                                                                                                        </TouchableOpacity>
                                                                                                                )
                                                                                                        })}
                                                                                                </View> : null}
                                                                                        </View>
                                                                                )
                                                                        })}
                                                                </View> : null}
                                                        </View>

                                                        {!selectedCombinaison ? <Text style={styles.noProductFeeback}>
                                                                Produit non disponible en stock pour le moment
                                                        </Text> :

                                                                <View style={styles.moreDetails}>
                                                                        <Text style={styles.avalaibleFeedback}>
                                                                                Disponible en stock: {selectedCombinaison.QUANTITE} pièce{selectedCombinaison.QUANTITE > 1 && 's'}
                                                                        </Text>
                                                                        <View style={styles.amountContainer}>
                                                                                <TouchableOpacity style={[styles.amountChanger, (amount <= 1 || !/^\d+$/.test(amount)) && { opacity: 0.5 }]} onPress={onDecrementOther} disabled={amount <= 1 || !/^\d+$/.test(amount)}>
                                                                                        <Text style={styles.amountChangerText}>-</Text>
                                                                                </TouchableOpacity>
                                                                                <TextInput
                                                                                        style={[styles.input, isFocused && { borderColor: COLORS.primary }]}
                                                                                        value={amount.toString()}
                                                                                        onChangeText={onChangeText}
                                                                                        onFocus={() => setIsFocused(true)}
                                                                                        onBlur={() => {
                                                                                                setIsFocused(false)
                                                                                                checkAmount()
                                                                                        }}
                                                                                        keyboardType="decimal-pad"
                                                                                />
                                                                                <TouchableOpacity
                                                                                        style={[styles.amountChanger, (!/^\d+$/.test(amount) || amount >= selectedCombinaison.QUANTITE) && { opacity: 0.5 }]}
                                                                                        onPress={onIncrementOther}
                                                                                        disabled={(!/^\d+$/.test(amount) || amount >= selectedCombinaison.QUANTITE)
                                                                                        }>
                                                                                        <Text style={styles.amountChangerText}>+</Text>
                                                                                </TouchableOpacity>
                                                                        </View>
                                                                        <TouchableOpacity style={[styles.addCartBtn, { opacity: !isValid() ? 0.5 : 1 }]} onPress={onAddToCart} disabled={!isValid()}>
                                                                                <Text style={styles.addCartBtnTitle}>Ajouter au panier</Text>
                                                                        </TouchableOpacity>
                                                                </View>}
                                                </>}
                        </View>
        )
}
const styles = StyleSheet.create({
        container: {
                padding: 10,
        },
        title: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10
        },
        product: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 100,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#F1F1F1'
        },
        productImage: {
                flex: 0.5,
                height: "100%"
        },
        image: {
                width: "100%",
                height: "100%",
                borderRadius: 10,
                resizeMode: 'contain'
        },
        productDetails: {
                flex: 1,
                marginLeft: 10
        },
        productName: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: "bold",
                fontSize: 15
        },
        productSeller: {
                color: COLORS.primary,
                fontSize: 13,
        },
        price: {
                color: COLORS.ecommerceRed,
                fontWeight: 'bold',
                fontSize: 16
        },
        moreDetails: {
                marginTop: 10
        },
        subTitle: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        sizes: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 5
        },
        size: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: '#F1F1F1',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10
        },
        color: {
                width: 100,
                height: 50,
                borderRadius: 10,
                backgroundColor: '#F1F1F1',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10
        },

        sizeText: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold',
                fontSize: 16
        },
        amountContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50
        },
        input: {
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ddd',
                flex: 1,
                height: "100%",
                marginHorizontal: 10,
                textAlign: 'center',
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        amountChanger: {
                width: 50,
                height: 50,
                backgroundColor: COLORS.ecommercePrimaryColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
        },
        amountChangerText: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20
        },
        addCartBtn: {
                marginTop: 15,
                borderRadius: 5,
                backgroundColor: COLORS.ecommerceOrange,
                paddingVertical: 15,
        },
        addCartBtnTitle: {
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold'
        },
        variantName: {
                fontWeight: 'bold',
                marginTop: 5
        },
        variantValues: {
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: 2
        },
        variantValue: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E1EAF3',
                marginLeft: 5
        },
        variantValueText: {
                fontSize: 13
        },
        loadingBlock: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10
        },
        loadingText: {
                color: '#777'
        },
        noProductFeeback: {
                fontSize: 12,
                marginTop: 10,
                color: 'red',
                fontWeight: "bold",
                opacity: 0.7
        },
        avalaibleFeedback: {
                color: '#777',
                fontSize: 12,
                marginBottom: 2
        }
})