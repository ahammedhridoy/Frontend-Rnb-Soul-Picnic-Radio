import { SafeAreaView, StyleSheet } from "react-native";
import { Redirect, useRootNavigationState, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Index() {
  const { user } = useContext(GlobalContext);

  const rootNavigationState = useRootNavigationState();

  const checkNav = () => {
    if (!rootNavigationState.kay) {
      return null;
    }
  };

  useEffect(() => {
    checkNav();
  }, []);

  return (
    <SafeAreaView>
      {user ? <Redirect href="/home" /> : <Redirect href="/login" />}
    </SafeAreaView>
  );
}
