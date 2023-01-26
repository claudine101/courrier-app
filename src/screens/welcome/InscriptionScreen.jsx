import React, { useRef, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { FontAwesome, Fontisto, EvilIcons, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import fetchApi from '../../helpers/fetchApi';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserAction } from "../../store/actions/userActions"
import { COLORS } from '../../styles/COLORS';
import { useForm } from '../../hooks/useForm';
import { useFormErrorsHandle } from '../../hooks/useFormErrorsHandle';
import Loading from '../../components/app/Loading';

export default function InscriptionScreen() {
        const dispatch = useDispatch()
        const navigation = useNavigation()
        const [loading, setLoading] = useState(false);
        const nomInputRef = useRef(null)
        const prenomInputRef = useRef(null)
        const emailInputRef = useRef(null)
        const passwordInputRef = useRef(null)
        const password_confirmInputRef = useRef(null)


        const [data, handleChange, setValue] = useForm({
                nom: "",
                prenom: "",
                email: "",
                password: "",
                password_confirm: ""
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
                email: {
                        required: true,
                        email: true
                },
                password: {
                        required: true,
                        length: [8]
                },
                password_confirm: {
                        required: true,
                        length: [8],
                        match: "password"
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
                email: {
                        required: "L'email est obligatoire",
                        email: "Email invalide"
                },
                password: {
                        required: "Le mot de passe est obligatoire",
                        length: "Mot de passe trop court"
                },
                password_confirm: {
                        required: "Ce champ est obligatoire",
                        length: "Mot de passe trop court",
                        match: "Les mots de passe ne correspondent pas"
                }
        })

        const enregistrement = async () => {
                setLoading(true)
                try {
                        const res = await fetchApi("/users", {
                                method: 'POST',
                                body: JSON.stringify({
                                        NOM: data.nom,
                                        PRENOM: data.prenom,
                                        EMAIL: data.email,
                                        PASSWORD: data.password
                                }),
                                headers: { "Content-Type": "application/json" },
                        })
                        await AsyncStorage.setItem("user", JSON.stringify(res.result));
                        dispatch(setUserAction(res.result));
                }
                catch (error) {
                        console.log(error)
                        if (error.httpStatus == "UNPROCESSABLE_ENTITY") {
                                setErrors({
                                        nom: error.result.NOM,
                                        prenom: error.result.PRENOM,
                                        email: error.result.EMAIL,
                                        password: error.result.PASSWORD
                                })
                        }
                } finally {
                        setLoading(false);
                }
        }

        return (
                <>
                        {loading && <Loading />}
                        <View style={styles.container}>
                                <ScrollView keyboardShouldPersistTaps="handled">
                                        <View>
                                                <View style={styles.cardTitle}>
                                                        <Text style={styles.Title}>Compte client</Text>
                                                        <Text style={styles.description}> Chap Chap</Text>
                                                </View>
                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Nom"
                                                                        fontSize={14}
                                                                        baseColor={COLORS.smallBrown}
                                                                        tintColor={COLORS.primary}
                                                                        containerStyle={{ borderRadius: 20 }}
                                                                        lineWidth={1}
                                                                        activeLineWidth={1}
                                                                        errorColor={COLORS.error}
                                                                        renderRightAccessory={() => <FontAwesome name="user-o" size={20} color={hasError('nom') ? COLORS.error : "#a2a2a2"} />}
                                                                        value={data.nom}
                                                                        onChangeText={(newValue) => handleChange('nom', newValue)}
                                                                        onBlur={() => checkFieldData('nom')}
                                                                        error={hasError('nom') ? getError('nom') : ''}
                                                                        onSubmitEditing={() => {
                                                                                prenomInputRef.current.focus()
                                                                        }}
                                                                        autoCompleteType='off'
                                                                        returnKeyType="next"
                                                                        blurOnSubmit={false}
                                                                />
                                                        </View>

                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Prénom"
                                                                        fontSize={14}
                                                                        baseColor={COLORS.smallBrown}
                                                                        tintColor={COLORS.primary}
                                                                        lineWidth={1}
                                                                        activeLineWidth={1}
                                                                        errorColor={COLORS.error}
                                                                        renderRightAccessory={() => <FontAwesome name="user-o" size={20} color={hasError('prenom') ? COLORS.error : "#a2a2a2"} />}
                                                                        value={data.prenom}
                                                                        onChangeText={(newValue) => handleChange('prenom', newValue)}
                                                                        onBlur={() => checkFieldData('prenom')}
                                                                        error={hasError('prenom') ? getError('prenom') : ''}
                                                                        ref={prenomInputRef}
                                                                        onSubmitEditing={() => {
                                                                                emailInputRef.current.focus()
                                                                        }}
                                                                        autoCompleteType='off'
                                                                        returnKeyType="next"
                                                                        blurOnSubmit={false}
                                                                />
                                                        </View>
                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Adresse email"
                                                                        fontSize={14}
                                                                        baseColor={COLORS.smallBrown}
                                                                        tintColor={COLORS.primary}
                                                                        lineWidth={1}
                                                                        activeLineWidth={1}
                                                                        errorColor={COLORS.error}
                                                                        renderRightAccessory={() => <Fontisto name="email" size={20} color={hasError('email') ? COLORS.error : "#a2a2a2"} />}
                                                                        value={data.email}
                                                                        onChangeText={(newValue) => handleChange('email', newValue)}
                                                                        onBlur={() => checkFieldData('email')}
                                                                        error={hasError('email') ? getError('email') : ''}
                                                                        ref={emailInputRef}
                                                                        onSubmitEditing={() => {
                                                                                passwordInputRef.current.focus()
                                                                        }}
                                                                        autoCompleteType='off'
                                                                        returnKeyType="next"
                                                                        blurOnSubmit={false}
                                                                />
                                                        </View>

                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Mot de passe"
                                                                        fontSize={14}
                                                                        baseColor={COLORS.smallBrown}
                                                                        tintColor={COLORS.primary}
                                                                        secureTextEntry
                                                                        lineWidth={1}
                                                                        activeLineWidth={1}
                                                                        errorColor={COLORS.error}
                                                                        renderRightAccessory={() => <EvilIcons name="lock" size={30} color={hasError('password') ? COLORS.error : "#a2a2a2"} />}
                                                                        value={data.password}
                                                                        onChangeText={(newValue) => handleChange('password', newValue)}
                                                                        onBlur={() => checkFieldData('password')}
                                                                        error={hasError('password') ? getError('password') : ''}
                                                                        ref={passwordInputRef}
                                                                        onSubmitEditing={() => {
                                                                                password_confirmInputRef.current.focus()
                                                                        }}
                                                                        autoCompleteType='off'
                                                                        returnKeyType="next"
                                                                        blurOnSubmit={false}
                                                                />
                                                        </View>

                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Confirmer le mot de passe"
                                                                        fontSize={14}
                                                                        baseColor={COLORS.smallBrown}
                                                                        tintColor={COLORS.primary}
                                                                        secureTextEntry
                                                                        lineWidth={1}
                                                                        activeLineWidth={1}
                                                                        errorColor={COLORS.error}
                                                                        renderRightAccessory={() => <EvilIcons name="lock" size={30} color={hasError('password_confirm') ? COLORS.error : "#a2a2a2"} />}
                                                                        value={data.password_confirm}
                                                                        onChangeText={(newValue) => handleChange('password_confirm', newValue)}
                                                                        onBlur={() => checkFieldData('password_confirm')}
                                                                        error={hasError('password_confirm') ? getError('password_confirm') : ''}
                                                                        ref={password_confirmInputRef}
                                                                />
                                                        </View>

                                                </View>

                                                {/* <View style={styles.inputCard}>
                                                                      <View>
                                                                                <OutlinedTextField
                                                                                          label="Numéro de téléphone"
                                                                                          keyboardType="phone-pad"
                                                                                          inputContainerStyle={{ paddingRight: 40 }}
                                                                                          baseColor="#a2a2a2"
                                                                                          tintColor="#1D8585"
                                                                                          onChangeText={(em) => setTelephone(em)}
                                                                                          value={telephone}
                                                                                />
                                                                      </View>
                                                                      <View style={styles.InputIcon}>
                                                                                <Ionicons name="ios-call-outline" size={24} color="#a2a2a2" />
                                                                      </View>

                                                            </View> */}

                                                {/* <View style={styles.inputCard}>
                                                                      <View>
                                                                                <OutlinedTextField
                                                                                          label="Adresse physique"
                                                                                          inputContainerStyle={{ paddingRight: 40 }}
                                                                                          baseColor="#a2a2a2"
                                                                                          tintColor="#1D8585"
                                                                                          onChangeText={(em) => setAdressePhysique(em)}
                                                                                          value={adressePhysique}
                                                                                />
                                                                      </View>
                                                                      <View style={styles.InputIcon}>
                                                                                <EvilIcons name="location" size={24} color="#a2a2a2" />
                                                                      </View>

                                                            </View> */}

                                                <TouchableWithoutFeedback
                                                        disabled={!isValidate()}
                                                        onPress={enregistrement}>
                                                        <View style={[styles.button, !isValidate() && { opacity: 0.5 }]}>
                                                                <Text style={styles.buttonText}>S'inscrire</Text>
                                                        </View>
                                                </TouchableWithoutFeedback>


                                                <TouchableOpacity onPress={() => navigation.navigate("Connexion")}>
                                                        <View style={styles.cardButton}>
                                                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#1D8585", textDecorationLine: "underline" }}> S'inscrire plus tard</Text>
                                                        </View>
                                                </TouchableOpacity>

                                        </View>
                                </ScrollView>
                        </View>
                </>
        )
}

const styles = StyleSheet.create({
        Title: {
                fontSize: 18,
                fontWeight: "bold"
        },
        description: {
                fontSize: 18,
                fontWeight: "bold",
                color: "#1D8585"
        },
        cardTitle: {
                flexDirection: "row",
                marginTop: 30,
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center"
        },
        inputCard: {
                marginHorizontal: 20,
                marginTop: 10
        },
        InputIcon: {
                position: "absolute",
                right: 15,
                marginTop: 15
        },
        button: {
                marginTop: 10,
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 10,
                backgroundColor: COLORS.primaryPicker,
                marginHorizontal: 20
        },
        buttonText: {
                color: "#fff",
                fontWeight: "bold",
                // textTransform:"uppercase",
                fontSize: 16,
                textAlign: "center"
        },
        cardButton: {
                marginBottom: 20,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 118
        },
        container: {
                flex: 1,
        },
        errorss: {
                fontSize: 12,
                color: "red"
        }
})