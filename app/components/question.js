import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function App() {
  const [answer, setAnswer] = useState('');
  const [selected, setSelected] = useState('');

  const onSetAnswer = (value) => {
    setAnswer(value);
    setSelected(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionBox}>
        <Text style={styles.questionNumber}>Question No 10</Text>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.questionText}>What do you believe is the main source of your stress?</Text>

        {['Work', 'Relationship', 'Financial Issues', 'Health Issues'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => onSetAnswer(option)}
            style={[
              styles.optionBox,
              { backgroundColor: selected === option ? 'green' : 'transparent' }
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button mode="contained" color="pink" onPress={() => console.log(answer)} labelStyle={styles.buttonText}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  questionBox: {
    backgroundColor: '#caf0f1',
    borderRadius: 5,
    padding: 10,
  },
  questionNumber: {
    fontSize: 35,
    textAlign: 'center',
  },
  optionsContainer: {
    alignItems: 'center',
    backgroundColor: '#caf0f1',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '90%',
  },
  questionText: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionBox: {
    padding: 15,
    borderWidth: 2,
    borderColor: 'black',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});

