import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import home from "../assets/images/home.png";
import explore from "../assets/images/explore.png";
import add from "../assets/images/add.png";
import profile from "../assets/images/profile.png";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

const BottomNav = () => {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.cont}>
        <TouchableOpacity style={styles.opt}>
          <Image source={home} />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opt}>
          <Image source={explore} />
          <Text style={styles.text}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opt}>
          <Image source={add} />
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opt}>
          <Image source={profile} />
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default BottomNav;

const styles = StyleSheet.create({
  cont: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 60,
    paddingHorizontal: 25,
    backgroundColor: "#fcfcfc",
    height: 80,
    elevation: 100,
    width: "100%",
  },
  text: {
    textAlign: "center",
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 12,
    color: "#545454",
  },
  opt: {
    justifyContent: "center",
    alignItems: "center",
  },
});
