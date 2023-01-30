import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialCommunityIcons   } from '@expo/vector-icons';
import moment from "moment/moment";
import { COLORS } from "../../../styles/COLORS"

/**
 * un composant pour afficher tous les commentaires effectuees sur un produits
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 27/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function NotesEcommerce({ allNotes }) {
        moment.updateLocale('fr', {
                calendar: {
                        sameDay: "[Aujourd'hui]",
                        lastDay: '[Hier]',
                        nextDay: 'DD-M-YYYY',
                        lastWeek: 'DD-M-YYYY',
                        sameElse: 'DD-M-YYYY',
                },
        })

        return (
                <>
                        {allNotes.map((note, index) => {
                                return (
                                        <View style={styles.container} key={index}>
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
                                                                        <TouchableOpacity style={{ marginTop: 8 }}>
                                                                                <Text style={styles.titleModifier}>Modifier votre avis</Text>
                                                                        </TouchableOpacity>


                                                                </View>
                                                                <View style={{justifyContent:"center", alignItems:"center"}}>
                                                                        <View><Text>{moment(note.DATE_INSERTION).format('HH:mm')} </Text></View>
                                                                        <TouchableOpacity style={{marginTop:10}}>
                                                                                <AntDesign name="delete" size={24} color="black" />
                                                                        </TouchableOpacity>
                                                                </View>

                                                        </View>

                                                </View>


                                        </View>
                                )
                        })
                        }
                </>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                marginTop: 10
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
                // alignItems: "center"
        },
        cardDescription: {
                marginTop: 5,
                // padding: 5,
        },
        etoiles: {
                flexDirection: "row",
                flex: 1
        },
        titleModifier: {
                fontSize: 12,
                color: COLORS.primary,

        },
        cardCommentaire: {
                flexDirection: "row",
                justifyContent: "space-between",
        }
})