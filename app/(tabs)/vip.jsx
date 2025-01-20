import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";

const Vip = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");

  //   Handle Submit Form
  const handleSubmit = () => {
    console.log(firstName, lastName, email, phone, address, city);
  };

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
          <View>
            <Text style={styles.sectionTitle}>VIP PRICES</Text>
          </View>
          <View style={styles.cardContainer}>
            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>TAMPA - $900</Text>

              <Text style={styles.description}>
                (10 VIP WRIST BANDS, 10X10 TENT, 2 COUCHES & TABLE, 2 COOLER
                PASS)
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  Linking.openURL(`https://form.jotform.com/240668794184167`)
                }
              >
                <Text style={styles.buttonText}>BOOK VIP EXPERIENCE</Text>
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>ATLANTA - $1200</Text>

              <Text style={styles.description}>
                (10 VIP WRIST BANDS, 10X10 TENT , TABLE, 2 COOLER PASSES)
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  Linking.openURL(`https://form.jotform.com/240668794184167`)
                }
              >
                <Text style={styles.buttonText}>BOOK VIP EXPERIENCE</Text>
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>HIGH POINT NC - $1000</Text>

              <Text style={styles.description}>
                (10 VIP WRIST BANDS, 10X10 TENT, TABLE, 2 COOLER PASSES)
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  Linking.openURL(
                    `https://www.eventeny.com/events/ticket/?id=11287`
                  )
                }
              >
                <Text style={styles.buttonText}>BOOK VIP EXPERIENCE</Text>
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>NEW YORK - $1200</Text>

              <Text style={styles.description}>
                (10 VIP WRIST BANDS, 10X10 TENT, TABLE 2 COOLER PASSES)
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  Linking.openURL(`https://form.jotform.com/240668794184167`)
                }
              >
                <Text style={styles.buttonText}>BOOK VIP EXPERIENCE</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form */}
          <View>
            <Text style={styles.sectionTitle}>HAVE QUESTIONS?</Text>
          </View>

          <View className="w-full">
            {/* First Name */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>First Name</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="text"
                  placeholder="first name"
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                />
              </Input>
            </FormControl>

            {/* Last Name */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Last Name</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="text"
                  placeholder="last name"
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                />
              </Input>
            </FormControl>

            {/* Email  */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="email"
                  placeholder="email address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Input>
            </FormControl>

            {/* Phone */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Phone</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="number"
                  placeholder="phone number"
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </Input>
            </FormControl>

            {/* Address */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Address</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="text"
                  placeholder="address"
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                />
              </Input>
            </FormControl>

            {/* CITY YOUR INTERESTED IN */}
            <FormControl
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>
                  CITY YOUR INTERESTED IN
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="text"
                  placeholder="city your INTERESTED"
                  value={city}
                  onChangeText={(text) => setCity(text)}
                />
              </Input>
            </FormControl>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "semibold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#38BF64",
    borderRadius: 5,
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#FFFFFF",
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "100%",
  },
  card: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "inset 0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
    padding: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    color: "black",
  },
});

export default Vip;
