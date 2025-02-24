import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "expo-router";
import { Card } from "@/components/ui/card";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../context/GlobalContext";
const Settings = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser, fetchUser } = useContext(GlobalContext);
  const [firstName, setFirstName] = React.useState(user?.firstName);
  const [lastName, setLastName] = React.useState(user?.lastName);
  const [email, setEmail] = React.useState(user?.email);
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Signout the user
  const handleSignOut = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("accessTokenExp");
    setUser(null);
    router.replace("/login");
  };

  // Update User
  const handleSubmit = async () => {
    setLoading(true);

    if (!firstName || !lastName || !email) {
      Alert.alert("Error", "All fields are required!");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password && password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);

    if (password) {
      formData.append("password", password);
    }

    if (imageUri) {
      const fileName = imageUri.split("/").pop();
      formData.append("imageUrl", {
        uri: imageUri,
        name: fileName,
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.patch(
        `https://api.rnbsouldashboard.com/api/v1/user/update/single/${user?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status === 200) {
        Alert.alert("Success", "User Updated Successfully!");
        setPassword("");

        // Update user state
        const updatedUser = response.data.user;
        setUser(updatedUser);

        // Store the updated user in AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

        // Fetch user again to ensure the latest data is loaded
        fetchUser();
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error
      );
      Alert.alert("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchUser();
    setPassword("");
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="w-full">
            {/* Profile info */}
            <Card
              size="md"
              variant="filled"
              className="flex gap-2 my-2"
              style={styles.card}
            >
              {/* Info */}
              <View className="flex items-center gap-2">
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleSignOut}
                >
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>

                <View className="flex items-center">
                  {imageUri ? (
                    <View style={{ marginTop: 10 }}>
                      <Image
                        source={{ uri: imageUri }}
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: 100,
                        }}
                      />
                    </View>
                  ) : (
                    <Avatar size="2xl">
                      <AvatarImage
                        source={{
                          uri: `https://api.rnbsouldashboard.com${user?.imageUrl}`,
                        }}
                      />
                    </Avatar>
                  )}

                  {/* Camera icon */}
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      source={require("../../assets/images/cam.png")}
                      style={styles.cameraIcon}
                    />
                  </TouchableOpacity>
                </View>

                {/* Form Fields */}
                <View>
                  <FormControl
                    className="w-full mt-4"
                    size="md"
                    isRequired={true}
                  >
                    <Input className="w-full my-1">
                      <InputField
                        type="text"
                        placeholder="first name"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                      />
                    </Input>
                  </FormControl>

                  <FormControl size="md" isRequired={true}>
                    <Input className="my-1">
                      <InputField
                        type="text"
                        placeholder="last name"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                      />
                    </Input>
                  </FormControl>

                  <FormControl size="md" isRequired={true}>
                    <Input className="my-1">
                      <InputField
                        type="email"
                        placeholder="email address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                      />
                    </Input>
                  </FormControl>

                  <FormControl size="md" isRequired={true}>
                    <Input className="my-1">
                      <InputField
                        type="password"
                        placeholder="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                      />
                    </Input>
                  </FormControl>

                  {/* Upload Button */}
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>
                      {loading ? "Updating..." : "Update Info"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#38BF64",
    borderRadius: 50,
    width: "25%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  uploadButton: {
    backgroundColor: "#38BF64",
    borderRadius: 5,
    width: "45%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#38BF64",
    borderRadius: 50,
    width: "25%",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#FFFFFF",
    textAlign: "center",
  },
  postImage: {
    width: "100%",
    height: 400,
    maxHeight: 400,
  },
  card: {
    width: "100%",
    minHeight: "100vh",
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  noMoreText: { textAlign: "center", marginTop: 10, fontWeight: "bold" },
  cameraIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
    bottom: 10,
    right: -60,
  },
});

export default Settings;
