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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "expo-router";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import LikeButton from "../../components/ui/LikeButton/LikeButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBackdrop,
  AlertDialogHeader,
  AlertDialogBody,
} from "@/components/ui/alert-dialog";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../context/GlobalContext";
import { Button, ButtonText } from "@/components/ui/button";
const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [text, setText] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const { user, setUser, fetchUser, blUsers, unblockUser, fetchBlockedUsers } =
    useContext(GlobalContext);
  const [reports, setReports] = useState([]);

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowAlertDialog(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const handleCloseDelete = () => setShowDeleteDialog(false);
  const router = useRouter();
  const [imageUri, setImageUri] = useState(null);

  const [showReportDialog, setShowReportDialog] = React.useState(false);
  const handleReportClose = () => setShowReportDialog(false);

  const [showBlockDialog, setShowBlockDialog] = React.useState(false);
  const handleBlockClose = () => setShowBlockDialog(false);

  const [currentUser, setCurrentUser] = React.useState(false);

  // console.log(blUsers);

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

  const handleUnblock = (item) => {
    unblockUser(item?.blockedId);
    setShowBlockDialog(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  // if (!user) router.replace("/login");

  useEffect(() => {
    const value = 20 + 20 * index;
    setData(posts.slice(0, value));
  }, [index, posts]);

  // Pick user profile picture
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);

      // Clear the previous images when selecting new ones
      setImageUris(selectedUris);
    }
  };

  // Get posts
  const getUserPosts = async () => {
    if (!currentUser?.id) {
      console.error("User ID is undefined!");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.rnbsouldashboard.com/api/v1/post/user/${currentUser?.id}`
      );

      if (res?.status === 200) {
        setPosts(res?.data?.posts);
      }
    } catch (error) {
      console.error(
        "Error fetching user's posts:",
        error.response?.data || error.message
      );
    }
  };

  const fetchReports = async () => {
    try {
      if (!currentUser?.id) {
        console.error("User ID is undefined!");
        return;
      }
      const response = await axios.get(
        `https://api.rnbsouldashboard.com/api/v1/report/user/${currentUser?.id}`
      );

      if (response?.status === 200) {
        setReports(response?.data?.reports);
        return response.data;
      }
    } catch (error) {
      console.error(error.response.message);
      return [];
    }
  };

  // Usage Example (Pass the user ID)
  useEffect(() => {
    if (currentUser) {
      getUserPosts(currentUser.id);
    }
    fetchReports();
  }, [currentUser]);

  // Set Post Id
  const handleSetPostId = (post) => {
    setPostId(post?.id);
    setText(post?.text || "");
    setImageUris(
      post.images
        ? post.images.map((image) => `https://api.rnbsouldashboard.com${image}`)
        : []
    );
    setShowAlertDialog(true);
  };

  const handleSetDeleteId = (post) => {
    setPostId(post?.id);
    setShowDeleteDialog(true);
  };

  // Edit Post
  const handleEditPost = async () => {
    const formData = new FormData();
    try {
      // Append text
      formData.append("text", text);

      // Append images
      imageUris.forEach((uri, index) => {
        formData.append("images", {
          uri,
          type: "image/jpeg",
          name: `image-${index}.jpg`,
        });
      });

      const res = await axios.patch(
        `https://api.rnbsouldashboard.com/api/v1/post/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.status === 200) {
        Alert.alert("Post updated successfully");
        setShowAlertDialog(false);
        const userData = res?.data?.user;
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        fetchUser();
        await getUserPosts(currentUser?.id);
        setShowAlertDialog(false);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Delete Post
  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        `https://api.rnbsouldashboard.com/api/v1/post/${postId}`
      );

      if (res?.status === 200) {
        Alert.alert("Post deleted successfully");
        await getUserPosts(currentUser?.id);
        setShowDeleteDialog(false);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    getUserPosts(currentUser?.id);
    fetchUser();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (!currentUser) {
    return (
      <View>
        <Text className="text-center font-bold text-3xl mt-5">
          Please Logged In!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#38BF64" />
        </View>
      ) : (
        <View className="w-full">
          {/* Profile info */}
          {currentUser ? (
            <Card
              size="md"
              variant="filled"
              className="flex gap-2 my-2"
              style={styles.card}
            >
              <View className="flex flex-row ">
                <TouchableOpacity
                  onPress={() => setShowReportDialog(true)}
                  className="flex justify-end mx-auto"
                >
                  <Text className="p-2 bg-[#38BF64] text-white rounded">
                    View Report
                  </Text>
                </TouchableOpacity>
                {/* Report Dialog */}
                <AlertDialog
                  isOpen={showReportDialog}
                  onClose={handleReportClose}
                  size="md"
                >
                  <AlertDialogBackdrop />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <Heading
                        className="font-semibold text-typography-950"
                        size="md"
                      >
                        All Reports
                      </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                      {reports?.length > 0 ? (
                        <FlatList
                          data={reports}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => (
                            <View className="flex flex-col gap-4 p-2 my-2 rounded-md shadow-md bg-slate-500">
                              <Text className="mb-2 text-lg text-white">
                                Reason: {item?.reason}
                              </Text>
                              <Text className="mb-2 text-lg text-white">
                                Status: {item?.reportStatus}
                              </Text>
                            </View>
                          )}
                        />
                      ) : (
                        <View className="flex items-center justify-center">
                          <Text className="text-lg text-typography-950">
                            No Reports
                          </Text>
                        </View>
                      )}
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                      <Button
                        variant="outline"
                        action="secondary"
                        onPress={handleReportClose}
                        size="sm"
                      >
                        <ButtonText>Close</ButtonText>
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <TouchableOpacity
                  onPress={() => setShowBlockDialog(true)}
                  className="flex justify-end mx-auto"
                >
                  <Text className="p-2 bg-[#38BF64] text-white rounded">
                    View Blocked User
                  </Text>
                </TouchableOpacity>
                {/* Block Dialog */}
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
                        All Blocked Users
                      </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                      {blUsers?.length > 0 ? (
                        <FlatList
                          data={blUsers}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => (
                            <View className="flex flex-row items-center justify-between gap-4 p-2 my-2 rounded-md shadow-md bg-slate-500">
                              <Text className="mb-2 text-lg text-white">
                                Name: {item?.blockedName}
                              </Text>
                              <Text
                                onPress={() => handleUnblock(item)}
                                className="p-2 mb-2 text-lg text-white bg-green-500 rounded-full"
                              >
                                Unblock
                              </Text>
                            </View>
                          )}
                        />
                      ) : (
                        <View className="flex items-center justify-center">
                          <Text className="text-lg text-typography-950">
                            No Blocked Users Found
                          </Text>
                        </View>
                      )}
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                      <Button
                        variant="outline"
                        action="secondary"
                        onPress={handleBlockClose}
                        size="sm"
                      >
                        <ButtonText>Close</ButtonText>
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </View>
              {/* profile item */}
              <View>
                {/* Post card */}

                {posts && posts.length > 0 && (
                  <>
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
                          <View className="flex flex-row items-center gap-2">
                            <TouchableOpacity>
                              <Avatar size="md">
                                <AvatarImage
                                  source={{
                                    uri: `https://api.rnbsouldashboard.com${item?.author?.imageUrl}`,
                                  }}
                                />
                              </Avatar>
                            </TouchableOpacity>
                            <Heading size="md" className="mb-1">
                              {item?.author?.firstName} {item?.author?.lastName}
                            </Heading>
                          </View>
                          <View>
                            {/* Content */}
                            {item?.text && (
                              <Text size="sm" className="text-justify">
                                {item?.text}
                              </Text>
                            )}

                            {/* Image */}
                            {item?.images && (
                              <>
                                {item?.images?.map((image, index) => (
                                  <View className="flex gap-2 mt-2" key={index}>
                                    <Image
                                      source={{
                                        uri: `https://api.rnbsouldashboard.com${image}`,
                                      }}
                                      style={styles.postImage}
                                    />
                                  </View>
                                ))}
                              </>
                            )}
                          </View>

                          {/* Icon */}
                          <View className="flex flex-row justify-between gap-2">
                            {/* Like button */}
                            <LikeButton
                              postId={item?.id}
                              userId={currentUser?.id}
                              initialLikes={item?.likes}
                            />

                            <View className="flex flex-row items-center gap-2">
                              <TouchableOpacity
                                onPress={() => handleSetPostId(item)}
                              >
                                <FontAwesome
                                  name="edit"
                                  size={24}
                                  color="green"
                                />
                              </TouchableOpacity>{" "}
                              <TouchableOpacity
                                onPress={() => handleSetDeleteId(item)}
                              >
                                <MaterialIcons
                                  name="delete-forever"
                                  size={24}
                                  color="red"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>

                          {/* Edit Post Dialog */}
                          <AlertDialog
                            isOpen={showAlertDialog}
                            onClose={handleClose}
                            size="md"
                          >
                            <AlertDialogBackdrop />
                            <AlertDialogContent>
                              {/* Text Box */}
                              <Textarea
                                size="md"
                                className="flex flex-row items-center w-full p-2"
                              >
                                <TextareaInput
                                  onChangeText={setText}
                                  value={text}
                                />
                              </Textarea>
                              {/* Image upload button */}
                              <TouchableOpacity className="w-12 mt-2">
                                <Feather
                                  className="p-2 bg-[#38BF64] rounded-full"
                                  name="image"
                                  size={26}
                                  color="white"
                                  onPress={pickImages}
                                />
                              </TouchableOpacity>
                              {/* Post Images */}
                              {Image && (
                                <View
                                  className={`flex flex-row flex-wrap items-center justify-center ${
                                    Image
                                      ? " rounded-md border-gray-300 mt-2"
                                      : ""
                                  }`}
                                >
                                  {imageUris.map((uri, index) => (
                                    <Image
                                      key={index}
                                      source={{ uri }}
                                      style={{
                                        width: 100,
                                        height: 100,
                                        margin: 5,
                                      }}
                                      className="border border-gray-300 rounded-sm"
                                    />
                                  ))}
                                </View>
                              )}
                              <AlertDialogFooter className="">
                                <Text
                                  onPress={() => handleEditPost(postId)}
                                  className="p-2 text-white bg-black rounded-md"
                                >
                                  Update
                                </Text>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          {/* Delete Post Dialog */}
                          <AlertDialog
                            isOpen={showDeleteDialog}
                            onClose={handleCloseDelete}
                            size="md"
                          >
                            <AlertDialogBackdrop />
                            <AlertDialogContent>
                              {/* Text Box */}

                              <Text>Are you sure you want to delete this?</Text>
                              <AlertDialogFooter className="mt-2">
                                <Text
                                  onPress={handleCloseDelete}
                                  className="p-2 text-white bg-black rounded-md"
                                >
                                  Cancel
                                </Text>
                                <Text
                                  onPress={handleDeletePost}
                                  className="p-2 text-white bg-red-500 rounded-md"
                                >
                                  Delete
                                </Text>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </Card>
                      )}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                      ListFooterComponent={() =>
                        data.length === posts.length ? (
                          <Text style={styles.noMoreText}>
                            No More Posts Available
                          </Text>
                        ) : (
                          <ActivityIndicator size="large" color="#38BF64" />
                        )
                      }
                      onEndReached={() => setIndex(index + 1)}
                      onEndReachedThreshold={0.1}
                    />
                  </>
                )}
              </View>
            </Card>
          ) : (
            <View>Please Logged In.</View>
          )}
        </View>
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
    bottom: 60,
    right: 0,
  },
});

export default Profile;
