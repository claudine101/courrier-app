import React, { useRef, useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { FontAwesome, Fontisto, EvilIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../store/actions/userActions"
import { COLORS } from '../../styles/COLORS';
import { useForm } from '../../hooks/useForm';
import { useFormErrorsHandle } from '../../hooks/useFormErrorsHandle';
import Loading from '../../components/app/Loading';


export default function ConnexionScreen() {
          const navigation = useNavigation()
          const dispatch = useDispatch()
          const [showPassword, setShowPassword] = useState(false)
          const [loading, setLoading] = useState(false);
          const passwordInputRef = useRef(null)

          const [data, handleChange, setValue] = useForm({
                    email: "",
                    password: "",
          })
          const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                    email: {
                              required: true,
                              email: true
                    },
                    password: {
                              required: true,
                              length: [8]
                    }
          }, {
                    email: {
                              required: "L'email est obligatoire",
                              email: "Email invalide"
                    },
                    password: {
                              required: "Le mot de passe est obligatoire",
                              length: "Mot de passe trop court"
                    }
          })

          const [additioanalErrors, setAdditionalErrors] = useState({})

          const handleLogin = async () => {
                    const user = {
                              // email,
                              // password
                              email: data.email,
                              password: data.password
                    }
                    try {
                              setLoading(true)
                              setAdditionalErrors({})
                              const userData = await fetchApi("/users/login", {
                                        method: "POST",
                                        body: JSON.stringify(user),
                                        headers: { "Content-Type": "application/json" },
                              });
                              await AsyncStorage.setItem("user", JSON.stringify(userData.result));
                              dispatch(setUserAction(userData.result))
                    }

                    catch (error) {
                              console.log(error)
                              if(error.httpStatus == "NOT_FOUND") {
                                        setAdditionalErrors(error.result)
                              } else {
                                        setAdditionalErrors({ main: ["Erreur inconnue, réessayer plus tard"]})
                              }
                    }
                    finally {
                              setLoading(false);
                    }
          }
          return (
                    <>
                              {loading && <Loading />}
                              <ImageBackground style={styles.container} source={require('../../../assets/images/g52.png')}>
                                        <ScrollView keyboardShouldPersistTaps="handled">
                                                  <View>
                                                            <View style={styles.cardTitle}>
                                                                      <Text style={styles.Title}>Compte client</Text>
                                                                      <Text style={styles.description}> Chap Chap</Text>
                                                            </View>

                                                            <View style={styles.inputCard}>
                                                                      <View>
                                                                                <OutlinedTextField
                                                                                          label="Adresse email"
                                                                                          fontSize={14}
                                                                                          baseColor={COLORS.smallBrown}
                                                                                          tintColor={COLORS.primary}
                                                                                          containerStyle={{ borderRadius: 20 }}
                                                                                          lineWidth={1}
                                                                                          activeLineWidth={1}
                                                                                          errorColor={COLORS.error}
                                                                                          renderRightAccessory={() => <Fontisto name="email" size={20} color={hasError('email') ? COLORS.error : "#a2a2a2"} />}
                                                                                          value={data.email}
                                                                                          onChangeText={(newValue) => handleChange('email', newValue)}
                                                                                          onBlur={() => checkFieldData('email')}
                                                                                          error={hasError('email') ? getError('email') : ''}
                                                                                          onSubmitEditing={() => {
                                                                                                    passwordInputRef.current.focus()
                                                                                          }}
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
                                                                                          containerStyle={{ borderRadius: 20 }}
                                                                                          lineWidth={1}
                                                                                          activeLineWidth={1}
                                                                                          errorColor={COLORS.error}
                                                                                          renderRightAccessory={() => <EvilIcons name="lock" size={30} color={hasError('password') ? COLORS.error : "#a2a2a2"} />}
                                                                                          value={data.password}
                                                                                          onChangeText={(newValue) => handleChange('password', newValue)}
                                                                                          onBlur={() => checkFieldData('password')}
                                                                                          error={hasError('password') ? getError('password') : ''}
                                                                                          ref={passwordInputRef}
                                                                                />
                                                                      </View>

                                                            </View>

                                                            <TouchableWithoutFeedback
                                                                      disabled={!isValidate()}
                                                                      onPress={handleLogin} >
                                                                      <View style={[styles.button, !isValidate() && { opacity: 0.5 }]}>
                                                                                <Text style={styles.buttonText}>Se connecter</Text>
                                                                      </View>
                                                            </TouchableWithoutFeedback>

                                                            {additioanalErrors.main && <View>
                                                                      <View style={styles.button2}>
                                                                                <View style={{ marginLeft: 20 }}>
                                                                                          <AntDesign name="closecircleo" size={24} color="white" />
                                                                                </View>
                                                                                <View style={{ marginLeft: 10 }}>
                                                                                          {errors && <Text style={styles.buttonText}>{additioanalErrors.main[0]} </Text>}
                                                                                </View>

                                                                      </View>
                                                            </View>}

                                                  </View>
                                        </ScrollView>
                              </ImageBackground>
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
                    backgroundColor: "#1D8585",
                    marginHorizontal: 20
          },
          buttonText: {
                    color: "#fff",
                    fontWeight: "bold",
                    // textTransform:"uppercase",
                    fontSize: 16,
                    textAlign: "center"
          },
          button2: {
                    borderRadius: 8,
                    paddingVertical: 14,
                    paddingHorizontal: 10,
                    backgroundColor: "#D24646",
                    marginHorizontal: 60,
                    marginTop: 15,
                    alignItems: "center",
                    flexDirection: "row",
          },
          container: {
                    flex: 1,
          },
})