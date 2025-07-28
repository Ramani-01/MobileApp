import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import haversine from "haversine-distance";
import Toast from "react-native-toast-message";

const DESTINATION = {
  latitude: 9.878949851471612,
  longitude: 78.0821825720269,
};

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [notified, setNotified] = useState(false);
  const [distance, setDistance] = useState(null);

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
          // Location tracking callback
          const { latitude, longitude } = loc.coords;
          const userLocation = { latitude, longitude };
          setLocation(userLocation);

          const dist = haversine(userLocation, DESTINATION);
          setDistance(dist);

          if (dist < 100 && !notified) {
            showToast();
            setNotified(true);
          }
        }
      );
    })();
  }, []);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "🎉 You’ve arrived!",
      text2: "You are near your destination.",
      position: "top",
      visibilityTime: 3000,
    });
  };

  const formatDistance = (meters) => {
    if (typeof meters !== "number" || isNaN(meters)) return "Calculating...";
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(2)} km`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
          latitude: location?.latitude || DESTINATION.latitude,
          longitude: location?.longitude || DESTINATION.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapPadding={{ top: 100, right: 20, bottom: 100, left: 20 }}
      >
        {location && (
          <Marker coordinate={location} title="You" pinColor="blue" />
        )}
        <Marker coordinate={DESTINATION} title="Destination" />
      </MapView>

      {typeof distance === "number" && !isNaN(distance) && (
        <View style={styles.infoContainer}>
          <Text style={styles.distanceText}>
            📍 You are {formatDistance(distance)} away from your destination.
          </Text>
          {distance < 100 && (
            <Text style={styles.arrivalText}>🎉 You’ve arrived!</Text>
          )}
        </View>
      )}

      <Toast />
    </SafeAreaView>
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
  infoContainer: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "#ffffffee",
    padding: 12,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
    maxWidth: "90%",
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  arrivalText: {
    marginTop: 5,
    fontSize: 14,
    color: "#2e7d32",
    fontWeight: "600",
  },
});

export default MapScreen;
