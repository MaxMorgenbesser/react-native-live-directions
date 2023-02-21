import { StyleSheet, Text, View } from "react-native";
import PropProvider from "./src/PropProvider";

export default function App() {
  return (
    <>
      <PropProvider />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
