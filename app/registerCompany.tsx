import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { cadastrarUsuario, mockDB } from "../utils/mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types/index";

export default function RegisterCompanyScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = useState("");
  const [servicos, setServicos] = useState("");
  const [bio, setBio] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [areaCobertura, setAreaCobertura] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imagem, setImagem] = useState<string | null>(null);
  const [telefone, setTelefone] = useState("");

  const escolherImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const handleCadastro = async () => {
    // Validação para empresa
    if (
      !nome ||
      !email ||
      !senha ||
      !servicos ||
      !bio ||
      !localizacao ||
      !areaCobertura
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    let dados: any = {
      nome,
      telefone,
      email,
      senha,
      imagem,
      servicos,
      bio,
      localizacao,
      areaCobertura,
    };

    // salva no "mock banco"
    const id = cadastrarUsuario(dados, "empresa");
    mockDB.userType = "empresa";

    // salva localmente para PerfilScreen
    try {
      await AsyncStorage.setItem("accountType", "empresa");
      await AsyncStorage.setItem("userName", nome);
      await AsyncStorage.setItem("userPhoto", imagem || "");
      await AsyncStorage.setItem("userPhone", telefone);
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userServices", servicos);
      await AsyncStorage.setItem("userBio", bio);
      await AsyncStorage.setItem("userLocation", localizacao);
      await AsyncStorage.setItem("userCoverageArea", areaCobertura);
    } catch (err) {
      console.error("Erro ao salvar dados no AsyncStorage:", err);
    }

    Alert.alert("Sucesso", `Cadastro realizado com sucesso! ID: ${id}`, [
      {
        text: "OK",
        onPress: () => navigation.replace("Perfil"),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Empresa</Text>

        <View style={styles.formContainer}>
          <TouchableOpacity
            onPress={escolherImagem}
            style={styles.logoPickerContainer}
          >
            {imagem ? (
              <Image source={{ uri: imagem }} style={styles.logoImage} />
            ) : (
              <View style={styles.addLogoButton}>
                <Text style={styles.addLogoText}>Adicione a Foto</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Nome da empresa"
            value={nome}
            onChangeText={setNome}
            style={styles.companyInput}
          />

          <Text style={styles.sectionLabel}>Serviços</Text>
          <TextInput
            placeholder="e.g. Software Development"
            value={servicos}
            onChangeText={setServicos}
            style={styles.companyInput}
          />

          <Text style={styles.sectionLabel}>Bio</Text>
          <TextInput
            placeholder="Descreva um pouco sobre a empresa"
            value={bio}
            onChangeText={setBio}
            style={styles.companyInput}
            multiline
            numberOfLines={3}
          />

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={24} color="#666" />
            <TextInput
              placeholder="Cidade"
              value={localizacao}
              onChangeText={setLocalizacao}
              style={styles.locationInput}
            />
          </View>

          <Text style={styles.sectionLabel}>Estado</Text>
          <TextInput
            placeholder="Estado"
            value={areaCobertura}
            onChangeText={setAreaCobertura}
            style={styles.companyInput}
          />

          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.companyInput}
            keyboardType="email-address"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              style={{ flex: 1 }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleCadastro}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Já tem cadastro? Faça o login.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: 40,
  },
  container: {
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  logoPickerContainer: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  addLogoButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  addLogoText: {
    color: "#666",
    fontSize: 16,
  },
  companyInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  sectionLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    marginLeft: 5,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  linkText: {
    color: "#161e27",
    textAlign: "center",
    marginTop: 15,
  },
});
