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
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomButton from "../components/CustomButton";
import { cadastrarUsuario, mockDB } from "../utils/mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskInput, { Masks } from "react-native-mask-input";

type RouteParams = {
  accountType: "empresa" | "candidato";
};

type RootStackParamList = {
  Login: undefined;
  Register: { accountType: "empresa" | "candidato" };
  Home: undefined;
  Match: undefined;
  Perfil: undefined;
  Chat: undefined;
  ChatDetail: { chatId: string };
  Config: undefined;
  PerfilDetalhado: { id: string };
};

export default function RegisterScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { accountType: initialAccountType } = route.params as RouteParams;

  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"empresa" | "candidato">(initialAccountType);
  const [nome, setNome] = useState("");
  const [detalhe, setDetalhe] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([]);
  const [cnpj, setCnpj] = useState("");
  const [tipoProfissional, setTipoProfissional] = useState<"PJ" | "CLT" | null>(null);
  
  // Novos campos para empresa baseados no layout anterior
  const [servicos, setServicos] = useState("");
  const [bio, setBio] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [areaCobertura, setAreaCobertura] = useState("");

  const opcoesTipoCandidato = ["CLT", "PJ"];
  const opcoesTipoEmpresa = ["CLT", "PJ"];

  const handleTipoToggleCandidato = (tipo: string) => {
    if (tiposSelecionados.includes(tipo)) {
      setTiposSelecionados(tiposSelecionados.filter((t) => t !== tipo));
    } else if (tiposSelecionados.length < 2) {
      setTiposSelecionados([...tiposSelecionados, tipo]);
    } else {
      Alert.alert("Limite", "Você pode escolher até 2 tipos de serviço.");
    }
  };

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
    if (accountType === "empresa") {
      // Validação para empresa
      if (!nome || !email || !senha || !servicos || !bio || !localizacao || !areaCobertura) {
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
        areaCobertura
      };
      
      // salva no "mock banco"
      const id = cadastrarUsuario(dados, accountType);
      mockDB.userType = accountType;

      // salva localmente para PerfilScreen
      try {
        await AsyncStorage.setItem("accountType", accountType);
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
    } else {
      // Validação para candidato (atualizada)
      if (!nome || !email || !senha || !bio || !detalhe) {
        Alert.alert("Erro", "Preencha todos os campos obrigatórios");
        return;
      }
      
      let dados: any = {
        nome,
        email,
        senha,
        imagem,
        bio,
        habilidades: detalhe.split(",").map((h) => h.trim()),
      };
      
      // salva no "mock banco"
      const id = cadastrarUsuario(dados, accountType);
      mockDB.userType = accountType;

      // salva localmente para PerfilScreen
      try {
        await AsyncStorage.setItem("accountType", accountType);
        await AsyncStorage.setItem("userName", nome);
        await AsyncStorage.setItem("userPhoto", imagem || "");
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("userBio", bio);
        await AsyncStorage.setItem("userSkills", detalhe);
      } catch (err) {
        console.error("Erro ao salvar dados no AsyncStorage:", err);
      }

      Alert.alert("Sucesso", `Cadastro realizado com sucesso! ID: ${id}`, [
        {
          text: "OK",
          onPress: () => navigation.replace("Perfil"),
        },
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {accountType === "empresa"
            ? "Cadastro de Empresa"
            : "Cadastro de Candidato"}
        </Text>

        <View style={styles.switchContainer}>
          <CustomButton
            title="Empresa"
            onPress={() => setAccountType("empresa")}
            color={accountType === "empresa" ? "#6f6f6f" : "#ccc"}
          />
          <View style={{ width: 15 }} />
          <CustomButton
            title="Candidato"
            onPress={() => setAccountType("candidato")}
            color={accountType === "candidato" ? "#283747" : "#ccc"}
          />
        </View>

        {accountType === "empresa" ? (
          // Interface de cadastro de empresa (mantida do código anterior)
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={escolherImagem} style={styles.logoPickerContainer}>
              {imagem ? (
                <Image source={{ uri: imagem }} style={styles.logoImage} />
              ) : (
                <View style={styles.addLogoButton}>
                  <Text style={styles.addLogoText}>Add logo</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              placeholder="Acme Corporation"
              value={nome}
              onChangeText={setNome}
              style={styles.companyInput}
            />

            <Text style={styles.sectionLabel}>Services</Text>
            <TextInput
              placeholder="e.g. Software Development"
              value={servicos}
              onChangeText={setServicos}
              style={styles.companyInput}
            />

            <Text style={styles.sectionLabel}>Bio</Text>
            <TextInput
              placeholder="Acme Corporation provides innovative solutions to businesses worldwide."
              value={bio}
              onChangeText={setBio}
              style={styles.companyInput}
              multiline
              numberOfLines={3}
            />

            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={24} color="#666" />
              <TextInput
                placeholder="New York, NY"
                value={localizacao}
                onChangeText={setLocalizacao}
                style={styles.locationInput}
              />
            </View>

            <Text style={styles.sectionLabel}>Coverage Area</Text>
            <TextInput
              placeholder="Tri-State Area"
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

            <TouchableOpacity style={styles.continueButton} onPress={handleCadastro}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Nova interface de cadastro de candidato baseada no layout da imagem
          <View style={styles.formContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.breevLogo}>Breev</Text>
              
              <TouchableOpacity onPress={escolherImagem} style={styles.profileImageContainer}>
                {imagem ? (
                  <Image source={{ uri: imagem }} style={styles.candidateProfileImage} />
                ) : (
                  <Image 
                    source={require('../assets/logo.jpg')} 
                    style={styles.candidateProfileImage} 
                  />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.addPhotoButton} onPress={escolherImagem}>
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              placeholder=""
              value={nome}
              onChangeText={setNome}
              style={styles.candidateInput}
            />

            <Text style={styles.fieldLabel}>Bio</Text>
            <TextInput
              placeholder="Briefly describe yourself..."
              value={bio}
              onChangeText={setBio}
              style={styles.candidateInput}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.fieldLabel}>Skills</Text>
            <TextInput
              placeholder="List your key skills..."
              value={detalhe}
              onChangeText={setDetalhe}
              style={styles.candidateInput}
            />

            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              style={[styles.candidateInput, {marginTop: 15}]}
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

            <TouchableOpacity style={styles.createProfileButton} onPress={handleCadastro}>
              <Text style={styles.createProfileText}>Create Profile</Text>
            </TouchableOpacity>
          </View>
        )}

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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#161e27",
    textAlign: "center",
    marginTop: 15,
  },
  imagePicker: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  tipoContainer: {
    marginBottom: 20,
  },
  tipoTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipoOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tipoBotao: {
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  tipoSelecionado: {
    backgroundColor: "#283747",
    borderColor: "#283747",
  },
  // Estilos para o layout da empresa
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
  // Novos estilos para o layout do candidato
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  breevLogo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 15,
  },
  candidateProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addPhotoButton: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  addPhotoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  candidateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  createProfileButton: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  createProfileText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
