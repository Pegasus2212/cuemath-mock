import React from "react";
import "react-native-gesture-handler";
import HomeScreen from "../components/home";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import LoginContainer from "../components/login";
import SignupContainer from "../components/signup";
import DashboardContainer from "../components/dashboard";
import { store } from "../store";

const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    AthBlack: require("../assets/fonts/black.otf"),
    AthBold: require("../assets/fonts/bold.otf"),
    AthExtraBold: require("../assets/fonts/extrabold.otf"),
    AthLight: require("../assets/fonts/light.otf"),
    AthMedium: require("../assets/fonts/medium.otf"),
    AthRegular: require("../assets/fonts/regular.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ ...TransitionPresets.ModalFadeTransition }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardContainer}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen name="Details" component={DetailsScreen} /> Uncomment if needed */}
      </Stack.Navigator>
    </Provider>
  );
}
