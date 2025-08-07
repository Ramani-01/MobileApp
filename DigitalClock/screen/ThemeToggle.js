import React from 'react';
import { View, Text, Switch } from 'react-native';
import styles from '../screen/Style';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  const themeStyles = darkMode ? styles.dark : styles.light;

  return (
    <View style={styles.switchContainer}>
      <Text style={themeStyles.text}>Dark Mode</Text>
      <Switch value={darkMode} onValueChange={setDarkMode} />
    </View>
  );
};

export default ThemeToggle;
