import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

// Use Warmup
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  useWarmUpBrowser();

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/images/getstarted.jpg")}
        />

        <Text style={styles.title}>Welcome to RNB Soul Radio!</Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: 500,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 20,
    color: "black",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#38BF64",
    borderRadius: 8,
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default LoginScreen;
