import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function Questions({ route, navigation }) {
  const { testId } = route.params;
  console.log(testId);
  
  const questions = [
    {
      question: "When you see a long to-do list in the morning, how does it make you feel?",
      options: ["Ready to conquer it", "A bit daunted but okay", "Stressed just looking at it", "Totally overwhelmed"]
    },
    {
      question: "After a busy day, what’s your experience with falling asleep?",
      options: ["Drift off easily", "Takes a little while", "Struggle for hours", "Hardly sleep at all"]
    },
    {
      question: "Thinking about the future, how frequently does anxiety creep in?",
      options: ["Hardly ever", "Every now and then", "Quite often", "Almost all the time"]
    },
    {
      question: "Do you feel you’re in control of your life, even with all your responsibilities?",
      options: ["Fully in control", "Mostly in control", "Hanging by a thread", "Feel like I have no control"]
    },
    {
      question: "After a typical day, how much energy do you have left?",
      options: ["Plenty", "Some", "Barely any", "None at all"]
    },
    {
      question: "An unexpected change in plans comes up. What’s your reaction?",
      options: ["No big deal", "Slightly stressed", "Fairly anxious", "Very upset and anxious"]
    },
    {
      question: "Would you describe your day as calm or tense?",
      options: ["Very calm", "Mostly calm", "Often tense", "Constantly tense"]
    },
    {
      question: "How quickly can you bounce back after something goes wrong?",
      options: ["Almost immediately", "After a little while", "Takes some time", "It sticks with me a long time"]
    },
    {
      question: "Focusing on tasks—how natural does it feel?",
      options: ["Almost always easy", "Somewhat easy", "Challenging", "Almost impossible"]
    },
    {
      question: "Are physical signs of stress, like headaches or backaches, a part of your day?",
      options: ["Hardly ever", "Sometimes", "Quite often", "All the time"]
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [answer, setAnswer] = useState('');

  const onSetAnswer = (value) => {
    setAnswer(value);
    setSelected(value);
  };

  const nextQuestion = async() => {
    const response = await fetch("https://stressback.onrender.com/api/v1/assessment/submit-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({assessmentId:testId,answer:answer}),
      credentials: "include",
    });

    console.log(response);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected('');
      setAnswer('');
    } else {
      const response = await fetch(`https://stressback.onrender.com/api/v1/assessment/get-score/${testId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        const assm = data.assessment;
        const stressLevel = assm.stressLevel;
        const score = assm.score;
        navigation.navigate("analytics", { stressLevel, score });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionBox}>
        <Text style={styles.questionNumber}>Question No {currentQuestionIndex + 1}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.questionText}>
          {questions[currentQuestionIndex].question}
        </Text>

        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSetAnswer(index)}
            style={[
              styles.optionBox,
              { 
                backgroundColor: selected === index ? '#006400' : 'transparent',
                borderColor: selected === index ? '#006400' : '#000' 
              }
            ]}
          >
            <Text style={[
              styles.optionText,
              { color: selected === index ? 'white' : '#333' }
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button 
        mode="contained" 
        onPress={nextQuestion} 
        labelStyle={styles.buttonText} 
        style={styles.submitButton}
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  questionBox: {
    backgroundColor: '#6EC1B7', // Your primary color
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
  },
  optionsContainer: {
    alignItems: 'center',
    backgroundColor: '#f1f8f9', // Lighter background color for the options
    padding: 20,
    borderRadius: 8,
    width: '100%',
  },
  questionText: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  optionBox: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 20,
    width: '60%',
    height: 50,
    backgroundColor: '#4C4C9D',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
