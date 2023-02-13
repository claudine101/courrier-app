import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import PaginationHeader from '../components/ecommerce/main/PaginationHeader';
import ShippingInfoScreen from '../screens/e-commerce/ShippingInfoScreen';
import PaymentScreen from '../screens/e-commerce/PaymentScreen';
import SearchLivreurScreen from '../screens/e-commerce/SearchLivreurScreen';
import DetailCommandeScreen from '../screens/e-commerce/DetailCommandeScreen';
import DetailCommandeMenuScreen from '../screens/restaurant/DetailCommandeMenuScreen';
import ProductDetailsScreen from '../screens/e-commerce/ProductDetailsScreen';
import PlusRecommandeScreen from '../screens/liste_e-commerce/PlusRecommandeListeScreen';
<<<<<<< HEAD
import SearchHistoryScreen from '../screens/search/SearchHistoryScreen';
import SearchResultTabsScreen from '../screens/search/SearchResultTabsScreen';
import SearchAllLivreurScreen from '../screens/e-commerce/SearchAllLivreurScreen';
=======
import EditRatingScreen from '../screens/e-commerce/EditRatingScreen';
import AllNotesScreen from '../screens/e-commerce/AllNotesScreen';
>>>>>>> feat/ratings


export default function RootNavigator() {
          const Stack = createStackNavigator()
          return (
                    <NavigationContainer
                              theme={{
                                        colors: {
                                                  background: "#fff",
                                        },
                              }}>
                              <Stack.Navigator screenOptions={{  }}>
                                        <Stack.Screen name='Root' component={DrawerNavigator} options={{ headerShown: false }} />
                                        <Stack.Group screenOptions={{
                                                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                                  header: () => <PaginationHeader />,
                                                  headerShown: false,
                                                  headerMode: "float"
                                        }}>
                                                  <Stack.Screen name="ShippingInfoScreen" component={ShippingInfoScreen} />
                                                  <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                                                  <Stack.Screen name="produitDetailScreen" component={ProductDetailsScreen} />
                                                  <Stack.Screen name="SearchLivreurScreen" component={SearchLivreurScreen} />
                                        </Stack.Group>
                                        <Stack.Screen name="DetailCommandeScreen" component={DetailCommandeScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}  />
                                        <Stack.Screen name="DetailCommandeMenuScreen" component={DetailCommandeMenuScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}  />
                                        <Stack.Screen name="NoHeaderSearchLivreurScreen" component={SearchLivreurScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}  />
                                        <Stack.Screen name='SearchAllLivreurScreen' component={SearchAllLivreurScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}/>
                                        <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen} options={{headerShown: false}}/>
                                        <Stack.Screen name='PlusRecommandeScreen' component={PlusRecommandeScreen} options={{headerShown: false}}/>
<<<<<<< HEAD
                                        <Stack.Screen name="SearchHistoryScreen" component={SearchHistoryScreen} options={{
                                                  headerShown: false,
                                                  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
                                        }} />
                                        <Stack.Screen name="SearchResultTabsScreen" component={SearchResultTabsScreen} options={{
                                                  headerShown: false,
                                                  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
                                        }} />
=======
                                        <Stack.Screen name="AllNotesScreen" component={AllNotesScreen} options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                                        <Stack.Screen name="EditRatingScreen" component={EditRatingScreen} options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
>>>>>>> feat/ratings
                              </Stack.Navigator>
                    </NavigationContainer>
          )
}