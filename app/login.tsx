import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 👉 Importando a logo
const logoImage = require("../assets/logo.png");

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleCadastro = (accountType: "empresa" | "candidato") => {
    navigation.navigate("Register", { accountType });
  };

  const handleLogin = async () => {
    setModalVisible(false);
    const isEmpresa = email.toLowerCase().includes("empresa");
    const accountType = isEmpresa ? "empresa" : "candidato";

    await AsyncStorage.setItem("accountType", accountType);
    navigation.navigate("Home", { accountType });
  };

  return (
    <View style={styles.container}>
      {/* Substituindo "Breev" pela logo */}
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>Breev</Text>

      <Text style={styles.subtitle}>Faça seu cadastro ou login.</Text>

      <CustomButton
        title="Cadastrar Empresa"
        color="#6f6f6f"
        onPress={() => handleCadastro("empresa")}
      />
      <CustomButton
        title="Cadastrar Candidato"
        color="#283747"
        onPress={() => handleCadastro("candidato")}
      />
      <View style={styles.separator} />

      <View style={styles.enterButtonContainer}>
        <CustomButton title="Entrar" onPress={() => setModalVisible(true)} />
      </View>

      {/* Modal de Login */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Acesse sua conta</Text>

            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                style={styles.passwordInput}
                secureTextEntry={!mostrarSenha}
              />
              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={mostrarSenha ? "eye" : "eye-off"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <CustomButton title="Entrar" onPress={handleLogin} />

            <TouchableOpacity>
              <Text style={styles.linkText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#c6c5c4",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "condensedBold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "monospace",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "monospace",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#fff",
    marginVertical: 25,
    alignSelf: "center",
  },
  enterButtonContainer: {
    marginTop: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  eyeButton: {
    padding: 5,
  },
  linkText: {
    color: "#161e27",
    marginTop: 10,
  },
  closeText: {
    color: "#b8bcbd",
    marginTop: 15,
  },
});
