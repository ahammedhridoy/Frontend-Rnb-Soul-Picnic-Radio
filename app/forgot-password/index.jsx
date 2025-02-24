import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Redirect } from "expo-router";
import ForgotPassword from "../../components/ui/ForgotPassword/ForgotPassword";

const LoginScreen = () => {
  const { user } = useContext(GlobalContext);

  if (user) return <Redirect href="/(tabs)/home" />;
  return <ForgotPassword />;
};

export default LoginScreen;
