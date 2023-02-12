import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { COLORS } from '../../../styles/COLORS'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import fetchApi from '../../../helpers/fetchApi'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useForm } from '../../../hooks/useForm'
import Loading from '../../app/Loading'
import Rating from './Rating'
import { useRef } from 'react'
import { useCallback } from 'react'

/**
 * Permet d'afficher la noté d'un utilisateur ou de l'ajouter si ça n'en existe pas
 * @author Dukizwe Darcie <darcy@mediabox.bi>
 */
export default function UserProductRating({ productId, userRating, scrollRef }) {
          const navigation = useNavigation()
          const [note, setNote] = useState(null)
          const [data, handleChange] = useForm({
                    commentaire: "",
          })
          const [loading, setLoading] = useState(false)
          const [targetY, setY] = useState(0)

          const handleStartPress = rate => {
                    setNote(rate)
                    scrollRef.current.scrollTo({ y: targetY, animated: true });
          }

          const onSubmit = async () => {
                    try {
                              setLoading(true)
                              const form = new FormData()
                              form.append("COMMENTAIRE", data.commentaire)
                              form.append("ID_PRODUIT", productId)
                              form.append("NOTE", note)
                              const Notes = await fetchApi('/ecommerce/ecommerce_produits_notes', {
                                        method: "POST",
                                        body: form
                              })
                              navigation.navigate('EcommerceHomeScreen')

                    } catch (error) {
                              console.log(error)
                    }
                    finally {
                              setLoading(false)
                    }
          }

          const onDeletePress = async () => {
                    try {
                              setLoading(true)
                              await fetchApi(`/ecommerce/ecommerce_produits_notes/${userRating.ID_NOTE}`, {
                                        method: "DELETE",
                              })
                              navigation.navigate('EcommerceHomeScreen')
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoading(false)
                    }
          }
          return (
                    <View style={styles.container} onLayout={(event) => {
                              const layout = event.nativeEvent.layout;
                              setY(layout.y)
                    }}>
                              {loading && <Loading />}
                              <View style={styles.productsHeader}>
                                        <Text style={styles.title}>Votre avis</Text>
                              </View>
                              {userRating ? <View>
                                        <Rating rating={userRating} />
                                        <View style={styles.actions}>
                                                  <TouchableOpacity onPress={() => navigation.navigate('EditRatingScreen', { userRating })} style={styles.actionBtn}>
                                                            <AntDesign name="edit" size={13} color="#777" style={{ marginRight: 5 }} />
                                                            <Text style={styles.actionText}>
                                                                      Modifier
                                                            </Text>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity onPress={onDeletePress} style={[styles.actionBtn, { marginLeft: 10 }]}>
                                                            <MaterialIcons name="delete-outline" size={17} color="#777" style={{ marginRight: 5 }} />
                                                            <Text style={[styles.actionText]}>Supprimer</Text>
                                                  </TouchableOpacity>
                                        </View>
                              </View> :
                                        <>
                                                  <View style={styles.notes}>
                                                            {new Array(5).fill(0).map((_, index) => {
                                                                      return (
                                                                                <TouchableWithoutFeedback key={index} onPress={() => handleStartPress(index + 1)} style={styles.etoiles}>
                                                                                          {note < index + 1 ? <AntDesign name="staro" size={25} color="#777" /> :
                                                                                                    <AntDesign name="star" size={25} color={COLORS.primary} />}
                                                                                </TouchableWithoutFeedback>
                                                                      )
                                                            })}
                                                  </View>
                                                  {note ?
                                                            <View>
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
                                                                                          <Text style={[styles.addBtnText]}>Envoyer</Text>
                                                                                </TouchableOpacity>
                                                                      </View>
                                                            </View>
                                                            : null}
                                        </>}
                    </View>
          )
}

const styles = StyleSheet.create({
          productsHeader: {
                    paddingVertical: 10,
                    paddingHorizontal: 10
          },
          title: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold"
          },
          notes: {
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    paddingHorizontal: 10
          },
          etoileNote: {
                    flexDirection: "row"
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
          etoiles: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: 60,
                    paddingHorizontal: 10,
          },
          actionBtn: {
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
          },
          actionText: {
                    fontSize: 12,
                    color: '#333'
          },
          addBtnText: {
                    color: '#FFF',
                    fontWeight: "bold",
                    textAlign: "center",
          },
          selectControl: {
                    paddingHorizontal: 10
          },
          actions: {
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10
          }
})