import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT } from "../../contants/theme";
export default HomeScreen = ({ navigation }) => {
  const onLayout = (event) => {
    const { height, width } = event.nativeEvent.layout;
    console.log("Height: ", height);
    console.log("Width: ", width);
  };
  const goToLogin = () => {
    Vibration.vibrate(10);
    navigation.push("Login", { owner: "Michaś" });
  };
  const goToSignup = () => {
    Vibration.vibrate(10);
    navigation.push("Signup", { owner: "Michaś" });
  };
  useEffect(() => {
    // await AsyncStorage.removeItem("login_cred");
    const getEmail = async () => {
      const login_email = await AsyncStorage.getItem("login_cred");
      if (login_email) {
        navigation.replace("Dashboard");
      }
    };
    getEmail();
  }, []);

  const styles = StyleSheet.create({
    container: {
      paddingTop: 256,
      flexDirection: "row",
      gap: 12,
    },
    tinyLogo: {
      width: 172,
      height: 27,
      resizeMode: "contain",
    },
    logo: {
      width: 66,
      height: 58,
    },
    button: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "rgba(255,255,255, 0.7)",
    },
    button1: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      alignItems: "center",
      backgroundColor: "#000",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.7)",
    },
  });
  return (
    <View
      // onLayout={onLayout}
      style={{
        backgroundColor: COLORS.background,
        height: "100%",
        alignItems: "center",
        paddingHorizontal: 50,
        gap: 85,
      }}
    >
      <View style={styles.container}>
        <Text style={{ color: "#fff", fontFamily: FONT[900], fontSize: 40 }}>
          CUEMATH
        </Text>
        <Text
          style={{ color: COLORS.logo, fontFamily: FONT[900], fontSize: 40 }}
        >
          Go!
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={goToSignup}
        >
          <Text
            style={{
              color: "#000",
              fontFamily: FONT[800],
              fontSize: 14,
              lineHeight: 20,
              textAlign: "center",
              width: 100,
              height: 20,
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          activeOpacity={0.7}
          onPress={goToLogin}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: FONT[800],
              fontSize: 14,
              textAlign: "center",
              lineHeight: 20,
              width: 100,
              height: 20,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
