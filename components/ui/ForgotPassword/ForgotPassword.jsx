import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import axios from "axios";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../../context/GlobalContext";

const ForgotPassword = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user } = useContext(GlobalContext);

  const router = useRouter();

  const api = axios.create({
    baseURL: "https://api.rnbsouldashboard.com/api/v1",
    withCredentials: true,
  });

  //   Handle Submit Form
  const handleSubmit = async () => {
    setLoading(true);
    console.log("handleSubmit", email);
    // Validate required fields
    if (!email) {
      Alert.alert("Error", "All fields are required!");
      setLoading(false);
      return;
    }

    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        "/user/update/password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.status === 200) {
        router.replace("/login");
      }
    } catch (error) {
      console.error(
        "Error Login:",
        error.response ? error.response.data : error
      );
      Alert.alert("Failed to send email", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setEmail("");
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (user) router.replace("/(tabs)/home");

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
          <View className="w-full">
            <Text className="mb-10 text-2xl font-bold text-center">
              Forgot Password
            </Text>

            {/* Email  */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="email"
                  placeholder="email address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Input>
            </FormControl>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {loading ? "SENDING EMAIL..." : "SUBMIT"}
              </Text>
            </TouchableOpacity>

            <Text className="mt-5 text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Log in
              </Link>
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: "100%",
    display: "flex",
    width: "100%",
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
    fontSize: 24,
    fontWeight: "semibold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  description: {
    fontSize: 14,
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
    width: "100%",
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

export default ForgotPassword;
