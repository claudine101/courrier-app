import React, {  } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment/moment";
import { COLORS } from "../../../styles/COLORS"

/**
 * un composant pour afficher tous les commentaires effectuees sur un produits
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 27/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function Rating({ rating, index }) {
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
                              <View style={[styles.container, { marginTop: index > 0 ? 10 : 0 }]}>
                                        <View style={styles.header}>
                                                  <View style={styles.userCard}>
                                                            <AntDesign name="user" size={24} color="#777" />
                                                  </View>
                                                  <View style={{ flex: 1, marginLeft: 10  }}>
                                                            <View style={styles.usernameDate}>
                                                                      <Text style={{ fontWeight: "bold", opacity: 0.8 }}>{rating.NOM} {rating.PRENOM}</Text>
                                                                      <Text style={styles.date}>{moment(rating.DATE_INSERTION).format('DD/MM/YYYY HH:mm')} </Text>
                                                            </View>
                                                            <View style={styles.etoiles}>
                                                                      {new Array(5).fill(0).map((_, index) => {
                                                                                return (
                                                                                          <View key={index}  style={{ marginTop: 2}}>
                                                                                                    {rating.NOTE < index + 1 ? <AntDesign name="staro" size={15} color={COLORS.primary} style={{ marginLeft: index > 0 ? 5 : 0 }} /> :
                                                                                                              <AntDesign name="star" size={15} color={COLORS.primary} style={{ marginLeft: index > 0 ? 5 : 0 }} />}
                                                                                          </View>
                                                                                )
                                                                      })}
                                                            </View>
                                                  </View>
                                        </View>
                                        {rating.COMMENTAIRE && rating.COMMENTAIRE.trim() != '' ? <Text style={styles.comment}>{rating.COMMENTAIRE}</Text> : null}
                              </View>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    paddingHorizontal: 10
          },
          userCard: {
                    width: 40,
                    height: 40,
                    backgroundColor: "#F1F1F1",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center"
          },
          header: {
                    justifyContent: "space-between",
                    flexDirection: "row"
          },
          etoiles: {
                    flexDirection: "row",
                    flex: 1
          },
          comment: {
                    lineHeight: 18,
                    fontSize: 13,
                    color: '#777',
                    marginTop: 5
          },
          date: {
                    color: '#777',
                    fontSize: 12
          },
          usernameDate: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
          }
})