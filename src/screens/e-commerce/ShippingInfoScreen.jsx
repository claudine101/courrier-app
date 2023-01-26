import React from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, useWindowDimensions, View } from "react-native";
import { COLORS } from "../../styles/COLORS";
import { FontAwesome, Fontisto, EvilIcons, Feather, Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useForm } from "../../hooks/useForm";
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import { useRef } from "react";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ShippingInfoScreen() {

          const navigation = useNavigation()
          const route = useRoute()
          const { service } = route.params

          const [data, handleChange] = useForm({
                    nom: "",
                    prenom: "",
                    address: "",
                    tel: ""
          })
          const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                    nom: {
                              required: true,
                              length: [1, 50]
                    },
                    prenom: {
                              required: true,
                              length: [1, 50]
                    },
                    address: {
                              required: true,
                              length: [1, 100]
                    },
                    tel: {
                              required: true,
                              length: [8, 8]
                    }
          }, {
                    nom: {
                              required: 'Le nom est obligatoire',
                              length: "Nom invalide"
                    },
                    prenom: {
                              required: 'Le prénom est obligatoire',
                              length: "Prénom invalide"
                    },
                    address: {
                              required: "L'addresse est obligatoire",
                              length: "Adresse invalide"
                    },
                    tel: {
                              required: "Le numéro de téléphone est obligatoire",
                              length: "Numéro de téléphone invalide"
                    },
          })
          const nomInputRef = useRef(null)
          const prenomInputRef = useRef(null)
          const telInputRef = useRef(null)

          return (
                    <View style={styles.container}>
                              <ScrollView keyboardShouldPersistTap="handled">
                                        <View style={styles.cardHeader}>
                                                  <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c9c5c5', true)} onPress={() => navigation.goBack()}>
                                                            <View style={styles.headerBtn}>
                                                                      <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                                        <View style={styles.header}>
                                                  <Text style={styles.title}>
                                                            Livraison
                                                  </Text>
                                                  <Text style={styles.titleDesc}>
                                                            Soyez sincère en complètant ce formulaire
                                                  </Text>
                                        </View>
                                        <View style={styles.form}>
                                                  <View style={styles.formSection}>
                                                            <Text style={styles.formSectionTitle}>
                                                                      Localisation
                                                            </Text>
                                                            <Image source={require("../../../assets/images/map.png")} style={styles.map} />
                                                            <OutlinedTextField
                                                                      label="Adresse"
                                                                      fontSize={12}
                                                                      baseColor={COLORS.smallBrown}
                                                                      tintColor={COLORS.primary}
                                                                      lineWidth={0.5}
                                                                      activeLineWidth={0.5}
                                                                      errorColor={COLORS.error}
                                                                      renderRightAccessory={() => <FontAwesome5 name="map-pin" size={20} color={hasError('address') ? COLORS.error : "#a2a2a2"} />}
                                                                      value={data.address}
                                                                      onChangeText={(newValue) => handleChange('address', newValue)}
                                                                      onBlur={() => checkFieldData('address')}
                                                                      error={hasError('address') ? getError('address') : ''}
                                                                      onSubmitEditing={() => {
                                                                                nomInputRef.current.focus()
                                                                      }}
                                                                      autoCompleteType='off'
                                                                      returnKeyType="next"
                                                                      blurOnSubmit={false}
                                                                      containerStyle={{ 
                                                                                marginTop: 0
                                                                      }}
                                                            />
                                                  </View>
                                                  <View style={styles.formSection}>
                                                            <Text style={styles.formSectionTitle}>
                                                                      Identification
                                                            </Text>
                                                            <OutlinedTextField
                                                                      label="Nom"
                                                                      fontSize={12}
                                                                      baseColor={COLORS.smallBrown}
                                                                      tintColor={COLORS.primary}
                                                                      lineWidth={0.5}
                                                                      activeLineWidth={0.5}
                                                                      errorColor={COLORS.error}
                                                                      renderRightAccessory={() => <FontAwesome name="user-o" size={20} color={hasError('nom') ? COLORS.error : "#a2a2a2"} />}
                                                                      value={data.nom}
                                                                      onChangeText={(newValue) => handleChange('nom', newValue)}
                                                                      onBlur={() => checkFieldData('nom')}
                                                                      error={hasError('nom') ? getError('nom') : ''}
                                                                      ref={nomInputRef}
                                                                      onSubmitEditing={() => {
                                                                                prenomInputRef.current.focus()
                                                                      }}
                                                                      autoCompleteType='off'
                                                                      returnKeyType="next"
                                                                      blurOnSubmit={false}
                                                                      containerStyle={{ 
                                                                                marginTop: 15
                                                                      }}
                                                            />
                                                            <OutlinedTextField
                                                                      label="Prénom"
                                                                      fontSize={12}
                                                                      baseColor={COLORS.smallBrown}
                                                                      tintColor={COLORS.primary}
                                                                      lineWidth={0.5}
                                                                      activeLineWidth={0.5}
                                                                      errorColor={COLORS.error}
                                                                      renderRightAccessory={() => <FontAwesome name="user-o" size={20} color={hasError('prenom') ? COLORS.error : "#a2a2a2"} />}
                                                                      value={data.prenom}
                                                                      onChangeText={(newValue) => handleChange('prenom', newValue)}
                                                                      onBlur={() => checkFieldData('prenom')}
                                                                      error={hasError('prenom') ? getError('prenom') : ''}
                                                                      ref={prenomInputRef}
                                                                      onSubmitEditing={() => {
                                                                                telInputRef.current.focus()
                                                                      }}
                                                                      autoCompleteType='off'
                                                                      returnKeyType="next"
                                                                      blurOnSubmit={false}
                                                                      containerStyle={{ 
                                                                                marginTop: 10
                                                                      }}
                                                            />
                                                            <OutlinedTextField
                                                                      label="Numéro de téléphone"
                                                                      fontSize={12}
                                                                      baseColor={COLORS.smallBrown}
                                                                      tintColor={COLORS.primary}
                                                                      lineWidth={0.5}
                                                                      activeLineWidth={0.5}
                                                                      errorColor={COLORS.error}
                                                                      renderRightAccessory={() => <AntDesign name="phone" size={24} color={hasError('tel') ? COLORS.error : "#a2a2a2"} />}
                                                                      value={data.tel}
                                                                      onChangeText={(newValue) => handleChange('tel', newValue)}
                                                                      onBlur={() => checkFieldData('tel')}
                                                                      error={hasError('tel') ? getError('tel') : ''}
                                                                      ref={telInputRef}
                                                                      // onSubmitEditing={() => {
                                                                      //           addressInputRef.current.focus()
                                                                      // }}
                                                                      autoCompleteType='off'
                                                                      // returnKeyType="next"
                                                                      keyboardType="number-pad"
                                                                      // blurOnSubmit={false}
                                                                      containerStyle={{ 
                                                                                marginTop: 10
                                                                      }}
                                                            />
                                                  </View>
                                        </View>
                                        <View style={styles.navigation}>
                                                  <TouchableNativeFeedback useForeground disabled={!isValidate()} onPress={() => navigation.navigate('PaymentScreen', { shipping_info: data, service })}>
                                                            <View style={[styles.nextBtn, !isValidate() && { opacity: 0.5 }]}>
                                                                      <Text style={[styles.navigationBtnText]}>
                                                                                Suivant
                                                                      </Text>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                              </ScrollView>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          title: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    fontSize: 22,
                    paddingLeft: 10,
                    paddingRight: 50,
                    lineHeight: 33
          },
          header: {
                    marginBottom: 20,
          },
          titleDesc: {
                    color: '#777',
                    paddingHorizontal: 10,
                    fontSize: 13
          },
          form: {
                    paddingHorizontal: 10
          },
          formSection: {
                    marginTop: 15
          },
          formSectionTitle: {
                    color: '#000',
                    fontSize: 15,
                    opacity: 0.7,
                    fontWeight: "bold"
          },
          map: {
                    height: 100,
                    width: "100%",
                    borderRadius: 10,
                    resizeMode: "cover",
                    marginVertical: 10,
                    marginTop: 10,
                    marginBottom: 20
          },
          navigation: {
                    flexDirection: "row",
                    justifyContent: 'center',
                    paddingHorizontal: 40,
                    marginVertical: 10,
          },
          nextBtn: {
                    paddingVertical: 20,
                    minWidth: 200,
                    overflow: "hidden",
                    backgroundColor: COLORS.ecommerceOrange,
                    borderRadius: 30
          },
          navigationBtnText: {
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#FFF"
          },
          cancelBtn: {
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#ddd',
                    overflow: "hidden"
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
          },
          headerBtn: {
                    padding: 10
          },
})