// import React from "react";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, } from "react-native";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {

//   const userId= navigation.getParam("userId");
  const [emotionCounts, setEmotionCounts] = useState({
    happy: 0,
    calm: 0,
    sad: 0,
    depressed: 0,
  });

  // Function to update the emotion count
  const handleEmotionClick = (emotion) => {
    setEmotionCounts((prevCounts) => ({
      ...prevCounts,
      [emotion]: prevCounts[emotion] + 1,
    }));
  };

  // Determine the emotion with the maximum count
  const maxEmotion = Object.keys(emotionCounts).reduce((a, b) =>
    emotionCounts[a] > emotionCounts[b] ? a : b
  );


  const startTest = async() =>{
	const response = await fetch("http://localhost:9000//api/v1/assessment/start-assessment", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify({}),
	});
	const data = await response.json();
	console.log(data);
	if (response.ok && data.success) {
	  const testId = data.assessmentId;
	  navigation.navigate("Test", {testId: testId});
	} else {
	  Alert.alert("Test Failed", data.message || "Invalid");
	}
  }
  const icons = [
    { name: "happy", label: "Happy", color: "#EF5DA8" },
    { name: "moon", label: "Calm", color: "#AEAFF7" },
    { name: "leaf", label: "Sad", color: "#F09E54" },
    { name: "eye", label: "depressed", color: "#A0E3E2" },
  ];

  const emotionColors = {
    happy: "#EF5DA8",
    calm: "#AEAFF7",
    sad: "#F09E54",
    depressed: "#A0E3E2",
  };
  
  return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView
  style={{
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 14,
  }}
  contentContainerStyle={{
    alignItems: "flex-start",
  }}>

				
				<View
					style={{
            display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 16,
            marginTop: 40,
            width: screenWidth,
            paddingHorizontal: 24,
						// marginHorizontal: 32,
            // backgroundColor: "#000000",
					}}>
            
					<Text
						style={{
							color: "#371B34",
							fontSize: 24,
						}}>
						{"Welcome back, Asp!"}
					</Text>

					<Image
						source = {{uri: "https://i.imgur.com/1tMFzp8.png"}}
						resizeMode = {"stretch"}
						style={{
							width: 40,
							height: 40,
              borderRadius: 20,
						}}
					/>

				</View>

      <View
       style={{
          display: "flex",
          flexDirection: "column",
          width: screenWidth,
          justifyContent: "space-between",
          alignItems: "start",
          // marginBottom: 20,
          paddingHorizontal: 24,
        }}
      >
				<Text
					style={{
						color: "#371B34",
						fontSize: 18,
            fontWeight: "bold",
            paddingHorizontal: 4,
					}}>
					{"How are you feeling today ?"}
				</Text>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginVertical: 10,
						// marginHorizontal: 35,
					}}>
            {icons.map((icon, index) => (
                  <View
                    key={index}
                    style={{
                      width: 68,
                      height: 62,
                      backgroundColor: icon.color,
                      borderRadius: 12,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 6,
                    }}
                  >
                    <Icon name={icon.name} size={30} color="#FFF"   onPress={() => handleEmotionClick(icon.label.toLowerCase())}/>
                  </View>
            ))}
				
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 18,
						marginHorizontal: 15,
					}}>
					<Text
						style={{
							color: "#371B34",
							fontSize: 12,
              marginLeft: 8,
						}}>
						{"Happy"}
					</Text>
					<Text
						style={{
							color: "#371B34",
							fontSize: 12,
              
						}}>
						{"Calm"}
					</Text>
					<Text
						style={{
							color: "#371B34",
							fontSize: 12,
						}}>
						{"sad"}
					</Text>
					<Text
						style={{
							color: "#371B34",
							fontSize: 12,
						}}>
						{"depressed"}
					</Text>
				</View>
        </View>


      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: screenWidth,
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: 20,
          // paddingHorizontal: 24,
        }}
      >  
				<Text
					style={{
						color: "#371B34",
						fontSize: 22,
						marginBottom: 15,
						marginHorizontal: 32,
            fontWeight: "bold",
					}}>
					{"Your Emotion score"}
				</Text>
				<View
  style={{
    width: screenWidth - 48,
    height: 164,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: emotionColors[maxEmotion], // Dynamically set background color
    borderColor: "#ECE5FB",
    borderRadius: 8,
    paddingTop: 21,
    paddingBottom: 40,
    marginHorizontal: 30,
  }}
>
  <View style={{ width: 189 }}>
    <Text style={{ color: "#371B34", fontSize: 20, marginBottom: 8, fontWeight: "bold" }}>
      {"Emotion Tracker"}
    </Text>
    <Text style={{ color: "#371B34", fontSize: 15, marginBottom: 24, fontStyle: "italic" }}>
      {`You're feeling ${maxEmotion.charAt(0).toUpperCase() + maxEmotion.slice(1)}!`}
    </Text>
    <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
      {
        maxEmotion === "happy"
          ? "Don't worry, you will be happy soon!"
          : maxEmotion === "calm"
          ? "Don't worry, you will be calm soon!"
          : maxEmotion === "sad"
          ? "Don't worry, you will feel be fine soon!"
          : maxEmotion === "depressed"
          ? "Don't worry, you will be fine soon!"
          : "Stay positive!"
      }
    </Text>
  </View>
  <View
    style={{
      width: 89,
      height: 84,
      borderColor: "#5E27FD",
      borderWidth: 1,
      marginTop: 19,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text
      style={{
        color: "#371B34",
        fontSize: 20,
        fontWeight: "bold",
      }}
    >
    {
            (() => {
              const totalEmotions = Object.values(emotionCounts).reduce((acc, count) => acc + count, 0);
              const percentage = totalEmotions > 0 ? ((emotionCounts[maxEmotion] / totalEmotions) * 100).toFixed(2) : 0;
              return `${percentage}%`;
            })()
          }{/* Display the score for the max emotion */}
    </Text>
  </View>
</View>
	
					
        </View>


      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: screenWidth,
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: 20,
          // paddingHorizontal: 24,
        }}
      >
				<Text
					style={{
						color: "#371B34",
						fontSize: 23,
						marginBottom: 18,
						marginLeft: 37,
					}}>
					{"Take a stress test"}
				</Text>

				<View
				onPress={startTest}
					style={{
						width: screenWidth-60,
						height: 53,
            justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#F09E54",
						borderColor: "#ECE5FB",
						borderRadius: 5,
						// borderWidth: 1,
						// paddingVertical: 19,
						marginBottom: 11,
						marginHorizontal: 40,
					}}>
					<Text
						style={{
							color: "#FFFFFF",
							fontSize: 16,
              fontWeight: "bold",
						}}
						>
						{"Test now"}
					</Text>
				</View>

        <View
					style={{
						width: screenWidth-60,
						height: 53,
            justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#AEAFF7",
						borderColor: "#ECE5FB",
						borderRadius: 5,
						// borderWidth: 1,
						// paddingVertical: 19,
						marginBottom: 11,
						marginHorizontal: 42,
					}}>
					<Text
						style={{
							color: "#FFFFFF",
							fontSize: 16,
              fontWeight: "bold",
						}}>
						{"Analytics"}
					</Text>
				</View>


        <View 
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: screenWidth,
            paddingHorizontal: 40,

          }} >
				<Text
					style={{
						color: "#371B34",
						fontSize: 16,
						marginLeft: 24,
            textAlign: "center",
            fontStyle: "italic",
						// width: 308,
					}}>
					{`"Remember, if stress burned calories, we'd all be supermodels! So take a deep breath and let the cookies do their magic."`}
				</Text>
        </View>
        </View>
			</ScrollView>
		</SafeAreaView>
	);
}

