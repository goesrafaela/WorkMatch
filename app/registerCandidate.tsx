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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { cadastrarUsuario, mockDB } from "../utils/mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types/index";

export default function RegisterCandidateScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

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
    // Validação para candidato
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    let dados: any = {
      nome,
      email,
      senha,
      imagem,
      bio,
      habilidades: skills.split(",").map((h) => h.trim()),
    };

    // salva no "mock banco"
    const id = cadastrarUsuario(dados, "candidato");
    mockDB.userType = "candidato";

    // salva localmente para PerfilScreen
    try {
      await AsyncStorage.setItem("accountType", "candidato");
      await AsyncStorage.setItem("userName", nome);
      await AsyncStorage.setItem("userPhoto", imagem || "");
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userBio", bio);
      await AsyncStorage.setItem("userSkills", skills);
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
        <Image source={require("../assets/logo.jpg")} style={styles.logo} />

        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={escolherImagem}
            style={styles.photoContainer}
          >
            {imagem ? (
              <Image source={{ uri: imagem }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Image
                  source={require("../assets/logo.jpg")}
                  style={styles.defaultImage}
                />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={escolherImagem}
          >
            <Text style={styles.addPhotoText}>Adicionar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            placeholder=""
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            style={styles.input}
            placeholder="Faça um resumo sobre você"
            multiline
          />

          <Text style={styles.label}>Habilidades</Text>
          <TextInput
            value={skills}
            onChangeText={setSkills}
            style={styles.input}
            placeholder="Liste as suas habilidades"
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={[styles.input, { marginTop: 15 }]}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TextInput
            value={senha}
            onChangeText={setSenha}
            style={[styles.input, { marginBottom: 25 }]}
            placeholder="Senha"
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Criar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginTop: 40,
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E1",
  },
  defaultImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  addPhotoButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addPhotoText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
