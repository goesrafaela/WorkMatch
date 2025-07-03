import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import CustomButton from "../components/CustomButton";
import { cadastrarUsuario, mockDB } from "../utils/mockData";

type RouteParams = {
  accountType: "empresa" | "candidato";
};

export default function RegisterScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { accountType: initialAccountType } = route.params as RouteParams;

  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"empresa" | "candidato">(
    initialAccountType
  );
  const [nome, setNome] = useState("");
  const [detalhe, setDetalhe] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  const handleCadastro = () => {
    if (!nome || !detalhe || !telefone || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    let dados: any = { nome, telefone, email, senha, imagem, portfolio };

    if (accountType === "empresa") {
      dados.profissionalProcurado = detalhe;
    } else {
      dados.habilidades = detalhe.split(",").map((h) => h.trim());
    }

    const id = cadastrarUsuario(dados, accountType);
    mockDB.userType = accountType;

    Alert.alert("Sucesso", `Cadastro realizado com sucesso! ID: ${id}`, [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {accountType === "empresa" ? "Empresa" : "Candidato"}
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

      <TouchableOpacity onPress={escolherImagem} style={styles.imagePicker}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.profileImage} />
        ) : (
          <Text>Selecionar Foto</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder={
          accountType === "empresa" ? "Nome da Empresa" : "Nome Completo"
        }
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
        keyboardType="phone-pad"
      />

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
          style={[{ flex: 1 }]}
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

      <TextInput
        placeholder={
          accountType === "empresa"
            ? "Profissional que procura"
            : "Habilidades (separadas por vírgula)"
        }
        value={detalhe}
        onChangeText={setDetalhe}
        style={styles.input}
      />

      <TextInput
        placeholder="Portfólio ou Site (opcional)"
        value={portfolio}
        onChangeText={setPortfolio}
        style={styles.input}
      />

      <CustomButton title="Cadastrar" onPress={handleCadastro} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Já tem cadastro? Faça o login.</Text>
      </TouchableOpacity>
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
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  linkText: { color: "#161e27", textAlign: "center", marginTop: 15 },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  profileImage: { width: "100%", height: "100%", borderRadius: 10 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
