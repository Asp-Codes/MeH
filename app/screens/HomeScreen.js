import React, { useState } from "react";

import { SafeAreaView, View, ScrollView, Text, Image, Alert, Dimensions } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import { TouchableOpacity } from "react-native"; // Use TouchableOpacity for interactive components

const screenWidth = Dimensions.get("window").width;

const screenHeight = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  const [emotionCounts, setEmotionCounts] = useState({
    happy: 0,
    calm: 0,
    sad: 0,
    depressed: 0,
  });

  const navigateToChatbot = () => {
    navigation.navigate('chatbot');
  };

  const icons = [
    { name: 'emoji-emotions', label: 'Happy', color: '#EF5DA8' },
    { name: 'nightlight-round', label: 'Calm', color: '#AEAFF7' },
    { name: 'sentiment-dissatisfied', label: 'Sad', color: '#F09E54' },
    { name: 'sentiment-very-dissatisfied', label: 'Depressed', color: '#A0E3E2' },
  ];
  
  // Function to update the emotion count
  const handleEmotionClick = (emotion) => {
    setEmotionCounts((prevCounts) => ({
      ...prevCounts,
      [emotion]: prevCounts[emotion] + 5, // Change increment from 1 to 5
    }));
  };
  const maxEmotion = Object.keys(emotionCounts).reduce((a, b) =>
    emotionCounts[a] > emotionCounts[b] ? a : b
  );

  const startTest = async () => {

    console.log("Starting test");

    try {

      const response = await fetch("https://stressback.onrender.com/api/v1/assessment/start-assessment", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        credentials: "include"

      });

      

      

      const rawResponse = await response.text();

      console.log("Raw Response:", rawResponse);

  

      // Attempt to parse JSON if the response is valid JSON

      const data = rawResponse ? JSON.parse(rawResponse) : null;

  

      console.log("Parsed Data:", data);

      

      if (response.ok && data) {

        const testId = data.assessmentId;

        navigation.navigate("questions", { testId: testId });

        console.log("hello");

      } else {

        Alert.alert("Test Failed", data?.message || "Invalid");

      }

    } catch (error) {

      Alert.alert("An error occurred. Please try again.");

      console.error(error);

    }

  };

  const emotionColors = {
    happy: '#EF5DA8',
    calm: '#AEAFF7',
    sad: '#F09E54',
    depressed: '#A0E3E2',
  };
  
  const stressLevel = "undef";
  const score = 10;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 14 }}
        contentContainerStyle={{ alignItems: 'flex-start' }}
      >
        {/* Welcome Section */}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 40, width: screenWidth, paddingHorizontal: 24 }}>
          <Text style={{ color: '#371B34', fontSize: 24 }}>Welcome back, Asp!</Text>
          {/* <Image source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }} resizeMode={'stretch'} style={{ width: 40, height: 40, borderRadius: 20 }} /> */}
        </View>

        {/* Emotion Tracker Section */}
        <View style={{ display: 'flex', flexDirection: 'column', width: screenWidth, justifyContent: 'space-between', alignItems: 'start', paddingHorizontal: 24 }}>
          <Text style={{ color: '#371B34', fontSize: 18, fontWeight: 'bold', paddingHorizontal: 0}}>How are you feeling today ?</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
            {icons.map((icon, index) => (
              <View
                key={index}
                style={{
                  width: 68,
                  height: 62,
                  backgroundColor: icon.color,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 6,
                }}
              >
                <Icon name={icon.name} size={30} color="#FFF" onPress={() => handleEmotionClick(icon.label.toLowerCase())} />
              </View>
            ))}
          </View>

          {/* Emotion Labels */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, marginHorizontal: 15 }}>
            <Text style={{ color: '#371B34', fontSize: 12, marginLeft: 8 }}>Happy</Text>
            <Text style={{ color: '#371B34', fontSize: 12 }}>Calm</Text>
            <Text style={{ color: '#371B34', fontSize: 12 }}>Sad</Text>
            <Text style={{ color: '#371B34', fontSize: 12 }}>Depressed</Text>
          </View>
        </View>

        {/* Emotion Score Section */}
        <View style={{ display: 'flex', flexDirection: 'column', width: screenWidth, justifyContent: 'space-between', alignItems: 'start', marginBottom: 20 }}>
          <Text style={{ color: '#371B34', fontSize: 22, marginBottom: 15, marginHorizontal: 24, fontWeight: 'bold' }}>Your Emotion Score</Text>
          <View
  style={{
    width: screenWidth - 48,
    height: 164,
    flexDirection: 'row',
    justifyContent: 'space-between',  // Changed to space-between for better alignment
    alignItems: 'center',  // Center the content vertically
    backgroundColor: emotionColors[maxEmotion],
    borderColor: '#ECE5FB',
    borderRadius: 8,
    paddingTop: 21,
    paddingBottom: 40,
    marginHorizontal: 30,
    paddingLeft: 20,  // Added padding for left side content alignment
    paddingRight: 20,  // Added padding for right side content alignment
  }}
>
  {/* Left section with text content */}
  <View style={{ width: '65%' }}>
    <Text style={{ color: '#371B34', fontSize: 20, marginBottom: 8, fontWeight: 'bold' }}>Emotion Tracker</Text>
    <Text style={{ color: '#371B34', fontSize: 15, marginBottom: 24, fontStyle: 'italic' }}>
      {`You're feeling ${maxEmotion.charAt(0).toUpperCase() + maxEmotion.slice(1)}!`}
    </Text>
    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
      {maxEmotion === 'happy'
        ? 'You are in good flow!'
        : maxEmotion === 'calm'
        ? 'That\'s good to see!'
        : maxEmotion === 'sad'
        ? 'Don\'t worry, you will feel fine soon!'
        : maxEmotion === 'depressed'
        ? 'Don\'t worry, you will be fine soon!'
        : 'Stay positive!'}
    </Text>
  </View>

  {/* Right section with percentage */}
  <View
    style={{
      width: 89,
      height: 84,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.6)', // Slight transparency for contrast
      borderRadius: 12,  // Slightly rounded corners
      padding: 10,  // Padding for better content spacing
    }}
  >
    <Text style={{ color: emotionColors[maxEmotion], fontSize: 18, fontWeight: 'bold' }}>
      {(() => {
        const totalEmotions = Object.values(emotionCounts).reduce((acc, count) => acc + count, 0);
        const percentage = totalEmotions > 0 ? ((emotionCounts[maxEmotion] / totalEmotions) * 100).toFixed(2) : 0;
        return `${percentage}%`;
      })()}
    </Text>
  </View>
</View>


        </View>

        {/* Stress Test and Analytics Section */}
        <View style={{ display: 'flex', flexDirection: 'column', width: screenWidth, justifyContent: 'space-between', alignItems: 'start', marginBottom: 20 }}>
          <Text style={{ color: '#371B34', fontSize: 23, marginBottom: 18, marginLeft: 24 }}>Take a stress test</Text>
          <TouchableOpacity

            style={{

              marginLeft: 40,

              backgroundColor: "#F09E54",

              width: screenWidth - 80,

              height: 52,

              borderRadius: 8,

              justifyContent: "center",

              alignItems: "center",

            }}

            onPress={startTest}

          >

            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>

              {"Start"}

            </Text>

          </TouchableOpacity>
          
          <TouchableOpacity

            style={{

              marginLeft: 40,

              backgroundColor: "#A0E3E2",

              width: screenWidth - 80,

              height: 52,

              borderRadius: 8,

              justifyContent: "center",

              alignItems: "center",
              marginTop: 14,

            }}

            onPress={() => navigation.navigate("analytics", { flag:false,stressLevel:stressLevel, score:score })}

          >

            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>

              {"Analytics"}

            </Text>

          </TouchableOpacity>

          {/* Fun Quote Section */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: screenWidth, paddingHorizontal: 40, marginTop: 16 }}>
            <Text style={{ color: '#371B34', fontSize: 16, marginLeft: 24, textAlign: 'center', fontStyle: 'italic' }}>
              "Remember, if stress burned calories, we'd all be supermodels! So don't worry, take care of yourself."
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Chatbot Floating Button */}
      <View style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 999 }}>
        <TouchableOpacity
          onPress={navigateToChatbot}
          style={{
            backgroundColor: '#4C4C9D',
            borderRadius: 50,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 24 }}>💬</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
