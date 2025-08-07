import React from 'react';
import { View, Text, Button } from 'react-native';
import Clock from '../screen/Clock';
import ThemeToggle from '../screen/ThemeToggle';
import styles from '../screen/Style';

const HomeScreen = ({ navigation, darkMode, setDarkMode }) => {
  const themeStyles = darkMode ? styles.dark : styles.light;

  return (
    <View style={[styles.container, themeStyles.background]}>
      <Clock darkMode={darkMode} />
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Button title="Go to Timer" onPress={() => navigation.navigate('Timer')} />
    </View>
  );
};

export default HomeScreen;
