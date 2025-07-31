import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
const maletaIcon: ImageSourcePropType = require("../assets/maleta.png");

export default function Footer() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Feather name="briefcase" size={24} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: "relative" }}
        onPress={() => navigation.navigate("Chat")}
      >
        <MaterialCommunityIcons
          name="message-text-outline"
          size={26}
          color="#ccc"
        />
        <View style={styles.notificationDot} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <FontAwesome5 name="user-alt" size={26} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingBottom: 10,
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
