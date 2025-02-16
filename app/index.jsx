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
    if (
      !user?.fullName ||
      !user?.primaryEmailAddress ||
      !user?.id ||
      !user?.imageUrl
    ) {
      return;
    }
    try {
      const res = await axios.post(
        "http://192.168.0.199:5000/api/v1/user/register",
        {
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          userId: user.id,
          imageUrl: user.imageUrl,
        }
      );
      console.log("User saved successfully:", res?.data);
    } catch (error) {
      console.error("Failed to save user:", error.message);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
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
