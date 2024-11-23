import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon from react-native-vector-icons
import { useNavigation } from '@react-navigation/native'; // Import navigation for back action

const GEMINI_API_KEY = "AIzaSyDHoAhrc2a61YI5jlODtbYtmDfou2FXxW8";

// Define message type with strict sender values
type Message = {
  text: string;
  sender: "user" | "gemini";
};

const Cpp = () => {
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const navigation = useNavigation(); // Hook to get navigation object

  useEffect(() => {
    // Initial message from chatbot 404
    const initialMessage: Message = { 
      text: "Hi! I'm 404AI, here to help you with mental health-related issues. Feel free to ask me anything about mental health!", 
      sender: 'gemini' 
    };
    setMessages([initialMessage]); // Add initial message to state
  }, []);

  const handleButtonClick = async () => {
    if (!msg.trim()) return;
  
    // Add user message to the list
    const userMessage: Message = { text: msg, sender: 'user' };
    setMessages(prevMessages => [userMessage, ...prevMessages]);
    setMsg(""); // Clear the input
  
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: msg,
                },
              ],
            },
          ],
        }),
      });
  
      const data = await response.json();
      console.log("Full API Response:", data);
  
      const content = data.candidates?.[0]?.content;
      console.log("Content:", content);
  
      // If there's no content or it's undefined
      if (!content) {
        const errorMessage: Message = { text: "No response from Gemini.", sender: 'gemini' };
        setMessages(prevMessages => [errorMessage, ...prevMessages]);
        return;
      }
  
      // Extract the text content
      let reply = content?.parts?.[0]?.text || "No response";
  
      // Remove bold tags (HTML or Markdown)
      reply = reply.replace(/<\/?b>/g, "")         // Remove <b> tags
      .replace(/<\/?strong>/g, "")  // Remove <strong> tags
      .replace(/\*\*/g, "")        // Remove ** for markdown bold
      .replace(/\*/g, "");  
  
      // Add Gemini response to the list
      const geminiMessage: Message = { text: reply, sender: 'gemini' };
      setMessages(prevMessages => [geminiMessage, ...prevMessages]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = { text: "Error occurred while processing your request.", sender: 'gemini' };
      setMessages(prevMessages => [errorMessage, ...prevMessages]);
    }
  };
  

  const messageSave = (text: string) => {
    setMsg(text);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.geminiMessage]}>
      <Text style={[styles.messageText, item.sender === 'user' ? styles.userMessageText : styles.geminiMessageText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
     
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>404AI</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted // To make sure new messages appear at the bottom
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything about mental health..."
          value={msg}
          onChangeText={messageSave}
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.note}>Please note: I can only respond to mental health-related questions.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // White background for the container
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messagesContainer: {
    padding: 10,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#EF5DA8', // Happy color for user messages
    alignSelf: 'flex-end',
  },
  geminiMessage: {
    backgroundColor: '#F09E54', // Calm color for Gemini (bot) messages
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white', // Default text color in messages
  },
  userMessageText: {
    color: 'white', // Text color for user messages
  },
  geminiMessageText: {
    color: 'white', // Text color for Gemini (bot) messages
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: '#121212',
    borderTopColor: "#fff",
    borderBottomWidth: 0.5,// White background for input area
    borderBottomColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F000', // Light grey background for the input field
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#414141', // Relax color for the border
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 48,
    color: 'white', // Text color in the input field
  },
  button: {
    backgroundColor: '#4C4C9D', // Relax color for button
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  note: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
});

export default Cpp;
