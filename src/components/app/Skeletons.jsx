import { View } from "react-native";
import { COLORS } from "../../styles/COLORS";

export default function CommandeSkeletons() {
          return (
                    <View style={{ paddingHorizontal: 10, width: "100%", flex: 1 }}>
                              {new Array(10).fill(0).map((_, index) => {
                                        return (
                                                  <View style={{ height: 100, width: "100%", backgroundColor: COLORS.skeleton, marginTop: 10, borderRadius: 10 }} key={index}>
                                                            <View style={{ flexDirection: "row", alignItems: "center", height: "100%", marginLeft: 10 }}>
                                                                      <View style={{ backgroundColor: '#FFF', borderRadius: 10, width: 60, height: "60%" }} />
                                                                      <View style={{ marginLeft: 10}}>
                                                                                <View style={{ height: 15, width: 200, backgroundColor: '#FFF', borderRadius: 5 }} />
                                                                                <View style={{ height: 10, width: 100, backgroundColor: '#FFF', borderRadius: 10, marginTop: 10 }} />
                                                                      </View>
                                                            </View>
                                                  </View>
                                        )
                              })}
                    </View>
          )
}
