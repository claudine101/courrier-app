import React, { useCallback, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, Animated, BackHandler, TouchableOpacity, View, TextInput, Image, ScrollView, TouchableNativeFeedback } from "react-native";
import { Host, Portal } from 'react-native-portalize';
import { Modalize } from "react-native-modalize";
import { AntDesign, SimpleLineIcons, EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';

export default function AjoutPanierModalize({product,ajoutPanierRef}) {
        return (
                <TouchableNativeFeedback style={styles.modalContent} onPress={() => ajoutPanierRef.current.close()}>
                        <View style={styles.modalList}>
                                <View style={styles.modalItem}>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                <Image source={require('../../../assets/restaurant/cheesePizza.png')} style={styles.imageModal}/>

                                        </View>
                                        <ScrollView keyboardShouldPersistTaps="handled">
                                                <View>
                                                        <View >
                                                                <Text numberOfLines={1} style={{ fontSize: 25, fontWeight: "bold", color: "#777" }} >Riz Tropical</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                                                <View>
                                                                        <Entypo name="star-outlined" size={24} color="black" />
                                                                </View>
                                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                                                        <View>
                                                                                <Ionicons name="ios-time-outline" size={24} color="black" />
                                                                        </View>
                                                                        <Text>30 min</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>12 000 Fbu</Text>
                                                                </View>
                                                        </View>
                                                        <View style={{ marginTop: 15 }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Riz frit avec pomme de terre</Text>
                                                        </View>
                                                        <View style={{ marginTop: 20 }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Nombre de piat</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                                <TouchableOpacity style={styles.cardSigne}>
                                                                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>-</Text>

                                                                </TouchableOpacity>
                                                                <View style={styles.cardInput}>
                                                                        <TextInput style={{ textAlign: 'center' }}></TextInput>

                                                                </View>
                                                                <TouchableOpacity style={styles.cardSigne}>
                                                                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>+</Text>

                                                                </TouchableOpacity>
                                                        </View>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: 20 }}>
                                                                <View style={styles.cardIcon}>
                                                                        <AntDesign name="sharealt" size={20} color="black" />
                                                                </View>
                                                                <View style={styles.cardIcon}>
                                                                        <AntDesign name="shoppingcart" size={20} color="black" />
                                                                </View>
                                                                <TouchableOpacity style={styles.cardBouton}>
                                                                        <Text style={{ textAlign: 'center', color: 'white', }}>Ajouter au panier</Text>
                                                                </TouchableOpacity>
                                                        </View>
                                                </View>
                                        </ScrollView>

                                </View>
                        </View>
                </TouchableNativeFeedback>
        )
}

const styles = StyleSheet.create({
        modalContent: {
                paddingBottom: 20,
        },
        modalItem: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginTop: 5,
                marginHorizontal: 10
        },
        cardSigne: {
                padding: 15,
                height: 50,
                width: 50,
                color: "#1D8585",
                backgroundColor: '#242F68',
                borderRadius: 10,
                // marginTop: 1,
        },
        
        cardInput: {
                padding: 15,
                height: 50,
                width: 155,
                borderWidth: 2,
                borderColor: '#D8D8D8',
                borderRadius: 10,
                // marginTop: 1,
        },
        cardIcon: {
                padding: 15,
                height: 50,
                width: 50,
                color: "#1D8585",
                backgroundColor: '#D7D9E4',
                borderRadius: 10,
                // marginTop: 1,
        },
        cardBouton: {
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 25,
                backgroundColor: "#EE7526",
        },
        imageModal: {
                marginTop: 10,
                width: 150,
                height: 150,
        },
})