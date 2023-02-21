import { useEffect, useState } from "react";

import * as Location from "expo-location";
import { locationObj, queryParams } from "./Models";
import Directions from "./Directions";

export default function PropProvider() {
  const [location, setLocation] = useState<locationObj>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      await Location.watchPositionAsync(
        { distanceInterval: 10 },
        (location: {
          coords: {
            latitude: number;
            longitude: number;
          };
        }) => {
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );
    })();
  }, []);



  return (
    <>
      <Directions 
      mode="driving" 
      origin={location}
      destination={{latitude:26.376032, longitude:-80.122360}}
      avoid={undefined}
      language="en"
      traffic_model={undefined}
      units="imperial"
      />
    </>
  );
}
