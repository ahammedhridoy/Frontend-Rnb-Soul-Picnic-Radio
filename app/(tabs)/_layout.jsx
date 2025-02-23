// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#38BF64",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          title: "Home",
          headerStyle: { backgroundColor: "#38BF64" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins-Bold" },
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="radio"
        options={{
          headerShown: true,
          title: "Radio",
          headerStyle: { backgroundColor: "#38BF64" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins-Bold" },
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="radio" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          headerShown: true,
          title: "Events",
          headerStyle: { backgroundColor: "#38BF64" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins-Bold" },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="vip"
        options={{
          headerShown: true,
          title: "VIP",
          headerStyle: { backgroundColor: "#38BF64" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins-Bold" },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="star" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="faq"
        options={{
          headerShown: true,
          title: "FAQ",
          headerStyle: { backgroundColor: "#38BF64" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins-Bold" },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="message" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
          headerStyle: { backgroundColor: "#38BF64" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins-Bold" },
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          headerStyle: { backgroundColor: "#38BF64" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins-Bold" },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
