import React from "react"
import { Text, StyleSheet, View, ScrollView, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Image, StatusBar } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, FontAwesome, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector";
import { COLORS } from "../../styles/COLORS";
import { DrawerActions, useFocusEffect, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import fetchApi from "../../helpers/fetchApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { unsetUserAction } from "../../store/actions/userActions";


export default function DrawerContent({ state, navigation, descriptors }) {
          const [counts, setCounts] = useState({})
          const[restoCommandes, setRestoCommandes] = useState([])


          const user = useSelector(userSelector)
          const [showServiceCommands, setShowCommandService] = useState(false)
          const dispacth = useDispatch()

          const handlePress = (routeName) => {

                    navigation.navigate(routeName)

                    navigation.dispatch(DrawerActions.closeDrawer)
          }

          const onCommandeToggle = () => {
                    setShowCommandService(t => !t)
          }

          const onLogOut = async () => {
                    await AsyncStorage.removeItem('user')
                    dispacth(unsetUserAction())
          }

          const commandesResto = async ()=> {
                try{
                        const rep = await fetchApi("/commandes/restaurant/count",{
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                        })
                        setRestoCommandes(rep.result)
                }
                catch(error){
                        console.log(error)
                }
          }


          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        const response = await fetchApi("/ecommerce/ecommerce_commandes/commandes_counts", {
                                                  method: "GET",
                                                  headers: { "Content-Type": "application/json" },
                                        })
                                        setCounts(response.result)
                              } catch (error) {
                                        console.log(error)
                              }
                    })()
          }, []))


          return (
                    <View style={styles.drawerContent}>
                              <TouchableNativeFeedback>
                                        <View style={styles.connectedUser}>
                                                  <View style={styles.imageContainer}>
                                                            <Image source={require('../../../assets/images/user.png')} style={styles.image} />
                                                  </View>
                                                  <View style={styles.userNames}>
                                                            <Text style={styles.fullName} numberOfLines={1}>{user.NOM} {user.PRENOM}</Text>
                                                            <Text style={styles.email}>{user.EMAIL}</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.separator} />
                              <DrawerContentScrollView style={styles.drawerScroller}>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple(COLORS.handleColor)} onPress={() => handlePress('HomeScreen')}>
                                                  <View style={[{ borderRadius: 10, overflow: "hidden" }, (state.index == 0 || state.index == 1 || state.index == 2) && { backgroundColor: COLORS.handleColor }]}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="home" size={27} color="#777" />
                                                                      <Text style={[styles.drawerItemLabel]}>
                                                                                Accueil
                                                                      </Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')} onPress={onCommandeToggle}>
                                                  <View style={[{ borderRadius: 10, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                                                            <View style={styles.drawerItem}>
                                                                      <Feather name="shopping-cart" size={24} color="#777" />
                                                                      <Text style={[styles.drawerItemLabel]}>
                                                                                Commandes
                                                                      </Text>
                                                            </View>
                                                            {showServiceCommands ? <Ionicons name="caret-up" size={24} color="#777" /> :
                                                                      <Ionicons name="caret-down" size={24} color="#777" />}
                                                  </View>
                                        </TouchableNativeFeedback>
                                        {showServiceCommands && <View style={styles.services}>

                                                  <TouchableOpacity index={1} onPress={() => navigation.navigate('CommandeEmiseScreen', {serviceCategory:1})} style={[styles.service, (state.index == 4) && { backgroundColor: COLORS.handleColor }]}>
                                                            <Text style={[styles.serviceName, (state.index == 4) && { color: '#000' }]}>
                                                                      Achats de produits
                                                            </Text>
                                                            {counts.ecommerce && counts.ecommerce > 0 ? <View style={styles.actionBadge}>
                                                                      <Text style={styles.actionBadgeText}>
                                                                                { counts.ecommerce }
                                                                      </Text>
                                                            </View> : null}
                                                  </TouchableOpacity>
                                                  <TouchableOpacity index={2} onPress={() => navigation.navigate('RestaurantEmiseScreen', {serviceCategory:2})} style={[styles.service, (state.index == 5) && { backgroundColor: COLORS.handleColor }]}>
                                                            <Text style={[styles.serviceName, (state.index == 5) && { color: '#000' }]}>
                                                                      Restaurant
                                                            </Text>
                                                            {counts.resto && counts.resto > 0 ? <View style={styles.actionBadge}>
                                                                      <Text style={styles.actionBadgeText}>
                                                                                { counts.resto }
                                                                      </Text>
                                                            </View> : null}
                                                  </TouchableOpacity>

                                        </View>}
                                        <TouchableNativeFeedback useForeground  background={TouchableNativeFeedback.Ripple(COLORS.handleColor)} onPress={() => handlePress('WishlistTab')}>
                                                  <View style={[{ borderRadius: 10, overflow: "hidden" }, (state.index == 6) && { backgroundColor: COLORS.handleColor }]}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="hearto" size={24} color="#777" />
                                                                      <Text style={[styles.drawerItemLabel, (state.index == 6) && { color: '#777' }]}>
                                                                                Wishlist
                                                                      </Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>

                                        <View style={[styles.separator, { marginVertical: 20 }]} />
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <Feather name="menu" size={24} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Condition d'utilisation</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="setting" size={24} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Paramètres</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="infocirlceo" size={24} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Infos et assistance</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')} onPress={onLogOut}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <MaterialIcons name="logout" size={20} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Déconnexion</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </DrawerContentScrollView>
                    </View>
          )

}
const styles = StyleSheet.create({
          separator: {
                    height: 2,
                    width: "95%",
                    backgroundColor: COLORS.handleColor,
                    alignSelf: "center"
          },
          drawerContent: {
                    backgroundColor: '#FFF',
                    flex: 1,
                    marginTop: StatusBar.currentHeight,
          },
          connectedUser: {
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 15
          },
          imageContainer: {
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.handleColor,
                    borderRadius: 10,
                    padding: 5
          },
          image: {
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    resizeMode: "center"
          },
          userNames: {
                    marginLeft: 10,
                    flex: 1
          },
          fullName: {
                    fontWeight: "bold",
                    fontSize: 14,
                    maxWidth: "90%"
          },
          email: {
                    color: '#777',
                    fontSize: 13
          },
          drawerScroller: {
                    paddingHorizontal: 10
          },
          drawerItem: {
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    overflow: "hidden"
          },
          drawerItemLabel: {
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: '#777'
          },
          services: {
                    paddingLeft: 20
          },
          service: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    padding: 10,
                    borderRadius: 10,
                    overflow: 'hidden'
          },
          serviceImageContainer: {
                    width: 35,
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    borderColor: COLORS.handleColor,
                    borderWidth: 2
          },
          serviceImage: {
                    width: "100%",
                    height: "100%",
                    borderRadius: 10
          },
          serviceName: {
                    color: '#777',
                    marginLeft: 10,
                    fontSize: 13
          },

          actionBadge: {
                    minWidth: 20,
                    minHeight: 18,
                    backgroundColor: "red",
                    borderRadius: 100,
                    position: 'absolute',
                    right: 10,
                    // top: -9,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 3
          },
          actionBadgeText: {
                    color: '#FFF',
                    fontSize: 12,
                    marginTop: -2,
                    fontWeight: "bold"
          }
})