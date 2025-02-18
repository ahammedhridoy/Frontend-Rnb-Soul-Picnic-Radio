import React, { useContext } from "react";
import SignupScreenUi from "../../components/ui/SignupScreenUi/SignupScreenUi";
import { Redirect } from "expo-router";
import { GlobalContext } from "@/context/GlobalContext";

const SignupScreen = () => {
  const { user } = useContext(GlobalContext);

  if (user) return <Redirect href="/(tabs)/home" />;
  return <SignupScreenUi />;
};

export default SignupScreen;
