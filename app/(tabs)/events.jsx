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
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import dayjs from "dayjs";

const Events = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const api = axios.create({
    baseURL: "https://api.rnbsouldashboard.com/api/v1",
    withCredentials: true,
  });

  // Fetch Events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/event/all");
      setEvents(response?.data?.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents().then(() => setRefreshing(false));
  };

  // Handle card press
  const handleCardPress = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
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
            {events.length > 0 ? (
              events.map((event, index) => (
                <View style={styles.card} key={index}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${"https://api.rnbsouldashboard.com"}${
                        event?.image
                      }`,
                    }}
                  />
                  <Text style={styles.title}>{event?.title}</Text>
                  <Text style={styles.date}>
                    {dayjs(event?.date).format("ddd, DD ")}
                    {event?.secondDate &&
                      ` - ${dayjs(event?.secondDate).format("DD ")}`}
                    {dayjs(event?.date).format("MMM YYYY")}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleCardPress(event?.url)}
                  >
                    <Text style={styles.buttonText}>Buy Tickets</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noEventsText}>No events available.</Text>
            )}
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
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  date: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#38BF64",
    borderRadius: 5,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
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
    padding: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    color: "black",
  },
  noEventsText: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});

export default Events;
