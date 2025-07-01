// components/CustomButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
}

export default function CustomButton({
  title,
  color = "#FF5864",
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: 150,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 7,
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
