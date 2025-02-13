import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import Feather from "@expo/vector-icons/Feather";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { router } from "expo-router";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import LikeButton from "../../components/ui/LikeButton/LikeButton";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUser();
  const [text, setText] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [posts, setPosts] = useState([]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImageUris([...imageUris, ...selectedUris]);
    }
  };

  // Create post
  const createPost = async () => {
    if (!user) return console.error("User not logged in.");

    if (!text && !imageUris.length)
      return Alert.alert("No text or images provided.");

    try {
      const formData = new FormData();
      formData.append("userId", user?.id);
      formData.append("text", text ? text : "");

      imageUris.forEach((uri, index) => {
        formData.append(`images`, {
          uri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });

      const res = await axios.post(
        "http://192.168.0.197:5000/api/v1/post/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res?.status === 201) {
        getPosts();
        setTimeout(() => {
          setText("");
          setImageUris([]);
        }, 300);
        Alert.alert("Post created successfully");
      }
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
    }
  };

  // Get posts
  const getPosts = async () => {
    try {
      const res = await axios.get("http://192.168.0.197:5000/api/v1/post/all");

      if (res?.status === 200) {
        setPosts(res?.data?.posts);
      }
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setText("");
    setImageUris([]);
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
            {/* Text Box */}
            <Textarea
              size="md"
              className="flex flex-row items-center w-full p-2"
            >
              <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
                <Avatar size="md">
                  <AvatarImage
                    source={{
                      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    }}
                  />
                </Avatar>
              </TouchableOpacity>

              <TextareaInput
                onChangeText={setText}
                placeholder="Your text goes here..."
              />
            </Textarea>

            {/* Post Images */}
            {Image && (
              <View
                className={`flex flex-row flex-wrap items-center justify-center ${
                  Image ? " rounded-md border-gray-300 mt-2" : ""
                }`}
              >
                {imageUris.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    style={{ width: 100, height: 100, margin: 5 }}
                    className="border border-gray-300 rounded-sm"
                  />
                ))}
              </View>
            )}
            <View className="flex flex-row items-center justify-between gap-2 my-2">
              {/* Image upload button */}
              <TouchableOpacity>
                <Feather
                  className="p-2 bg-[#38BF64] rounded-full"
                  name="image"
                  size={26}
                  color="white"
                  onPress={pickImages}
                />
              </TouchableOpacity>

              {/* Post button */}
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={createPost}>
                  POST
                </Text>
              </TouchableOpacity>
            </View>

            {/* Post card */}
            {posts?.map((post, index) => (
              <Card
                key={index}
                size="md"
                variant="filled"
                className="flex gap-2 my-2"
                style={styles.card}
              >
                <View className="flex flex-row items-center gap-2">
                  <TouchableOpacity
                    onPress={() => router.push("/(tabs)/settings")}
                  >
                    <Avatar size="md">
                      <AvatarImage
                        source={{
                          uri: post?.author?.imageUrl,
                        }}
                      />
                    </Avatar>
                  </TouchableOpacity>
                  <Heading size="md" className="mb-1">
                    {post?.author?.name}
                  </Heading>
                </View>
                <View>
                  {/* Content */}
                  {post?.text && (
                    <Text size="sm" className="text-justify">
                      {post?.text}
                    </Text>
                  )}

                  {/* Image */}
                  {post?.images && (
                    <>
                      {post?.images?.map((image, index) => (
                        <View className="flex gap-2 mt-2" key={index}>
                          <Image
                            source={{
                              uri: `http://192.168.0.197:5000${image}`,
                            }}
                            style={styles.postImage}
                          />
                        </View>
                      ))}
                    </>
                  )}
                </View>

                {/* Like button */}
                <LikeButton
                  postId={post.id}
                  userId={user.id}
                  initialLikes={post.likes}
                />
              </Card>
            ))}
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
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Home;
