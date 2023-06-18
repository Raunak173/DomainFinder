import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import leftArrow from "../assets/images/leftArrow.png";
import cover from "../assets/images/cover.png";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import BottomNav from "../Components/BottomNav";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AddDomains from "./AddDomains";

const SearchDomains = () => {
  const sheetRef = useRef(<BottomSheet />);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ["70%"];
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.askBox}>
          <Image source={leftArrow} />
          <Text style={styles.ask}>Ask</Text>
        </View>
        <Text style={styles.des}>Let’s dig deeper into your requirements </Text>
        <Text style={styles.domain}>Domain</Text>
        <Text style={styles.sel}>Please select min. 1 and max. 5 domains</Text>
        <Image style={styles.cover} source={cover} />
        <TouchableOpacity style={styles.btn} onPress={() => setIsOpen(true)}>
          <Text style={styles.btnText}>Search for domains</Text>
        </TouchableOpacity>
        <BottomNav />
        {isOpen && (
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            onClose={() => setIsOpen(false)}
            enablePanDownToClose={true}
          >
            <BottomSheetView>
              <AddDomains setIsOpen={setIsOpen} />
            </BottomSheetView>
          </BottomSheet>
        )}
      </View>
    );
  }
};

export default SearchDomains;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
  },
  askBox: {
    backgroundColor: "white",
    marginTop: 40,
    paddingVertical: 14,
    paddingLeft: 19,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 19,
  },
  ask: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
  },
  des: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    paddingLeft: 16,
    marginTop: 24,
  },
  domain: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    paddingLeft: 16,
    marginTop: 27,
  },
  sel: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    paddingLeft: 16,
    marginTop: 8,
  },
  cover: {
    marginTop: 70,
    marginHorizontal: 60,
  },
  btn: {
    backgroundColor: "#467bff",
    borderRadius: 10,
    marginHorizontal: 16,
    paddingVertical: 18,
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
  },
});
