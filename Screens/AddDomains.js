import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import cross from "../assets/images/cross.png";
import search from "../assets/images/Search.png";
import useDomains from "../Components/useDomains";
import { ScrollView } from "react-native-gesture-handler";

const AddDomains = ({ setIsOpen }) => {
  const domains = useDomains();
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filteredDomains, setFilteredDomains] = useState([]);
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
  });
  const debounce = (callback, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const delayedSearch = debounce(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    delayedSearch();

    return () => {
      clearTimeout(delayedSearch);
    };
  }, [searchQuery]);

  useEffect(() => {
    const filtered = domains.filter((domain) => {
      const filteredSubdomains = domain.domainTags.filter((subDomain) =>
        subDomain.name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
      return (
        domain.name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        filteredSubdomains.length > 0
      );
    });
    if (searchQuery === "") setFilteredDomains(domains);
    else setFilteredDomains(filtered);
  }, [debouncedSearchQuery]);

  const handleDomainSelection = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains((prevSelectedDomains) =>
        prevSelectedDomains.filter((d) => d !== domain)
      );
    } else {
      if (selectedDomains.length < 5) {
        setSelectedDomains((prevSelectedDomains) => [
          ...prevSelectedDomains,
          domain,
        ]);
      }
    }
    setSearchQuery("");
  };

  const handleRemoveDomain = (domain) => {
    setSelectedDomains((prevSelectedDomains) =>
      prevSelectedDomains.filter((d) => d !== domain)
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
        <View style={styles.tab}>
          <View style={styles.upTab}>
            <Text style={styles.head}>Add Domains</Text>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Image source={cross} />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>
            Please add at least 2 amenities to proceed
          </Text>
          <View style={styles.searchBox}>
            <Image source={search} />
            <TextInput
              placeholder="Search input here"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView>
            {selectedDomains.length < 2 && (
              <View>
                {filteredDomains?.map((domain) => (
                  <View key={domain.name}>
                    <Text style={styles.heading}>{domain.name}</Text>
                    <ScrollView>
                      {domain?.domainTags?.map((subDomain) => (
                        <React.Fragment key={subDomain.name}>
                          <TouchableOpacity
                            onPress={() => handleDomainSelection(subDomain)}
                          >
                            <Text style={styles.subHead}>
                              {subDomain?.name}
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.line} />
                        </React.Fragment>
                      ))}
                    </ScrollView>
                  </View>
                ))}
              </View>
            )}
            {selectedDomains.length >= 2 && (
              <View>
                <View style={styles.chipCont}>
                  {selectedDomains.map((dom) => (
                    <View
                      style={[
                        styles.chip,
                        {
                          backgroundColor: dom.color,
                          borderColor: dom.color,
                        },
                      ]}
                      key={dom.name}
                    >
                      <View>
                        <Text style={styles.subHeadC}>{dom?.name}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleRemoveDomain(dom)}>
                        <Image source={cross} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <Text style={styles.head}>Subdomains</Text>
                <ScrollView>
                  {domains?.map((domain) => (
                    <View style={styles.chipCont} key={domain.name}>
                      {domain?.domainTags?.map((subDomain) => (
                        <TouchableOpacity
                          style={[
                            styles.chip,
                            {
                              backgroundColor: selectedDomains.includes(
                                subDomain
                              )
                                ? subDomain.color
                                : "white",
                              borderColor: subDomain.color,
                            },
                          ]}
                          onPress={() => handleDomainSelection(subDomain)}
                          key={subDomain.name}
                        >
                          <View>
                            <Text
                              style={[
                                styles.subHead,
                                {
                                  color:
                                    selectedDomains.includes(subDomain) &&
                                    "white",
                                },
                              ]}
                            >
                              {subDomain?.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
};

export default AddDomains;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  upTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tab: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  head: {
    fontFamily: "Lato_700Bold",
    fontSize: 21,
  },
  text: {
    fontFamily: "Lato_400Regular",
    color: "#4a4a4a",
    fontSize: 12,
    marginTop: 4,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#dedede",
    columnGap: 15,
  },
  heading: {
    color: "#4A4A4A",
    textTransform: "uppercase",
    fontFamily: "Lato_700Bold",
    fontSize: 12,
    marginVertical: 10,
  },
  subHead: {
    color: "#4A4A4A",
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    marginVertical: 10,
  },
  subHeadC: {
    color: "white",
    fontFamily: "Lato_700Bold",
    fontSize: 12,
    marginVertical: 10,
  },
  line: {
    backgroundColor: "#DEDEDE",
    height: 1,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    columnGap: 10,
    borderRadius: 6,
  },
  chipCont: {
    flexWrap: "wrap",
    flexDirection: "row",
    columnGap: 14,
    marginVertical: 10,
    rowGap: 10,
  },
});
