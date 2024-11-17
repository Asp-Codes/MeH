import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import Button from "../components/Button";
import { theme } from "../core/theme";

export default function EmailVerifyScreen({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpVisible, setOtpVisible] = useState(false);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (!isNaN(text) && text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Focus on the next input
      if (text !== "" && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const onConfirmPressed = () => {
    if (otp.join("").length === 6) {
      Alert.alert("OTP Verified Successfully!");
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    } else {
      Alert.alert("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify Your Email</Text>
      <Text style={styles.subHeader}>Enter the 6-digit OTP sent to your email</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={styles.inputWrapper}>
            <TextInput
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              secureTextEntry={!otpVisible}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          </View>
        ))}
        {/* Add the eye icon after the last box */}
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setOtpVisible(!otpVisible)}
        >
          <Icon
            name={otpVisible ? "visibility" : "visibility-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onConfirmPressed} style={styles.button}>
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
    fontSize: 26,
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
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  inputWrapper: {
    position: "relative",
    marginHorizontal: 5,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    color: "black",
    backgroundColor: "white",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    marginTop: 24,
    width: "80%",
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
