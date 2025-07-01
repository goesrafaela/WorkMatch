import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Config() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuração</Text>
      <Text>Aqui é a configuração</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF5864",
    marginBottom: 20,
  },
});
