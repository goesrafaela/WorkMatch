import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../types";

export default function PerfilScreen() {
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  // Mock de dados do usuário (substitua pelo que vem do contexto ou banco)
  const usuario = {
    nome: "Pedro",
    idade: 29,
    tipo: "Candidato", // ou "Empresa"
    foto: "https://via.placeholder.com/150", // Coloque a URL real
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View>
          <Image source={{ uri: usuario.foto }} style={styles.avatar} />
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.nome}>
          {usuario.nome}, {usuario.idade}
        </Text>
        <Text style={styles.tipoConta}>
          {usuario.tipo === "Empresa"
            ? "Conta Empresarial"
            : "Conta de Candidato"}
        </Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Config")}
        >
          <Ionicons name="settings" size={28} color="#524355" />
          <Text style={styles.iconText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="shield-checkmark" size={28} color="#105d3b" />
          <Text style={styles.iconText}>Segurança</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  profileContainer: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  editIcon: {
    backgroundColor: "#FF5864",
    borderRadius: 15,
    padding: 5,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  nome: { fontSize: 22, fontWeight: "bold", color: "#333" },
  tipoConta: { color: "#777", marginTop: 5 },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 25,
  },
  iconButton: { alignItems: "center" },
  iconText: { fontSize: 12, color: "#999", marginTop: 5, textAlign: "center" },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 20,
  },
  actionItem: { alignItems: "center" },
  actionText: { marginTop: 5, fontSize: 12, color: "#666" },
});
