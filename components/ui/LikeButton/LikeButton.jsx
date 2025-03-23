import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalContext } from "../../../context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LikeButton = ({ postId }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = React.useState(false);
  // Get single user
  const getUser = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const response = await axios.get(
        `http://192.168.0.104:5000/api/v1/user/single/${user?.id}`
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

  // Fetch latest like count from API
  const fetchLikes = async () => {
    if (!currentUser?.id) return;

    try {
      const res = await axios.get(
        `http://192.168.0.104:5000/api/v1/post/${postId}`
      );

      if (res?.status === 200 && Array.isArray(res?.data?.post?.likes)) {
        setLikes(res?.data?.post?.likes);
        setLiked(res?.data?.post?.likes.includes(currentUser?.id));
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [currentUser?.id]);

  const handleLikeToggle = async () => {
    try {
      const res = await axios.post(
        `http://192.168.0.104:5000/api/v1/post/${postId}/likes`,
        { userId: currentUser?.id }
      );

      if (res.status === 200 && Array.isArray(res?.data?.likes)) {
        setLikes(res?.data?.likes);
        setLiked(res?.data?.likes.includes(currentUser?.id));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLikeToggle}
      style={{ padding: 10 }}
      className="flex flex-row items-center gap-2"
    >
      <Text>
        {liked ? (
          <AntDesign name="heart" size={24} color="green" />
        ) : (
          <AntDesign name="hearto" size={24} color="green" />
        )}
      </Text>
      <Text>({likes.length})</Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
