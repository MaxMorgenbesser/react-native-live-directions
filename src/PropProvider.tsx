import { useEffect, useState } from "react";

import * as Location from "expo-location";
import { locationArray, queryParams } from "./Models";
import Directions from "./Directions";

export default function PropProvider() {
  const [location, setLocation] = useState<locationArray>();

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
            latitude: Number;
            longitude: Number;
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
      destination="3151+clint+moore+road,+boca+raton+florida"
      avoid={undefined}
      language="en"
      traffic_model={undefined}
      units="imperial"
      />
    </>
  );
}
