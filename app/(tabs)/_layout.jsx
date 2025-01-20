// app/home/_layout.tsx
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
        name="experience"
        options={{
          headerShown: true,
          title: "Experience",
          headerStyle: { backgroundColor: "#38BF64" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins-Bold" },
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="circle-info" size={24} color={color} />
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
    </Tabs>
  );
}
