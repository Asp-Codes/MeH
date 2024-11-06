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


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  const icons = [
    { name: "happy", label: "Happy", color: "#EF5DA8" },
    { name: "moon", label: "Calm", color: "#AEAFF7" },
    { name: "leaf", label: "Relax", color: "#F09E54" },
    { name: "eye", label: "Focus", color: "#A0E3E2" },
  ];
  
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
                    <Icon name={icon.name} size={30} color="#FFF" />
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
						{"Relax"}
					</Text>
					<Text
						style={{
							color: "#371B34",
							fontSize: 12,
						}}>
						{"Focus"}
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
						backgroundColor: "#FCDDEC",
						borderColor: "#ECE5FB",
						borderRadius: 8,
						// borderWidth: 1,
						paddingTop: 21,
						paddingBottom: 40,
						// marginBottom: 1,
						marginHorizontal: 30,
            // paddingHorizontal: 24,
					}}>
					<View
						style={{
							width: 189,
							// marginRight: 12,
						}}>
						<Text
							style={{
								color: "#371B34",
								fontSize: 20,
								marginBottom: 8,
                fontWeight:"bold",
                fontFamily:"Roboto",
							}}>
							{"Emotion tracker"}
						</Text>
						<Text
							style={{
								color: "#371B34",
								fontSize: 15,
								marginBottom: 24,
                fontStyle: "italic",
                fontWeight:"thin"
							}}>
							{"Kudos you are on a happy Mood"}
						</Text>
						<Text
							style={{
								color: "#EF5DA8",
								fontSize: 20,
                fontWeight: "bold",
							}}>
							{"Good Going"}
						</Text>
					</View>
					<View
						style={{
							width: 89,
							height: 84,
							borderColor: "#5E27FD",
							borderWidth: 1,
							marginTop: 19,
						}}>
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
						}}>
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
