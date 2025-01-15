import { StyleSheet, Text, View } from "react-native";
import logo from "../assets/logo.png";

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <Text>Sign In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
});
