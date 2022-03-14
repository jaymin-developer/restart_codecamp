import { StatusBar } from "expo-status-bar"
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { WebView } from "react-native-webview"

export default function App() {
  // const onPressButton = () => {
  //   alert("버튼 클릭!")
  // }

  return (
    <WebView source={{ uri: "https://naver.com" }} />
    // <View style={styles.container}>
    //   <Text>테스트입니다</Text>
    //   <StatusBar style="auto" />
    //   <Button title="등록하기" onPress={onPressButton} />

    //   <TouchableOpacity onPress={onPressButton}>
    //     <Image source="https://static.gabia.com/www/common/img/logo.png" />
    //     <Text>dd</Text>
    //   </TouchableOpacity>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
