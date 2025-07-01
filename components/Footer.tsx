import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function Footer() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="flame-outline" size={28} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="sparkles-outline" size={26} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity style={{ position: "relative" }}>
        <MaterialCommunityIcons
          name="message-text-outline"
          size={26}
          color="#ccc"
        />
        <View style={styles.notificationDot} />
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesome5 name="user-alt" size={26} color="#FF5864" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  notificationDot: {
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
    position: "absolute",
    top: -2,
    right: -2,
  },
});
