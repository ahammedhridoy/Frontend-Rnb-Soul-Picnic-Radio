import React, { useContext, useEffect, useMemo, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const defaultImageUri = "/assets/images/defaultImage.png";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const {
    user,
    blockUser,
    posts,
    getPosts,
    blUsers,
    // filteredPosts,
    fetchBlockedUsers,
  } = useContext(GlobalContext);
  const [showReportDialog, setShowReportDialog] = React.useState(false);
  const handleClose = () => setShowReportDialog(false);
  const [reason, setReason] = useState("");
  const [report, setReport] = useState(null);
  const [showBlockDialog, setShowBlockDialog] = React.useState(false);
  const handleBlockClose = () => setShowBlockDialog(false);
  const [currentUser, setCurrentUser] = React.useState(false);

  // console.log("blocked users: ", blUsers);
  // console.log("report: ", report);

  // Get single user
  const getUser = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const response = await axios.get(
        `https://api.rnbsouldashboard.com/api/v1/user/single/${user?.id}`
      );
      if (response?.status === 200) {
        setCurrentUser(response?.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const router = useRouter();
  // if (!user) router.replace("/login");

  useEffect(() => {
    const value = 20 + 20 * index;
    setData(posts.slice(0, value));
  }, [index, posts]);

  // Handle block
  const handleBlockPress = (item) => {
    setShowBlockDialog(true);
    blockUser(item?.authorId, item?.author?.firstName);
    setShowBlockDialog(false);
  };

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
    if (!currentUser) return console.error("User not logged in.");

    if (!text && !imageUris.length)
      return Alert.alert("No text or images provided.");

    try {
      const formData = new FormData();
      formData.append("userId", currentUser?.id);
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
        fetchBlockedUsers();
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

  // Filter posts excluding blocked users' posts
  // Full implementation with safety checks:
  const blUserId = blUsers?.map((user) => user?.blockedId);
  const filteredPosts = posts?.filter(
    (post) => !blUserId.includes(post?.authorId)
  );

  // console.log(currentUser);
  // console.log("Filtered Postsss:", filteredPosts);

  // Handle report
  const handleReportPress = (item) => {
    setShowReportDialog(true);
    setReport(item);
  };

  // Report Post
  const reportPost = async () => {
    try {
      if (!currentUser) return console.error("User not logged in.");
      if (!reason) return Alert.alert("Please provide a reason.");
      const response = await axios.post(
        "https://api.rnbsouldashboard.com/api/v1/report/register",
        {
          postId: report.id,
          reporterId: currentUser?.id,
          reason,
        }
      );

      if (response.status === 400) {
        Alert.alert("Post already reported");
      } else if (response.status === 201) {
        Alert.alert("Post reported successfully");
      }

      setShowReportDialog(false);
    } catch (error) {
      console.error("Error reporting post:", error);
      Alert.alert("Error reporting post. Please try again.");
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
          {currentUser && (
            <View style={styles.header}>
              <Textarea size="md" style={styles.textarea}>
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
          )}
          <FlatList
            data={filteredPosts}
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
                          uri: item?.author?.imageUrl
                            ? `https://api.rnbsouldashboard.com${item?.author?.imageUrl}`
                            : defaultImageUri,
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
                {currentUser && (
                  <LikeButton
                    postId={item?.id}
                    userId={currentUser?.id}
                    initialLikes={item?.likes}
                  />
                )}

                {currentUser?.id !== item?.authorId && (
                  <View className="flex-row justify-between">
                    <TouchableOpacity onPress={() => handleReportPress(item)}>
                      {currentUser && (
                        <Text className="text-red-600">Report Post</Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleBlockPress(item)}>
                      {currentUser && (
                        <Text className="text-slate-600">Block User</Text>
                      )}
                    </TouchableOpacity>
                    {/* Dialog */}
                    <AlertDialog
                      isOpen={showBlockDialog}
                      onClose={handleBlockClose}
                      size="md"
                    >
                      <AlertDialogBackdrop />
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <Heading
                            className="font-semibold text-typography-950"
                            size="md"
                          >
                            Are you sure you want to block this user?
                          </Heading>
                        </AlertDialogHeader>

                        <AlertDialogFooter className="">
                          <TouchableOpacity onPress={handleBlockClose}>
                            <Text>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            className="p-2 bg-red-600 rounded"
                            onPress={() => blockUser(item?.authorId)}
                          >
                            <Text className="text-white">Block</Text>
                          </TouchableOpacity>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </View>
                )}

                {/* Dialog to report post */}
                <AlertDialog
                  isOpen={showReportDialog}
                  onClose={handleClose}
                  size="md"
                >
                  <AlertDialogBackdrop />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <Heading
                        className="font-semibold text-typography-950"
                        size="md"
                      >
                        Explain your reason for reporting this post
                      </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                      <Textarea size="md" style={styles.textarea}>
                        <TextareaInput
                          onChangeText={setReason}
                          value={reason}
                          placeholder="Your text goes here..."
                        />
                      </Textarea>
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                      <TouchableOpacity onPress={handleClose}>
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="p-2 bg-red-600 rounded"
                        onPress={reportPost}
                      >
                        <Text className="text-white">Submit</Text>
                      </TouchableOpacity>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
