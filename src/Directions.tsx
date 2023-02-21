import * as React from "react";
import { SafeAreaView, Text } from "react-native";
import * as Speech from "expo-speech";


import axios from "axios";
import { ApiKey } from "./ApiKey";


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
  const [lastDirection, setLastDirection] = React.useState("")

  const directionChanged = () =>{
    if (!lastDirection) return true
    const currentDirection = direction.replace(/[0-9]/g, '');
    
    const oldDirection = lastDirection.replace(/[0-9]/g, '')

    console.log(currentDirection + "\n" + oldDirection)
    if (currentDirection !== oldDirection) return true
    return false
  }

  


  React.useEffect(() => {
    if (directionChanged()) {
      Speech.stop()
      Speech.speak(direction);
      setLastDirection(direction)
    }
  }, [direction]);

  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin?.latitude.toFixed(5)},${origin?.longitude.toFixed(5)}&destination=${destination}&key=${ApiKey}`,
    headers: {},
  };
  React.useEffect(() => {
    if (origin){
    axios(config)
      .then(function (response) {
        // console.log(response.data)
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


  return <SafeAreaView>{direction && <Text>{direction}</Text>}</SafeAreaView>;
};

export default Directions;
