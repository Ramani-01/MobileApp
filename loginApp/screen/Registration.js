import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const Registration = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Info',
        text2: 'Please fill out all fields.',
      });
      return;
    }

    try {
      const response = await fetch('http:// 10.10.32.21:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: data.message || 'Something went wrong.',
        });
        return;
      }

      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: `Welcome, ${username}!`,
      });

      // Redirect to login after short delay
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);

    } catch (error) {
      console.error('Register error:', error);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Could not connect to server.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={handleRegister} />

      <Toast />
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
                                                                                                                                                                   