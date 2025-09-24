import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { cadastrarUsuario, mockDB } from "../utils/mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CandidateStep6() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  // Use um objeto vazio como fallback caso route.params seja undefined
  const dados = route.params || {};

  const handleCadastro = async () => {
    // Verifique se dados.nome existe antes de usá-lo
    const nomeDoCandidato = dados.nome || ""; // Se dados.nome for undefined, use uma string vazia ""
    const imagemDoCandidato = dados.imagem || ""; // O mesmo para a imagem

    const id = cadastrarUsuario(dados, "candidato");
    mockDB.userType = "candidato";

    try {
      await AsyncStorage.setItem("accountType", "candidato");
      await AsyncStorage.setItem("userName", nomeDoCandidato);
      await AsyncStorage.setItem("userPhoto", imagemDoCandidato);
    } catch (err) {
      console.error("Erro ao salvar dados:", err);
    }

    Alert.alert("Sucesso", "Cadastro finalizado!", [
      { text: "OK", onPress: () => navigation.replace("home") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revise seus dados</Text>
      <Text style={styles.text}>
        Nome: {dados.nome || ""} {dados.sobrenome || ""}
      </Text>
      <Text style={styles.text}>Localização: {dados.localizacao || ""}</Text>
      <Text style={styles.text}>Áreas: {dados.areas || ""}</Text>
      <Text style={styles.text}>Experiência: {dados.experiencia || ""}</Text>
      <Text style={styles.text}>Bio: {dados.bio || ""}</Text>
      <Text style={styles.text}>Gênero: {dados.genero || ""}</Text>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Concluir Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  text: { marginBottom: 8, fontSize: 16 },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
