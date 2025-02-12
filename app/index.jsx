import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import { useEffect, useCallback } from "react";

export default function Index() {
  const { user, isLoaded } = useUser();

  // Function to save user data
  const saveUserToDb = useCallback(async () => {
    console.log("User:", user);
    if (!user?.fullName) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        {
          name: user?.fullName,
          email: "user?.emailAddress@gmail.com",
        }
      );
      console.log("User saved:", res?.data);
    } catch (error) {
      console.error("Failed to save user to DB:", error);
    }
  }, [user]);

  // Run once when the user is loaded
  useEffect(() => {
    if (user) {
      saveUserToDb();
    }
  }, [user, saveUserToDb]);

  if (!isLoaded)
    return (
      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#38BF64" />
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      {user ? <Redirect href="/home" /> : <Redirect href="/login" />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
