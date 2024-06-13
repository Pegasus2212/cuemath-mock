import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { COLORS, FONT } from "../../contants/theme";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default SignupContainer = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState("email");
  const [isNum, setIsNum] = useState(true);
  const [passMatch, setPassMatch] = useState(true);
  const [passLength, setPassLength] = useState(0);
  const [credentails, setCredentails] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    age: "",
  });
  const handleChange = (value, type) => {
    switch (type) {
      case "age":
        const numericValue = value.replace(/[^0-9]/g, "");
        setIsNum(
          (!isNaN(parseFloat(numericValue)) && isFinite(numericValue)) ||
            value == ""
        );
        setCredentails((c) => ({ ...c, age: numericValue }));
        break;
      case "name":
        setCredentails((c) => ({ ...c, first_name: value }));
        break;
      case "confirm_pass":
        if (credentails.password !== value) {
          setPassMatch(false);
        } else setPassMatch(true);
        setCredentails((c) => ({ ...c, confirm_password: value }));
        break;
      case "password":
        setPassLength(value.length);
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
      if (
        !pattern.test(credentails.email) ||
        credentails.first_name.length == 0 ||
        credentails.age.length == 0
        //  ||
        // credentails.password === credentails.confirm_password
      )
        Toast.show({
          type: "error",
          text1: !pattern.test(credentails.email)
            ? "Email is not valid."
            // : credentails.password == credentails.confirm_password
            // ? "Passwords do not match"
            : credentails.first_name.length == 0
            ? "Please Enter first name."
            : "Please enter the age.",
          visibilityTime: 2500,
        });
      else {
        let userData = [];
        const fetchedData = await AsyncStorage.getItem("user");
        if (fetchedData) userData = JSON.parse(fetchedData);
        userData.push(credentails);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        Toast.show({
          type: "success",
          text1: "Successfully Signed Up.",
          text2: "Login to Continue",
          visibilityTime: 2500,
        });
        setTimeout(() => {
          navigation.replace("Login");
        }, 2500);
      }
    } catch (error) {
      console.log("Error", error);
      Toast.show({
        type: "error",
        text1: "Something Went Wrong",
        visibilityTime: 2500,
      });
    }
  };
  return (
    <View
      onPress={() => setIsFocused(null)}
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
          <View>
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
                  passLength < 8 && passLength > 0
                    ? "orange"
                    : isFocused == "password"
                    ? "#fff"
                    : "rgba(255 ,255 ,255 ,0.3)",
                borderWidth: 1,
                borderRadius: 8,
              }}
            />
            {passLength < 8 && passLength > 0 ? (
              <Text style={{ color: "orange", fontSize: 12 }}>
                Password must be at least 8 characters
              </Text>
            ) : null}
          </View>
          <View>
            <TextInput
              placeholder="Confirm Password"
              onFocus={() => setIsFocused("confirmpassword")}
              placeholderTextColor={"#808080"}
              onChangeText={(value) => handleChange(value, "confirm_pass")}
              secureTextEntry={true}
              style={{
                fontFamily: FONT[700],
                fontSize: 16,
                height: 56,
                color: "#fff",
                borderColor: "#fff",
                paddingHorizontal: 16,
                borderColor: !passMatch
                  ? "red"
                  : isFocused == "confirmpassword"
                  ? "#fff"
                  : "rgba(255 ,255 ,255 ,0.3)",
                borderWidth: 1,
                borderRadius: 8,
              }}
            />
            {!passMatch && (
              <Text style={{ color: "red", fontSize: 12 }}>
                Passwords do not match
              </Text>
            )}
          </View>
          <TextInput
            placeholder="First Name"
            value={credentails.first_name}
            onChangeText={(value) => handleChange(value, "name")}
            onFocus={() => setIsFocused("name")}
            placeholderTextColor={"#808080"}
            style={{
              fontFamily: FONT[700],
              fontSize: 16,
              height: 56,
              color: "#fff",
              borderColor: "#fff",
              paddingHorizontal: 16,
              borderColor:
                isFocused == "name" ? "#fff" : "rgba(255 ,255 ,255 ,0.3)",
              borderWidth: 1,
              borderRadius: 8,
            }}
          />
          <View>
            <TextInput
              placeholder="Age"
              onFocus={() => setIsFocused("age")}
              placeholderTextColor={"#808080"}
              value={credentails.age}
              onChangeText={(value) => handleChange(value, "age")}
              style={{
                fontFamily: FONT[700],
                fontSize: 16,
                height: 56,
                color: "#fff",
                borderColor: "#fff",
                paddingHorizontal: 16,
                borderColor: !isNum
                  ? "red"
                  : isFocused == "age"
                  ? "#fff"
                  : "rgba(255 ,255 ,255 ,0.3)",
                borderWidth: 1,
                borderRadius: 8,
              }}
            />
            {!isNum && (
              <Text style={{ color: "red", fontSize: 12 }}>Numbers Only</Text>
            )}
          </View>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          onPress={onSubmit}
          activeOpacity={0.7}
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
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};
