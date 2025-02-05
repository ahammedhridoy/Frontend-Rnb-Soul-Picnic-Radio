import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { user } = useUser();

  console.log("user: " + user);

  return (
    <SafeAreaView>
      {user ? <Redirect href="/home" /> : <Redirect href="/login" />}
    </SafeAreaView>
  );
}
