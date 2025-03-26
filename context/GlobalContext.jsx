"use client";
import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const [blUsers, setBlUsers] = useState([]);
  console.log("blocked users: ", blUsers);
  // const [filteredPosts, setFilteredPosts] = useState([]);

  // console.log(currentUser);

  // Get single user
  const getUser = async () => {
    try {
      const userId = JSON.parse(await AsyncStorage.getItem("user"));
      const response = await axios.get(
        `https://api.rnbsouldashboard.com/api/v1/user/single/${userId?.id}`
      );
      if (response?.status === 200) {
        setCurrentUser(response?.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts excluding blocked users' posts

  // const filtered = () => {
  //   const blUserId = blUsers.map((user) => user.blockedId);

  //   const filteredPosts = posts.filter(
  //     (post) => !blUserId.includes(post.authorId)
  //   );
  //   setFilteredPosts(filteredPosts);
  // };

  // Block User
  const blockUser = async (blockUserId, blockUserName) => {
    try {
      if (!currentUser?.id || !blockUserId) {
        Alert.alert("Error", "Missing required information");
        return;
      }

      const response = await axios.post(
        "https://api.rnbsouldashboard.com/api/v1/user/block",
        {
          userId: currentUser?.id,
          blockUserId: blockUserId,
          blockUserName: blockUserName || "Unknown User", // Fallback name
        }
      );

      if (response.status === 201) {
        // Changed from 200 to 201 (created)
        Alert.alert("Success", "User blocked successfully");
        fetchBlockedUsers();
        getPosts();
      }
    } catch (error) {
      console.error("Error blocking user:", error);

      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (error.response.data.message === "You cannot block yourself") {
              Alert.alert("Error", "You cannot block yourself");
            } else if (
              error.response.data.message === "User is already blocked"
            ) {
              Alert.alert("Error", "User is already blocked");
            } else {
              Alert.alert("Error", "Invalid request");
            }
            break;
          case 404:
            Alert.alert("Error", "User not found");
            break;
          default:
            Alert.alert("Error", "Failed to block user");
        }
      } else {
        Alert.alert("Error", "Network error. Please try again.");
      }
    }
  };

  // Fetch blocked users
  const fetchBlockedUsers = async () => {
    try {
      if (!currentUser?.id) {
        console.error("User ID is undefined!");
        // Alert.alert("Error", "User not authenticated");
        return [];
      }

      const response = await axios.get(
        `https://api.rnbsouldashboard.com/api/v1/user/blocked/${currentUser.id}`
      );

      if (response.status === 200) {
        // The backend returns { blockedUsers: [...] }
        const blockedUsers = response.data.blockedUsers || [];
        getPosts();

        if (!Array.isArray(blockedUsers)) {
          console.error(
            "Received blocked users is not an array:",
            blockedUsers
          );
          return [];
        }

        setBlUsers(blockedUsers);
        return blockedUsers;
      }

      console.error("Unexpected response status:", response.status);
      return [];
    } catch (error) {
      console.error(
        "Error fetching blocked users:",
        error.response?.data?.message || error.message
      );

      // Show user-friendly error messages
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Alert.alert("Error", "Invalid request");
            break;
          case 404:
            Alert.alert("Error", "User not found");
            break;
          default:
            Alert.alert("Error", "Failed to load blocked users");
        }
      } else {
        Alert.alert("Error", "Network error. Please try again.");
      }

      return [];
    }
  };

  // Unblock user
  const unblockUser = async (unblockUserId) => {
    try {
      if (!currentUser?.id || !unblockUserId) {
        Alert.alert("Error", "Missing required information");
        return;
      }

      const response = await axios.post(
        "https://api.rnbsouldashboard.com/api/v1/user/unblock",
        {
          userId: currentUser.id,
          unblockUserId: unblockUserId,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "User unblocked successfully");
        fetchBlockedUsers();
        getPosts();
      }
    } catch (error) {
      console.error("Error unblocking user:", error);

      if (error.response) {
        switch (error.response.status) {
          case 400:
            Alert.alert(
              "Error",
              error.response.data.message || "Invalid request"
            );
            break;
          case 404:
            Alert.alert("Error", "Block record not found");
            break;
          default:
            Alert.alert("Error", "Failed to unblock user");
        }
      } else {
        Alert.alert("Error", "Network error. Please try again.");
      }
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
    fetchUser();
    getUser();
    getPosts();
    fetchBlockedUsers();
  }, [currentUser?.id]);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        fetchUser,
        posts,
        setPosts,
        getPosts,
        blockUser,
        fetchBlockedUsers,
        blUsers,
        setBlUsers,
        unblockUser,
        currentUser,
        setCurrentUser,
        // filteredPosts,
        // setFilteredPosts,
        getUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
