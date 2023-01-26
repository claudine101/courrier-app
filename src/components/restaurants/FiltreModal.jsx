import React, { useCallback, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, Animated, BackHandler, TouchableOpacity, View, TextInput, Image, ScrollView, TouchableNativeFeedback } from "react-native";
import { Host, Portal } from 'react-native-portalize';
import { Modalize } from "react-native-modalize";
import { AntDesign, SimpleLineIcons, EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';

export default function FiltreModal({filtreRef}) {
        return (
                <TouchableNativeFeedback onPress={() => filtreRef.current.close()} style={styles.modalContent}>
                        <View style={styles.modalList}>
                                <View style={styles.modalItem}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <View></View>
                                                <Ionicons name="ios-close-circle" size={24} color="#EF4255" />
                                        </View>
                                        <View>
                                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Filtre de recherche</Text>
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Distance</Text>
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Temps de livraison</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                <View style={styles.cardMinute}>
                                                        <Text style={styles.TextMinute}>10 Min</Text>
                                                </View>
                                                <View style={styles.cardMinute2}>
                                                        <Text style={styles.TextMinute}>20 Min</Text>
                                                </View>
                                                <View style={styles.cardMinute}>
                                                        <Text style={styles.TextMinute}>30 Min</Text>
                                                </View>
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Prix</Text>
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Notez</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                <View style={styles.cardNote}>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>1</Text>
                                                                <AntDesign name="star" size={17} color="black" />
                                                        </View>
                                                </View>
                                                <View style={styles.cardNote}>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>2</Text>
                                                                <AntDesign name="star" size={17} color="black" />
                                                        </View>
                                                </View>
                                                <View style={styles.cardNote}>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>3</Text>
                                                                <AntDesign name="star" size={17} color="black" />
                                                        </View>
                                                </View>
                                                <View style={styles.cardNote4}>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>4</Text>
                                                                <AntDesign name="star" size={17} color="black" />
                                                        </View>
                                                </View>
                                                <View style={styles.cardNote}>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>5</Text>
                                                                <AntDesign name="star" size={17} color="black" />
                                                        </View>
                                                </View>
                                        </View>
                                        <TouchableOpacity style={{ ...styles.cardBouton, marginTop: 20 }}>
                                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: "bold" }}>Ajouter le filtre</Text>
                                        </TouchableOpacity>
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
        cardMinute: {
                height: 30,
                width: 100,
                borderRadius: 10,
                backgroundColor: '#D7D9E4',
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
        },
        cardMinute2: {
                height: 30,
                width: 100,
                borderRadius: 10,
                backgroundColor: '#EF4255',
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
        },
        cardNote: {
                height: 30,
                width: 50,
                borderRadius: 10,
                backgroundColor: '#D7D9E4',
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
        },
        cardNote4: {
                height: 30,
                width: 50,
                borderRadius: 10,
                backgroundColor: '#EF4255',
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
        },
        TextMinute: {
                position: "absolute",
                fontWeight: "bold"
        },
        cardBouton: {
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 25,
                backgroundColor: "#EE7526",
        },
})