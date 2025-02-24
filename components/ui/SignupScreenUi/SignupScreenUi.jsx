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
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import axios from "axios";
import { Link, Redirect, router } from "expo-router";
import { useRouter } from "expo-router";

const SignupScreenUi = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const api = axios.create({
    baseURL: "https://api.rnbsouldashboard.com/api/v1",
    withCredentials: true,
  });

  //   Handle Submit Form
  const handleSubmit = async () => {
    setLoading(true);

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
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

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await api.post("/user/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status === 201) {
        Alert.alert("Success", "User Created Successfully!", [
          { text: "OK", onPress: () => router.replace("/login") }, // Navigate to login
        ]);

        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error
      );
      Alert.alert("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

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
          <View className="w-full">
            <Text className="mb-10 text-2xl font-bold text-center">
              Sign Up
            </Text>
            {/* First Name */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>First Name</FormControlLabelText>
              </FormControlLabel>
              <Input className="w-full my-1">
                <InputField
                  className="w-full"
                  type="text"
                  placeholder="first name"
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                />
              </Input>
            </FormControl>

            {/* Last Name */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Last Name</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="text"
                  placeholder="last name"
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                />
              </Input>
            </FormControl>

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

            {/* Password  */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="password"
                  placeholder="password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </Input>
            </FormControl>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {loading ? "SUBMITTING..." : "SUBMIT"}
              </Text>
            </TouchableOpacity>

            <Text className="mt-5 text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
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

export default SignupScreenUi;
