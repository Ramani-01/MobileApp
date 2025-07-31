import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Slider
} from 'react-native';
import { ScrollView } from 'react-native';

export default function FeedbackScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState(5);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = () => {
    if (!name || !email || !course) {
      Alert.alert('All fields are required!');
    } else if (!validateEmail(email)) {
      Alert.alert('Invalid email format!');
    } else {
      Alert.alert('Feedback submitted successfully!');
      console.log({ name, email, course, rating });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setName}
        value={name}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <Text style={styles.label}>Course</Text>
      <Picker
        selectedValue={course}
        style={styles.picker}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="--Select Course--" value="" />
        <Picker.Item label="React Native" value="react-native" />
        <Picker.Item label="Data Science" value="data-science" />
        <Picker.Item label="Web Development" value="web-dev" />
      </Picker>

      <Text style={styles.label}>Rate your learning experience: {rating}</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={rating}
        onValueChange={setRating}
      />

      <View style={styles.buttonContainer}>
        <Button title="Submit Feedback" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
  },
});
