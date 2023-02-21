import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import axios from "axios";
import { ApiKey } from "./ApiKey";
import * as Speech from "expo-speech";
import MapViewDirections from "react-native-maps-directions";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { queryParams } from "./Models";

const Directions: React.FunctionComponent<queryParams> = ({
  mode,
  origin,
  destination,
  avoid,
  language,
  traffic_model,
  units,
}) => {
  const [direction, setDirection] = React.useState("");
  const [lastDirection, setLastDirection] = React.useState("");

  const directionChanged = () => {
    if (!lastDirection) return true;
    const currentDirection = direction.replace(/[0-9]/g, "");

    const oldDirection = lastDirection.replace(/[0-9]/g, "");

    if (currentDirection !== oldDirection) return true;
    return false;
  };

  React.useEffect(() => {
    if (directionChanged()) {
      Speech.stop();
      Speech.speak(direction);
      setLastDirection(direction);
    }
  }, [direction]);

  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin?.latitude.toFixed(
      5
    )},${origin?.longitude.toFixed(
      5
    )}&destination=${destination?.latitude.toFixed(
      5
    )},${destination?.longitude.toFixed(5)}&key=${ApiKey}`,
    headers: {},
  };
  React.useEffect(() => {
    if (origin) {
      axios(config)
        .then(function (response) {
          if (!response?.data?.routes[0]?.legs[0]?.steps[0].html_instructions) {
            console.warn(
              "ERROR: Could not find valid directions from this location to that endpoint"
            );
            return;
          }

          setDirection(
            response.data.routes[0].legs[0].steps[0].html_instructions
              .replace(/(<([^>]+)>)/gi, "")
              .replace("Restricted usage road", "")
              .replace("Partial restricted usage road", "") +
              " for " +
              response.data.routes[0].legs[0].steps[0].distance.text
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [origin]);

  return (
    <View>
      {origin?.latitude && origin.longitude && (
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <MapViewDirections
            origin={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            apikey={ApiKey}
            strokeColor="red"
            strokeWidth={5}
            destination={destination}
          />
        </MapView>
      )}
      {direction && <Text>{direction}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "90%",
  },
});

export default Directions;
