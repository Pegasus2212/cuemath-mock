import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { COLORS, FONT } from "../../contants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import Swiper from "react-native-swiper";
import { Animated, Easing } from "react-native";
import { WebView } from "react-native-webview";
import BottomSheet from "react-native-simple-bottom-sheet";
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
export default DashboardContainer = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const getEmail = async () => {
      const login_user = await AsyncStorage.getItem("login_cred");
      setUser(JSON.parse(login_user));
    };
    getEmail();
  }, []);

  const onLogout = () => {
    AsyncStorage.removeItem("login_cred");
    navigation.replace("Login");
  };
  const data = [
    { text: "Tapping this lottie opens the bottom sheet." },
    { text: "Tapping this plays 33% of the frames at a time of this lottie." },
    {
      text: "Tapping this lottie launches a in-app webview with user details.",
    },
  ];

  const lottieRef = useRef();
  const [progress, setProgress] = useState(0.33);
  const [tapCount, setTapCount] = useState(0);
  const panelRef = useRef(null);
  const animationProgress = useRef(new Animated.Value(0));
  const handlePress = (index) => {
    Vibration.vibrate(10);
    if (index == 0) {
      panelRef.current?.togglePanel();
    } else if (index == 2) {
      handleButtonPress();
    }
  };
  const CarouselItem = ({ item, index }) => (
    <View style={styles.slide}>
      <TouchableOpacity onPress={() => handlePress(index)} activeOpacity={0.8}>
        <View style={{ height: 380, aspectRatio: 1 }}>
          {index == 0 ? (
            <LottieView
              style={{ flex: 1 }}
              source={require("../../assets/lottie/cts.json")}
              autoPlay
              loop
            />
          ) : index == 1 ? (
            <AnimatedLottieView
              ref={lottieRef}
              style={{ flex: 1 }}
              source={require("../../assets/lottie/nakb.json")}
              progress={animationProgress.current}
              // autoPlay
              colorFilters={
                [
                  // {
                  //   keypath: "Circle Stroke",
                  //   color: "blue",
                  // },
                ]
              }
              loop={false}
            />
          ) : (
            <>
              <LottieView
                style={{ flex: 1 }}
                source={require("../../assets/lottie/olwl.json")}
                autoPlay
                loop
              />
            </>
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const [showWebView, setShowWebView] = useState(false);

  const handleButtonPress = () => {
    setShowWebView(true);
  };

  const handleReturnPress = () => {
    setShowWebView(false);
  };
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WEBVIEW</title>
      <style>
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background-color: #000;
          height: 100vh;
          margin: 0;
        }
        h1 {
          text-align: center;
          font-family: ${FONT[500]}
          font-size: 24px;
        }
        #span1 {
            color: #FFBA07;
        }
        #span2 {
            color: #ED6CEF;
        }
      </style>
    </head>
    <body >
      <h1>This is a webview, launched by <span id="span1">${user?.first_name}</span>. He is <span id="span2">${user?.age}yrs</span> old</h1>

    </body>
    </html>
  `;

  return (
    <View
      style={{
        backgroundColor: COLORS.background,
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        paddingTop: 16,
        gap: 85,
        position: "relative",
      }}
    >
      {!showWebView ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 24,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  backgroundColor: "orange",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontFamily: FONT[900] }}>
                  {user?.email?.slice(0, 1).toUpperCase()}
                </Text>
              </View>
              <Text
                style={{ color: "#fff", fontFamily: FONT[800], fontSize: 14 }}
              >
                {user?.email}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onLogout}
              style={{
                backgroundColor: "transparent",
                paddingVertical: 12,
                // paddingHorizontal: 24,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#808080",
                  fontFamily: FONT[800],
                  fontSize: 14,
                }}
              >
                logout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 460, paddingHorizontal: 24 }}>
            <Swiper
              //   style={styles.wrapper}
              //   showsButtons={true}
              loop={false}
              //   autoplay={true}
              //   autoplayTimeout={3}
              dot={<View style={styles.dot} />}
              activeDot={<View style={styles.activeDot} />}
            >
              {data.map((item, index) => (
                <CarouselItem key={index} item={item} index={index} />
              ))}
            </Swiper>
          </View>
          <View
            style={{
              width: "100%",
              height: 56,
              opacity: 0,
            }}
          >
            <Text
              style={{ color: "#fff", fontFamily: FONT[500], fontSize: 16 }}
            >
              Bottom Sheet
            </Text>
          </View>
          <BottomSheet
            isOpen={false}
            ref={panelRef}
            sliderMinHeight={56}
            sliderMaxHeight={viewportHeight}
            wrapperStyle={{
              backgroundColor: "#000",
              borderTopWidth: 3,
              borderColor: "#fff",
            }}
            // lineStyle={{ height: "" }}
            onOpen={() => {
              setModalOpen(true);
            }}
            onClose={() => {
              setModalOpen(false);
            }}
          >
            <View
              style={{
                height: viewportHeight,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 58,
                backgroundColor: "#000",
              }}
            >
              <Text
                style={{
                  fontFamily: FONT[600],
                  fontSize: 22,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                This is a bottom sheet, launched by tapping on lottie or swiping
                up.
              </Text>
            </View>
          </BottomSheet>
          {modalOpen && (
            <View>
              <Text style={{ color: "#fff" }}>Bottom Sheet</Text>
            </View>
          )}
        </>
      ) : (
        <View
          style={{ flex: 1, width: "100%", backgroundColor: COLORS.background }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 240,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleReturnPress}
              style={{
                backgroundColor: "transparent",
                borderColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 8,
                marginTop: 20,
                zIndex: 2,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: FONT[700],
                }}
              >
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
          <WebView
            originWhitelist={["*"]}
            source={{ html: htmlContent }}
            style={{ flex: 1, width: "100%" }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    height: viewportHeight * 0.5, // Adjust the height as needed
  },
  slide: {
    flex: 1,
    // backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 22,
    paddingTop: 30,
    zIndex: 2,
    color: "#fff",
    fontFamily: FONT[400],
    textAlign: "center",
  },
  dot: {
    backgroundColor: "#2B2B2B",
    width: 10,
    height: 10,
    marginBottom: 55,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
    marginBottom: 55,
    borderRadius: 5,
    margin: 3,
  },
});
