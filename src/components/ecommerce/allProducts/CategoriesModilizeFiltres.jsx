import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, Image } from "react-native";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS } from "../../../styles/COLORS"
import { SimpleLineIcons, AntDesign, Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';


export default function CategoriesModilizeFiltres({ categotiesModalizeRef,setSelectedCategory, isOpen, setIsOpen, categories }) {
        return (
                <Portal>
                        <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                <Modalize
                                        ref={categotiesModalizeRef}
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
                                                setIsOpen(false)
                                        }}
                                >
                                        <View style={styles.modalContainer}>
                                                <View style={styles.modalHeader}>
                                                        <Text style={styles.modalTitle}>Les catégories</Text>
                                                        {false && <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                        <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                        <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                </TouchableOpacity>
                                                        </View>}
                                                </View>
                                                {categories.map((category, index) => {
                                                        return (
                                                                <TouchableNativeFeedback onPress={() => {
                                                                        setSelectedCategory(category)
                                                                        categotiesModalizeRef.current.close()
                                                                }} key={index.toString()}>
                                                                        <View style={[styles.modalItem]} >
                                                                                <View style={styles.modalImageContainer}>
                                                                                        <Image style={styles.modalImage} source={{ uri: category.IMAGE }} />
                                                                                </View>
                                                                                <Text style={styles.itemTitle}>{category.NOM}</Text>
                                                                        </View>
                                                                </TouchableNativeFeedback>
                                                        )
                                                })}
                                        </View>
                                </Modalize>
                        </GestureHandlerRootView>

                </Portal>

        )
}

const styles = StyleSheet.create({
        modalHeader: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                paddingVertical: 5
        },
        modalTitle: {
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10,
                fontSize: 16
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
        itemTitle: {
                marginLeft: 10
        },
})