import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { router } from "expo-router";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const Settings = () => {
  const [refreshing, setRefreshing] = useState(false);

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
                  onPress={() => router.push("/(tabs)/settings")}
                >
                  <Avatar size="2xl">
                    <AvatarImage
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    />
                  </Avatar>
                </TouchableOpacity>
                <Heading size="xl" className="mb-1">
                  Milla Jovovich
                </Heading>
              </View>

              {/* Settings item */}
              <View>
                {/* Post card */}
                <Card
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
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                          }}
                        />
                      </Avatar>
                    </TouchableOpacity>
                    <Heading size="md" className="mb-1">
                      Milla Jovovich
                    </Heading>
                  </View>
                  <View>
                    {/* Content */}
                    <Text size="sm" className="text-justify">
                      Start building your next project in minutes Lorem ipsum
                      dolor sit, amet consectetur adipisicing elit. Facilis quia
                      voluptatibus molestias. Repudiandae dicta dolores vel,
                      voluptatibus, voluptas illum exercitationem nesciunt,
                      asperiores harum possimus alias quidem esse earum ab
                      libero. Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Deserunt, ipsa vero. Quae earum eveniet
                      reiciendis esse dolore debitis distinctio ipsa nostrum.
                      Animi deleniti hic eligendi illo, voluptatem quas magni
                      inventore.
                    </Text>

                    {/* Image */}
                    <View className="flex gap-2 mt-2">
                      <Image
                        source={{
                          uri: "https://cdn.pixabay.com/photo/2024/09/20/01/37/al-seef-9060100_1280.jpg",
                        }}
                        style={styles.postImage}
                      />
                      <Image
                        source={{
                          uri: "https://cdn.pixabay.com/photo/2024/12/28/03/45/girl-9295191_1280.jpg",
                        }}
                        style={styles.postImage}
                      />
                    </View>
                  </View>
                  {/* Icon */}
                  <View className="flex flex-row justify-between gap-2">
                    <View className="flex flex-row items-center gap-2">
                      <TouchableOpacity>
                        <AntDesign
                          name="heart"
                          className="mt-2"
                          size={24}
                          color="green"
                        />
                      </TouchableOpacity>{" "}
                      <Text>256</Text>
                    </View>

                    <View className="flex flex-row items-center gap-2">
                      <TouchableOpacity>
                        <FontAwesome name="edit" size={24} color="green" />
                      </TouchableOpacity>{" "}
                      <TouchableOpacity>
                        <MaterialIcons
                          name="delete-forever"
                          size={24}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>

                {/* Post card */}
                <Card
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
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                          }}
                        />
                      </Avatar>
                    </TouchableOpacity>
                    <Heading size="md" className="mb-1">
                      Milla Jovovich
                    </Heading>
                  </View>
                  <View>
                    {/* Content */}
                    <Text size="sm" className="text-justify">
                      Start building your next project in minutes Lorem ipsum
                      dolor sit, amet consectetur adipisicing elit. Facilis quia
                      voluptatibus molestias. Repudiandae dicta dolores vel,
                      voluptatibus, voluptas illum exercitationem nesciunt,
                      asperiores harum possimus alias quidem esse earum ab
                      libero. Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Deserunt, ipsa vero. Quae earum eveniet
                      reiciendis esse dolore debitis distinctio ipsa nostrum.
                      Animi deleniti hic eligendi illo, voluptatem quas magni
                      inventore.
                    </Text>

                    {/* Image */}
                    <View className="flex gap-2 mt-2">
                      <Image
                        source={{
                          uri: "https://cdn.pixabay.com/photo/2024/09/20/01/37/al-seef-9060100_1280.jpg",
                        }}
                        style={styles.postImage}
                      />
                      <Image
                        source={{
                          uri: "https://cdn.pixabay.com/photo/2024/12/28/03/45/girl-9295191_1280.jpg",
                        }}
                        style={styles.postImage}
                      />
                    </View>
                  </View>
                  {/* Icon */}
                  <View className="flex flex-row justify-between gap-2">
                    <View className="flex flex-row items-center gap-2">
                      <TouchableOpacity>
                        <AntDesign
                          name="heart"
                          className="mt-2"
                          size={24}
                          color="green"
                        />
                      </TouchableOpacity>{" "}
                      <Text>256</Text>
                    </View>

                    <View className="flex flex-row items-center gap-2">
                      <TouchableOpacity>
                        <FontAwesome name="edit" size={24} color="green" />
                      </TouchableOpacity>{" "}
                      <TouchableOpacity>
                        <MaterialIcons
                          name="delete-forever"
                          size={24}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
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
  },
});

export default Settings;
