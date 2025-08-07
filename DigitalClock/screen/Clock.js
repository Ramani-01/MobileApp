// screen/Clock.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import styles from '../screen/Style';

const Clock = ({ darkMode }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const themeStyles = darkMode ? styles.dark : styles.light;

  // Get time units
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Convert to angles
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60) * 360;
  const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  const center = 100;
  const radius = 90;

  // Function to convert angle to x,y coords
  const getCoord = (angle, length) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + length * Math.cos(rad),
      y: center + length * Math.sin(rad),
    };
  };

  const sec = getCoord(secondAngle, radius - 10);
  const min = getCoord(minuteAngle, radius - 20);
  const hr = getCoord(hourAngle, radius - 40);

  return (
    <View style={{ alignItems: 'center', marginBottom: 40 }}>
      {/* Digital Clock */}
      <Text style={[styles.clock, themeStyles.text]}>
        {time.toLocaleTimeString()}
      </Text>

      {/* Analog Clock */}
      <Svg height="200" width="200">
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={darkMode ? '#fff' : '#000'}
          strokeWidth="4"
          fill="none"
        />

        {/* Hour Hand */}
        <Line
          x1={center}
          y1={center}
          x2={hr.x}
          y2={hr.y}
          stroke="#007BFF"
          strokeWidth="6"
        />

        {/* Minute Hand */}
        <Line
          x1={center}
          y1={center}
          x2={min.x}
          y2={min.y}
          stroke="#28A745"
          strokeWidth="4"
        />

        {/* Second Hand */}
        <Line
          x1={center}
          y1={center}
          x2={sec.x}
          y2={sec.y}
          stroke="#DC3545"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

export default Clock;
