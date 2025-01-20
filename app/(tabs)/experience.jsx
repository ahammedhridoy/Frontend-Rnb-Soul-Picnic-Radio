import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Experience = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#38BF64" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <Text style={styles.title}>A Soul Healing Experience</Text>
          </View>
          <View style={styles.cardContainer}>
            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/ex1.jpg")}
              />
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/ex2.jpg")}
              />
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/ex3.jpg")}
              />
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/ex4.jpg")}
              />
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/ex5.jpg")}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20%",
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
    color: "black",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "100%",
  },
  card: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "inset 0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
    // padding: 5,
  },
});

export default Experience;
