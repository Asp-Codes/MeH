import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import Button from "../components/Button";
import { theme } from "../core/theme";
import { Alert } from "react-native";

const { width } = Dimensions.get("window");

export default function EmailVerifyScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [otp, setOtp] = useState({ value: "", error: "" });
  const [otpVisible, setOtpVisible] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await fetch("https://stressback.onrender.com/api/v1/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({
          email: email.value,
          otp: otp.value,
        }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log("Data: ", data);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("An error occurred. Please try again.");
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify Your Email</Text>
      <Text style={styles.subHeader}>Enter your email and the OTP sent to it</Text>

      {/* Email Input */}
      <TextInput
        style={styles.emailInput}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* OTP Input */}
      <View style={styles.otpWrapper}>
        <TextInput
          style={styles.otpInput}
          placeholder="Enter OTP"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          value={otp}
          secureTextEntry={!otpVisible}
          onChangeText={setOtp}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setOtpVisible(!otpVisible)}
        >
          <Text style={{ color: theme.colors.primary, fontSize: 14 }}>
            {otpVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={verifyEmail} style={styles.button}>
        Confirm
      </Button>

      <View style={styles.row}>
        <Text>Didn't receive OTP? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
    textAlign: "center",
  },
  emailInput: {
    width: width * 0.9, // 90% of screen width
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
    marginBottom: 16,
  },
  otpWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.9, // 90% of screen width
    marginBottom: 16,
  },
  otpInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
  },
  eyeIcon: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 24,
    width: width * 0.9, // 90% of screen width
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
