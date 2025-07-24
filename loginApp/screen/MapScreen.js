import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import haversine from "haversine-distance";

const DESTINATION = {
  latitude: 9.554115663989506,
  longitude: 78.57987163198425,
};

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) => {
          const { latitude, longitude } = loc.coords;
          setLocation({ latitude, longitude });

          const dist = haversine(
            { latitude, longitude },
            DESTINATION
          );

          if (dist < 100 && !notified) { // if within 100 meters
            sendNotification();
            setNotified(true);
          }
        }
      );
    })();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 You’ve arrived!",
        body: "You are near your destination.",
      },
      trigger: null, // Send immediately
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location?.latitude || DESTINATION.latitude,
          longitude: location?.longitude || DESTINATION.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && (
          <Marker coordinate={location} title="You" pinColor="blue" />
        )}
        <Marker coordinate={DESTINATION} title="Destination" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
