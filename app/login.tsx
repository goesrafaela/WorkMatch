import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types/index";

import AsyncStorage from "@react-native-async-storage/async-storage";

// 👉 Logo
const logoImage = require("../assets/logo.jpg");

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [accountTypeModalVisible, setAccountTypeModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleCadastro = () => {
    // Abre o modal de seleção de tipo de conta
    setAccountTypeModalVisible(true);
  };

  const handleSelectAccountType = (type: "candidato" | "empresa") => {
    setAccountTypeModalVisible(false);
    if (type === "candidato") {
      navigation.navigate("CandidateStep1");
    } else {
      navigation.navigate("registerCompany");
    }
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setModalVisible(false);
    const isEmpresa = email.toLowerCase().includes("empresa");
    const accountType = isEmpresa ? "empresa" : "candidato";

    await AsyncStorage.setItem("accountType", accountType);
    navigation.navigate("home");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={logoImage} style={styles.logo} />

      {/* Texto de convite */}
      <Text style={styles.title}>Junte-se ao Breev</Text>
      <Text style={styles.subtitle}>
        Encontre oportunidades de emprego e serviço
      </Text>

      {/* Botões */}
      <TouchableOpacity
        style={[styles.button, styles.buttonWhite]}
        onPress={handleCadastro}
      >
        <Text style={styles.buttonWhiteText}>Inscrever-se com e-mail</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonBlue]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonBlueText}>Entrar</Text>
      </TouchableOpacity>

      {/* Termos */}
      <Text style={styles.terms}>
        Ao continuar, você concorda com os nossos{" "}
        <Text style={styles.link}>Termos de Serviço</Text> e{" "}
        <Text style={styles.link}>Política de Privacidade</Text>
      </Text>

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

      {/* Modal de Seleção de Tipo de Conta */}
      <Modal
        visible={accountTypeModalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha o tipo de conta</Text>

            <TouchableOpacity
              style={[styles.accountTypeButton, styles.candidateButton]}
              onPress={() => handleSelectAccountType("candidato")}
            >
              <Text style={styles.accountTypeButtonText}>Sou Candidato</Text>
              <Text style={styles.accountTypeDescription}>
                Procuro oportunidades de trabalho
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.accountTypeButton, styles.companyButton]}
              onPress={() => handleSelectAccountType("empresa")}
            >
              <Text style={styles.accountTypeButtonText}>Sou Empresa</Text>
              <Text style={styles.accountTypeDescription}>
                Procuro profissionais para contratar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAccountTypeModalVisible(false)}>
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
    padding: 30,
    backgroundColor: "#fff",
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonWhite: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonWhiteText: {
    color: "#000",
    fontWeight: "600",
  },
  buttonBlue: {
    backgroundColor: "#2487f1",
  },
  buttonBlueText: {
    color: "#fff",
    fontWeight: "600",
  },
  terms: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
  link: {
    color: "#2487f1",
    textDecorationLine: "underline",
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
    color: "#2487f1",
    marginTop: 10,
  },
  closeText: {
    color: "#b8bcbd",
    marginTop: 15,
  },
  accountTypeButton: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  candidateButton: {
    backgroundColor: "#2487f1",
  },
  companyButton: {
    backgroundColor: "#34a853",
  },
  accountTypeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  accountTypeDescription: {
    color: "#fff",
    fontSize: 12,
  },
});
