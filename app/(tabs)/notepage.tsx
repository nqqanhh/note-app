import HeaderComponent from "@/components/HeaderComponent";
import { Text, View } from "react-native";
export default function notepage() {
  return (
    <View>
      <HeaderComponent/>
      {/* <SearchBarComponent/> */}
      <Text style={{color:"white",flex:1, alignItems:"center", }}>Hello</Text>
    </View>
)
}
