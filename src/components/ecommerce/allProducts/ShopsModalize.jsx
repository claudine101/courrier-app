import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { SimpleLineIcons, AntDesign, Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';

export default function ShopsModalize({ restos, restosModalizeRef, selectedResto, setSelectedResto, loadingForm, setLoadingForm, loadingRestos, setIsRestoOpen }) {
          return (
                    <Modalize
                              ref={restosModalizeRef}
                              adjustToContentHeight
                              handlePosition='inside'
                              modalStyle={{
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        paddingVertical: 20
                              }}
                              handleStyle={{ marginTop: 10 }}
                              scrollViewProps={{
                                        keyboardShouldPersistTaps: "handled"
                              }}
                              onClosed={() => {
                                        setIsRestoOpen(false)
                                        setLoadingForm(true)
                              }}
                    >
                              {(loadingForm || loadingRestos) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                              <View style={styles.modalContainer}>
                                        <View style={styles.modalHeader}>
                                                  <Text style={styles.modalTitle}>Les boutiques</Text>
                                                  {false && <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                      <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </TouchableOpacity>
                                                  </View>}
                                        </View>
                                        {restos.map((shop, index) => {
                                                  return (
                                                            <TouchableNativeFeedback onPress={() => {
                                                                      setSelectedResto(shop)
                                                                      restosModalizeRef.current.close()
                                                            }} key={index.toString()}>
                                                                      <View style={[styles.modalItem, selectedResto && shop.ID_PARTENAIRE_SERVICE == selectedResto.ID_PARTENAIRE_SERVICE && { backgroundColor: '#ddd' }]} >
                                                                                <View style={styles.modalImageContainer}>
                                                                                          <Image style={styles.modalImage} source={{ uri: shop.LOGO }} />
                                                                                </View>
                                                                                <View style={styles.shopDetails}>
                                                                                          <Text style={styles.itemTitle}>{shop.NOM_ORGANISATION}</Text>
                                                                                          {shop.categories && shop.categories[0] ? <Text style={styles.category}>{shop.categories[0].NOM}</Text> : null}
                                                                                </View>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                  )
                                        })}
                              </View>}
                    </Modalize>
          )
}

const styles = StyleSheet.create({
          modalTitle: {
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 16
          },
          modalHeader: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    paddingVertical: 5
          },
          modalItem: {
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F1F1F1'
          },
          modalImageContainer: {
                    width: 60,
                    height: 60,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 60,
                    justifyContent: "center",
                    alignItems: "center"
          },
          modalImage: {
                    width: "85%",
                    height: "85%",
                    resizeMode: "center",
                    borderRadius: 100,
          },
          shopDetails:  {
                    marginLeft: 10
          },
          itemTitle: {
          },
          category: {
                    color: '#777'
          }
})