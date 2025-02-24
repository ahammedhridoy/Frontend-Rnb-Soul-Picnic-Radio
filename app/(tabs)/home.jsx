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
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import Feather from "@expo/vector-icons/Feather";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
// import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import LikeButton from "../../components/ui/LikeButton/LikeButton";
import { GlobalContext } from "../../context/GlobalContext";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    const value = 20 + 20 * index;
    setData(posts.slice(0, value));
  }, [index, posts]);

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

  // Create Post
  const createPost = async () => {
    if (!user) return console.error("User not logged in.");

    if (!text && !imageUris.length)
      return Alert.alert("No text or images provided.");

    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("text", text || "");

      imageUris.forEach((uri, index) => {
        formData.append(`images`, {
          uri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });

      const res = await axios.post(
        "https://api.rnbsouldashboard.com/api/v1/post/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res?.status === 201) {
        getPosts();
        setText("");
        setImageUris([]);
        Alert.alert("Post created successfully");
      }
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
    }
  };

  // Get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get(
        "https://api.rnbsouldashboard.com/api/v1/post/all"
      );
      if (res?.status === 200) {
        setPosts(res?.data?.posts);
      }
    } catch (error) {
      console.error(
        "Error fetching posts:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getPosts();
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
        <>
          <View style={styles.header}>
            <Textarea size="md" style={styles.textarea}>
              <TouchableOpacity>
                <Avatar size="md">
                  <AvatarImage
                    source={{
                      uri: `https://api.rnbsouldashboard.com${user?.imageUrl}`,
                    }}
                  />
                </Avatar>
              </TouchableOpacity>
              <TextareaInput
                onChangeText={setText}
                value={text}
                placeholder="Your text goes here..."
              />
            </Textarea>
            {imageUris.length > 0 && (
              <View style={styles.imageContainer}>
                {imageUris.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    style={styles.imagePreview}
                  />
                ))}
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={pickImages}>
                <Feather
                  name="image"
                  size={26}
                  color="white"
                  style={styles.iconButton}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={createPost}>
                <Text style={styles.buttonText}>POST</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card
                key={item.index}
                size="md"
                variant="filled"
                style={styles.card}
              >
                <View style={styles.postHeader}>
                  <TouchableOpacity>
                    <Avatar size="md">
                      <AvatarImage
                        source={{
                          uri: `https://api.rnbsouldashboard.com${item?.author?.imageUrl}`,
                        }}
                      />
                    </Avatar>
                  </TouchableOpacity>
                  <Heading size="md">
                    {item?.author?.firstName} {item?.author?.lastName}
                  </Heading>
                </View>
                <Text size="sm" style={styles.postText}>
                  {item?.text}
                </Text>
                {item?.images?.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: `https://api.rnbsouldashboard.com${image}` }}
                    style={styles.postImage}
                  />
                ))}
                <LikeButton
                  postId={item?.id}
                  userId={user?.id}
                  initialLikes={item?.likes}
                />
              </Card>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={() =>
              data.length === posts.length ? (
                <Text style={styles.noMoreText}>No More Posts Available</Text>
              ) : (
                <ActivityIndicator size="large" color="#38BF64" />
              )
            }
            onEndReached={() => setIndex(index + 1)}
            onEndReachedThreshold={0.1}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { marginBottom: 20 },
  textarea: { flexDirection: "row", padding: 10, alignItems: "center" },
  imageContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  imagePreview: { width: 100, height: 100, margin: 5, borderRadius: 5 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconButton: { backgroundColor: "#38BF64", padding: 8, borderRadius: 50 },
  button: {
    backgroundColor: "#38BF64",
    borderRadius: 50,
    width: "25%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  card: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  postHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  postText: { marginVertical: 5 },
  postImage: { width: "100%", height: 400, borderRadius: 5 },
  noMoreText: { textAlign: "center", marginTop: 10, fontWeight: "bold" },
});

export default Home;
