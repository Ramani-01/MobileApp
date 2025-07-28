import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter both email and password',
      });
      return;
    }

    try {
      const response = await fetch('http://192.168.20.120:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data.message || 'Invalid credentials',
        });
        return;
      }

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Welcome back, ${data.user.name}`,
      });

      setTimeout(() => {
        navigation.navigate('MapScreen');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Something went wrong. Try again later.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: '#0066cc',
    textAlign: 'center',
    marginTop: 8,
  },
});
