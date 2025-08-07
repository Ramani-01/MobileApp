// screens/FeedbackScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const FeedbackScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !course) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Enter a valid email address.');
      return;
    }

    Alert.alert('Success', 'Feedback submitted successfully!');
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setCourse('');
    setRating(5);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Feedback Form</Text>

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Course:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => setCourse(itemValue)}
        >
          <Picker.Item label="Select Course" value="" />
          <Picker.Item label="Web Development" value="Web Dev" />
          <Picker.Item label="Data Science" value="Data Science" />
          <Picker.Item label="AI & ML" value="AI ML" />
        </Picker>
      </View>

      <Text style={styles.label}>Rate your learning experience:</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={rating}
        onValueChange={setRating}
      />
      <Text style={styles.ratingText}>Rating: {rating}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <View style={{ height: 10 }} />
        <Button title="Clear" onPress={handleClear} color="red" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'white',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginTop: 5,
    overflow: 'hidden',
  },
  ratingText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default FeedbackScreen;
