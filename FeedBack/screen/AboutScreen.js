// screens/AboutScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>ℹ️ About</Text>
    <Text style={styles.textCenter}>
      This app was created to collect feedback from participants of our course.
    </Text>
    <Text style={styles.textCenter}>
      Navigate to "Feedback" tab to fill out the form.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
});

export default AboutScreen;
