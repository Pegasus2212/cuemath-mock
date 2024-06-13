import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { COLORS, FONT } from "../../contants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
export default LoginContainer = ({ navigation }) => {
  const [userData, setUserData] = useState([]);
  const [isFocused, setIsFocused] = useState("email");
  const [credentails, setCredentails] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const getUserCredentials = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        setUserData(JSON.parse(userData));
      } catch (error) {
        console.error("Error retrieving user credentials:", error);
        return null;
      }
    };
    getUserCredentials();
  }, []);

  const handleChange = (value, type) => {
    switch (type) {
      case "password":
        setCredentails((c) => ({ ...c, password: value }));
        break;
      case "email":
        setCredentails((c) => ({ ...c, email: value }));
        break;
    }
  };
  const onSubmit = async () => {
    try {
      Vibration.vibrate(10);
      const pattern = /^[^s@]+@[^s@]+.[^s@]+$/;
      if (!pattern.test(credentails.email) || credentails.password.length == 0)
        Toast.show({
          type: "error",
          text1: !pattern.test(credentails.email)
            ? "Email is not valid."
            : "Please enter the password.",
          visibilityTime: 2500,
        });
      else {
        const foundUser = userData.find(
          (user) => user.email == credentails.email
        );
        if (foundUser) {
          if (foundUser.password !== credentails.password) {
            Toast.show({
              type: "error",
              text1: "Wrong Password",
              visibilityTime: 2500,
            });
          } else {
            await AsyncStorage.removeItem("login_cred");
            await AsyncStorage.setItem("login_cred", JSON.stringify(foundUser));
            navigation.replace("Dashboard");
          }
        } else
          Toast.show({
            type: "error",
            text1: "No User Found",
            visibilityTime: 2500,
          });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something Went Wrong",
        visibilityTime: 2500,
      });
    }
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.background,
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 50,
        paddingTop: 72,
        paddingBottom: 56,
        gap: 85,
      }}
    >
      <View style={{ gap: 63, width: "100%", alignItems: "center" }}>
        <View style={{ flexDirection: "row", gap: 7 }}>
          <Text style={{ color: "#fff", fontFamily: FONT[900], fontSize: 26 }}>
            CUEMATH
          </Text>
          <Text
            style={{ color: COLORS.logo, fontFamily: FONT[900], fontSize: 26 }}
          >
            Go!
          </Text>
        </View>
        <View style={{ width: "100%", gap: 16 }}>
          <TextInput
            placeholder="Email ID"
            placeholderTextColor={"#808080"}
            autoFocus
            keyboardType="email-address"
            onChangeText={(value) => handleChange(value, "email")}
            onFocus={() => setIsFocused("email")}
            style={{
              fontFamily: FONT[700],
              fontSize: 16,
              height: 56,
              color: "#fff",
              paddingHorizontal: 16,
              borderColor:
                isFocused == "email" ? "#fff" : "rgba(255 ,255 ,255 ,0.3)",
              borderWidth: 1,
              borderRadius: 8,
            }}
          />
          <TextInput
            placeholder="Password"
            onFocus={() => setIsFocused("password")}
            placeholderTextColor={"#808080"}
            onChangeText={(value) => handleChange(value, "password")}
            secureTextEntry={true}
            style={{
              fontFamily: FONT[700],
              fontSize: 16,
              height: 56,
              color: "#fff",
              borderColor: "#fff",
              paddingHorizontal: 16,
              borderColor:
                isFocused == "password" ? "#fff" : "rgba(255 ,255 ,255 ,0.3)",
              borderWidth: 1,
              borderRadius: 8,
            }}
          />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSubmit}
          style={{
            width: "100%",
            borderColor: "rgba(255,255,255,0.7)",
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: "#fff",
            paddingVertical: 12,
            paddingHorizontal: 24,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontFamily: FONT[800],
              fontSize: 14,
              lineHeight: 20,
              textAlign: "center",
              height: 20,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};
