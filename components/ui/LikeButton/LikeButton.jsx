import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const LikeButton = ({ postId }) => {
  const { user } = useUser();
  const [likes, setLikes] = useState([]); // Default to an empty array
  const [liked, setLiked] = useState(false);

  // Fetch latest like count
  const fetchLikes = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.197:5000/api/v1/post/${postId}`
      );

      if (res.status === 200 && res.data.likes) {
        setLikes(res.data.likes || []); // Ensure likes is always an array
        setLiked(res.data.likes?.includes(user?.id) || false); // Check safely
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  const handleLikeToggle = async () => {
    try {
      const res = await axios.post(
        `http://192.168.0.197:5000/api/v1/post/${postId}/like`,
        { userId: user?.id }
      );

      if (res.status === 200 && res.data.likes) {
        setLikes(res.data.likes || []); // Ensure likes is an array
        setLiked(res.data.likes?.includes(user?.id) || false);
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
      <Text>({likes?.length || 0})</Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
