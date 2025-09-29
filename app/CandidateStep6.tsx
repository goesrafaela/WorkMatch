import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
// Mock functions: Substitua por sua lógica de API/Supabase
const cadastrarUsuario = (data: any, type: string) => {
  /* Lógica de cadastro */ return 1;
};
const mockDB = { userType: "" };
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function CandidateStep6() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { candidateData: dados } = route.params || {};

  const handleCadastro = async () => {
    const nomeDoCandidato = dados.nome || "";
    const imagemDoCandidato = dados.imagem || "";

    const id = cadastrarUsuario(dados, "candidato");
    mockDB.userType = "candidato";

    try {
      await AsyncStorage.setItem("accountType", "candidato");
      await AsyncStorage.setItem("userName", nomeDoCandidato);
      await AsyncStorage.setItem("userPhoto", imagemDoCandidato);
    } catch (err) {
      console.error("Erro ao salvar dados:", err);
    }

    // Navega para a tela final de sucesso (Perfil6.png)
    navigation.replace("login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.successIconContainer}>
        <Ionicons name="checkmark-circle" size={120} color="#007BFF" />
      </View>

      <Text style={styles.finalTitle}>Parabéns! Seu perfil está pronto</Text>
      <Text style={styles.finalSubtitle}>
        Agora você já pode começar a buscar vagas, serviços e dar matches.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Começar agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  successIconContainer: {
    marginBottom: 40,
  },
  finalTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  finalSubtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 18,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  linkText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
