import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialTabBar, MaterialTabItem, Tabs } from 'react-native-collapsible-tab-view'
import { useEffect } from "react";
import ShopCollapsableHeader, { HEADER_HEIGHT } from "../../components/ecommerce/shop/ShopCollapsableHeader";
import { useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import Product from "../../components/ecommerce/main/Product";
import ProductsTabScreen from "./tabs/ProductsTabScreen";
import DetailsShopTabScreen from "./tabs/DetailsShopTabScreen";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES"
import MenuTabScreen from "../restaurant/tabs/MenuTabScreen";

const TopTab = createMaterialTopTabNavigator()

export default function ShopScreen() {
          const [activeIndex, setActiveIndex] = useState(0)
          const route = useRoute()
          const [products, setProducts] = useState([])
          const [loadingShopProducts, setLoadingShopProducts] = useState(true)
          const { shop } = route.params

          var serviceResto = IDS_SERVICE_CATEGORIES.resto
          var serviceEco = IDS_SERVICE_CATEGORIES.ecommerce


          const Header = () => {
                    return <ShopCollapsableHeader shop={shop} />
          }
          const renderItem = React.useCallback(({ index }) => {
                    return (
                              <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
                    )
          }, [])
          const DATA = [0, 1, 2, 3, 4]

          const tabBar = props => (
                    <MaterialTabItem
                              {...props}
                    />
          )


          return (
                    <Tabs.Container
                              renderHeader={Header}
                              headerHeight={HEADER_HEIGHT}
                              TabBarComponent={props => {
                                        return <MaterialTabBar
                                                  {...props}
                                                  indicatorStyle={{ backgroundColor: '#949494', height: 2, elevation: 0, borderBottomWidth: 0 }}
                                                  inactiveColor='#777'
                                                  tabStyle={{ elevation: 0, height: "100%" }}
                                                  style={{ elevation: 0, paddingHorizontal: 10, height: 50 }}
                                                  labelStyle={{ color: 'red', fontWeight: 'bold', paddingHorizontal: 10 }}
                                                  scrollEnabled
                                                  contentContainerStyle={{ elevation: 0 }}
                                        />
                              }}
                              onIndexChange={index => setActiveIndex(index)}
                    >
                              <Tabs.Tab name="produits" label={<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        {(shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.resto && shop.ID_SERVICE != IDS_SERVICE_CATEGORIES.ecommerce) ?
                                                  <Text style={[styles.headerLabel, { color: activeIndex == 0 ? '#000' : "#777" }]} >Menus</Text> :
                                                  <Text style={[styles.headerLabel, { color: activeIndex == 0 ? '#000' : "#777" }]}>Produits</Text>}
                              </View>}>

                                        {shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.ecommerce ?  <ProductsTabScreen shop={shop} serviceResto={serviceResto} serviceEco={serviceEco} /> : null}
                                        {shop.ID_SERVICE == IDS_SERVICE_CATEGORIES.resto ?  <MenuTabScreen shop={shop} serviceResto={serviceResto} serviceEco={serviceEco} /> : null}
                              </Tabs.Tab>
                              <Tabs.Tab name="commandes" label={<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Text style={[styles.headerLabel, { color: activeIndex == 0 ? '#777' : "#000" }]}>Suivis</Text>
                              </View>}>
                                        <Tabs.ScrollView>
                                                  <View style={[styles.box, styles.boxA]} />
                                                  <View style={[styles.box, styles.boxB]} />
                                        </Tabs.ScrollView>
                              </Tabs.Tab>
                              <Tabs.Tab name="supp" label={<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Text style={[styles.headerLabel, { color: activeIndex == 0 ? '#777' : "#000" }]}>A propos</Text>
                              </View>}>
                                        <DetailsShopTabScreen shop={shop} />
                              </Tabs.Tab>
                    </Tabs.Container>
          )
}

const styles = StyleSheet.create({
          box: {
                    height: 250,
                    width: '100%',
                    marginTop: 10
          },
          boxA: {
                    backgroundColor: 'white',
          },
          boxB: {
                    backgroundColor: '#D8D8D8',
          },
          header: {
                    height: HEADER_HEIGHT,
                    width: '100%',
                    backgroundColor: '#2196f3',
          },
          actionBadge: {
                    minWidth: 20,
                    minHeight: 18,
                    backgroundColor: "#000",
                    borderRadius: 100,
                    position: 'absolute',
                    right: -25,
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
          },
          headerLabel: {
                    fontSize: 12
          }
})