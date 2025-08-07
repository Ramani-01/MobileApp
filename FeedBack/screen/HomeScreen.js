import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="home-outline" size={50} color="#4682B4" />
      <Text style={styles.title}>Welcome to the Event App!</Text>
      <Text style={styles.subtitle}>This is the Home Screen.</Text>
      <Text style={styles.description}>
        Use the bottom navigation bar to explore the app.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
});

export default HomeScreen;
