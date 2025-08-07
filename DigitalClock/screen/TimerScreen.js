import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import PopupModal from './PopupModal';
import styles from '../screen/Style';

const TimerScreen = ({ darkMode, navigation }) => {
  const [timerSeconds, setTimerSeconds] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning && countdown > 0) {
      interval = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (timerRunning && countdown === 0) {
      setTimerRunning(false);
      setModalVisible(true);
    }
    return () => clearInterval(interval);
  }, [timerRunning, countdown]);

  const startTimer = () => {
    const seconds = parseInt(timerSeconds);
    if (!isNaN(seconds) && seconds > 0) {
      setCountdown(seconds);
      setTimerRunning(true);
    }
  };

  const themeStyles = darkMode ? styles.dark : styles.light;

  return (
    <View style={[styles.container, themeStyles.background]}>
      <Text style={[styles.title, themeStyles.text]}>⏱ Timer</Text>

      <TextInput
        style={[styles.input, themeStyles.input]}
        keyboardType="numeric"
        placeholder="Enter seconds"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={timerSeconds}
        onChangeText={setTimerSeconds}
      />
      <View style={styles.buttonContainer}>
        <Button title="Start Timer" onPress={startTimer} />
      </View>

      {timerRunning && (
        <Text style={[styles.countdown, themeStyles.text]}>
          Time Remaining: {countdown}s
        </Text>
      )}

      <PopupModal
        darkMode={darkMode}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <View style={styles.buttonContainer}>
        <Button title="Back to Home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default TimerScreen;
