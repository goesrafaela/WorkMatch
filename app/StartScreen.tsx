import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const logo = require("../assets/logo.jpg");

export default function StartScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} />

      {/* Título */}
      <Text style={styles.title}>Junte-se ao Breev</Text>
      <Text style={styles.subtitle}>
        Encontre oportunidades de emprego e serviço
      </Text>

      {/* Botões principais */}
      <TouchableOpacity
        style={[styles.button, styles.outlineButton]}
        onPress={() => navigation.navigate("register")}
      >
        <Text style={[styles.buttonText, styles.outlineButtonText]}>
          Inscrever-se com e-mail
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.fillButton]}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={[styles.buttonText, styles.fillButtonText]}>Entrar</Text>
      </TouchableOpacity>

      {/* Termos e Política */}
      <Text style={styles.termsText}>
        Ao continuar, você concorda com os nossos{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://seudominio.com/termos")}
        >
          Termos de Serviço
        </Text>{" "}
        e{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://seudominio.com/privacidade")}
        >
          Política de Privacidade
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 8,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#fff",
  },
  outlineButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  fillButton: {
    backgroundColor: "#007BFF",
  },
  fillButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
