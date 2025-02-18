import React, { useContext } from "react";
import LoginScreenUi from "../../components/ui/LoginScreenUi/LoginScreenUi";
import { GlobalContext } from "../../context/GlobalContext";
import { Redirect } from "expo-router";

const LoginScreen = () => {
  const { user } = useContext(GlobalContext);

  if (user) return <Redirect href="/(tabs)/home" />;
  return <LoginScreenUi />;
};

export default LoginScreen;
