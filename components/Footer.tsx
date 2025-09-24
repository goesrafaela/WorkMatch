import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text, // Certifique-se que Text está aqui
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

export default function Footer() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Botão Buscar (primeiro item) - assume que esta é a tela de busca real */}
      <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
        <Ionicons name="search-outline" size={26} color="#007BFF" />
        <Text style={[styles.iconText, { color: "#007BFF" }]}>Buscar</Text>
      </TouchableOpacity>

      {/* Botão Matches - assume que esta é a tela de match/swiper */}
      <TouchableOpacity onPress={() => navigation.navigate("match")}>
        <Ionicons name="heart-outline" size={26} color="#ccc" />
        <Text style={styles.iconText}>Matches</Text>
      </TouchableOpacity>

      {/* Botão Chat */}
      <TouchableOpacity onPress={() => navigation.navigate("chat")}>
        <Ionicons name="chatbubbles-outline" size={26} color="#ccc" />
        <Text style={styles.iconText}>Chat</Text>
      </TouchableOpacity>

      {/* Botão Perfil */}
      <TouchableOpacity onPress={() => navigation.navigate("PerfilScreen")}>
        <Ionicons name="person-outline" size={26} color="#ccc" />
        <Text style={styles.iconText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  iconText: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    marginTop: 4,
  },
});
