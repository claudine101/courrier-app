import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import { COLORS } from '../../../styles/COLORS'

export default function SubCategories({ sousCategories, selectedItemSousCategories, selectedsousCategories }) {
        const [activendex, setActiveIndex] = useState(0)
        const { width } = useWindowDimensions()
        const [activeLayout, setActiveLaout] = useState({})
        const scrollViewRef = useRef();

        const onScroll = e => {
                // console.log(activeLayout, `subCategory_${selectedsousCategories?.ID_PRODUIT_SOUS_CATEGORIE}`)
                // const selectedWidth = activeLayout[`subCategory_${selectedsousCategories?.ID_PRODUIT_SOUS_CATEGORIE}`].width
                // const scrollY = selectedWidth
                // if(e.nativeEvent.contentOffset.x >= selectedWidth / 3) {
                //           console.log('yeah')
                //           const nextIndex = selectedsousCategories.index + 1
                //           const nextSousCategory = sousCategories[nextIndex]
                //           onPress(nextSousCategory, nextIndex)
                //           scrollViewRef?.current?.scrollTo({ x: scrollY, y: 0, animated: true })
                // scrollViewRef.current.scrollTo({
                //           x: selectedWidth,
                //           y: 0,
                //           animated: true,
                // })
                // } else {
                //           scrollViewRef?.current?.scrollTo({ x: e.nativeEvent.contentOffset.x - selectedWidth, y: 0, animated: true })
                // }
                // setActiveIndex(parseInt(e.nativeEvent.contentOffset.x / (selectedWidth / 3)))
        }

        const onPress = useCallback((souscategorie, index) => {
                selectedItemSousCategories({ ...souscategorie, index })
                var scrolllY = 0
                const passedSubCategories = sousCategories.filter((s, i) => i < index)
                passedSubCategories.forEach(subCategory => {
                        const passedWidth = activeLayout[`subCategory_${subCategory?.ID_PRODUIT_SOUS_CATEGORIE}`].width
                        const addition = index == 1 ? 10 : 5
                        const sub = index == sousCategories.length - 1 ? -3 : 0
                        scrolllY += passedWidth + addition + sub
                })
                // const selectedWidth = activeLayout[`subCategory_${souscategorie?.ID_PRODUIT_SOUS_CATEGORIE}`].width
                // const selectedY = activeLayout[`subCategory_${souscategorie?.ID_PRODUIT_SOUS_CATEGORIE}`].y
                // console.log(selectedY)
                scrollViewRef?.current?.scrollTo({ x: scrolllY, y: 0, animated: true })
                // scrollViewRef.current.scrollTo({
                //           x: selectedWidth,
                //           y: 0,
                //           animated: true,
                // })
        }, [activeLayout])
        useEffect(() => {
                scrollViewRef?.current?.scrollTo({ x: 0, y: 0, animated: true })
        }, [sousCategories])
        const lastSub = sousCategories[sousCategories.length - 1]
        const selectedWidth = activeLayout[`subCategory_${lastSub?.ID_PRODUIT_SOUS_CATEGORIE}`]?.width
        return (
                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                        <ScrollView
                                horizontal showsHorizontalScrollIndicator={false}
                                ref={scrollViewRef}
                                onScrollEndDrag={onScroll}
                                style={styles.subCategories}
                        >
                                {sousCategories.map((souscategorie, index) => {
                                        return (
                                                <TouchableWithoutFeedback onPress={() => onPress(souscategorie, index)} key={index}>
                                                        <View style={[styles.subCategory, index == 0 && { paddingLeft: 0 }]} onLayout={(event) => {
                                                                event.persist()
                                                                setActiveLaout(last => ({ ...last, [`subCategory_${souscategorie.ID_PRODUIT_SOUS_CATEGORIE}`]: event?.nativeEvent?.layout }))
                                                        }}>
                                                                <Text style={[styles.subCategoryTitle, { opacity: souscategorie.ID_PRODUIT_SOUS_CATEGORIE == selectedsousCategories?.ID_PRODUIT_SOUS_CATEGORIE ? 1 : 0.3 }]}>{souscategorie.NOM_SOUS_CATEGORIE}</Text>
                                                        </View>
                                                </TouchableWithoutFeedback>
                                        )
                                })}
                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        subCategories: {
                paddingVertical: 10
        },
        selectedSubCategoryUnderline: {
                height: 5,
                width: 80,
                backgroundColor: COLORS.error,
                position: 'absolute',
                left: 10,
                bottom: 0,
                borderRadius: 5,
        },
        subCategory: {
                paddingHorizontal: 10
        },
        subCategoryTitle: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: '700'
        },
})