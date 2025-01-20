import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Events = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Handle card press
  const handleCardPress = (url) => {
    Linking.openURL(`${url}`);
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
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
          </View>
          <View style={styles.cardContainer}>
            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/rnb_soul.png")}
              />

              <Text style={styles.title}>Welcome to RNB Soul Radio!</Text>
              <Text style={styles.date}>25 April, 2025</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleCardPress("")}
              >
                <Text style={styles.buttonText}>Buy Tickets</Text>
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/rnb_soul.png")}
              />

              <Text style={styles.title}>Welcome to RNB Soul Radio!</Text>
              <Text style={styles.date}>25 April, 2025</Text>

              <TouchableOpacity style={styles.button} onPress={handleCardPress}>
                <Text style={styles.buttonText}>Buy Tickets</Text>
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/rnb_soul.png")}
              />

              <Text style={styles.title}>Welcome to RNB Soul Radio!</Text>
              <Text style={styles.date}>25 April, 2025</Text>

              <TouchableOpacity style={styles.button} onPress={handleCardPress}>
                <Text style={styles.buttonText}>Buy Tickets</Text>
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/rnb_soul.png")}
              />

              <Text style={styles.title}>Welcome to RNB Soul Radio!</Text>
              <Text style={styles.date}>25 April, 2025</Text>

              <TouchableOpacity style={styles.button} onPress={handleCardPress}>
                <Text style={styles.buttonText}>Buy Tickets</Text>
              </TouchableOpacity>
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
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    fontWeight: "semibold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  date: {
    fontSize: 12,
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#38BF64",
    borderRadius: 5,
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#FFFFFF",
    textAlign: "center",
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
    width: "48%",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "inset 0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
    padding: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    color: "black",
  },
});

export default Events;
