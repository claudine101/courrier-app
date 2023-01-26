import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Image, useWindowDimensions, View } from 'react-native'
import { COLORS } from '../../../styles/COLORS'
import { AntDesign, SimpleLineIcons, EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RestoSubCategories({ menuListes, ajoutPanierRef, filtreRef }) {
        const [activendex, setActiveIndex] = useState(0)
        const { width } = useWindowDimensions()
        const [activeLayout, setActiveLaout] = useState({})
        const scrollViewRef = useRef();
        const navigation = useNavigation()

        return (
                <View style={{ marginTop: 10, marginHorizontal:10}}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:"space-between"}}>
                                {menuListes.map((menuListe, index) => {
                                        return (
                                                <View  key={index}>
                                                        <TouchableOpacity onPress={()=>navigation.push('MenuDetailScreen',{menuListe:menuListe})} style={styles.cardAchatDescription}>
                                                                <Image source={{ uri: menuListe.IMAGE }} style={styles.imageDescription} />
                                                        </TouchableOpacity>
                                                        <View style={{ flexDirection: "row", marginTop:5 }}>
                                                                <TouchableOpacity style={styles.cardLike}>
                                                                        <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={styles.cardLike2} onPress={() => ajoutPanierRef.current.open()}>
                                                                        <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                                </TouchableOpacity>
                                                        </View>
                                                        <View style={styles.titleName}>
                                                                <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 17, fontWeight: "bold", color: "#fff" }}>{menuListe.NOM_SOUS_CATEGORIE}</Text>
                                                        </View>
                                                        <Text style={{ color: "#000", fontWeight: "bold" }}>{menuListe.MONTANT} FBu</Text>

                                                </View>
                                        )
                                })}
                        </View>
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
        cardLike: {
                width: 35,
                height: 35,
                backgroundColor: "#FBD5DA",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
        },
        cardLike2: {
                width: 35,
                height: 35,
                backgroundColor: "#FBD5DA",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 8
        },
        titleName: {
                position: "absolute",
                marginTop: 130,
                marginLeft: 30,
        },
        imageDescription: {
                marginTop: 20,
                width: 150,
                height: 150,
                borderRadius:20
        },
})