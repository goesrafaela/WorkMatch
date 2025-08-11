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
import { RootStackParamList } from "../types";
import CustomButton from "../components/CustomButton";
import { cadastrarUsuario, mockDB } from "../utils/mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskInput, { Masks } from "react-native-mask-input";

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
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([]);
  const [cnpj, setCnpj] = useState("");
  const [tipoProfissional, setTipoProfissional] = useState<"PJ" | "CLT" | null>(
    null
  );

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
    if (!nome || !telefone || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    let dados: any = {
      nome,
      telefone,
      email,
      senha,
      imagem,
    };

    if (accountType === "empresa") {
      if (!cnpj) {
        Alert.alert("Erro", "Informe o CNPJ da empresa");
        return;
      }
      if (!tipoProfissional) {
        Alert.alert("Erro", "Selecione o tipo de profissional que procura");
        return;
      }
      dados.cnpj = cnpj;
      dados.profissionalProcurado = tipoProfissional;
    } else {
      if (!detalhe) {
        Alert.alert("Erro", "Informe suas habilidades (separadas por vírgula)");
        return;
      }
      dados.habilidades = detalhe.split(",").map((h) => h.trim());
      dados.tiposServico = tiposSelecionados;
      dados.portfolio = portfolio;
    }

    const id = cadastrarUsuario(dados, accountType);
    mockDB.userType = accountType;

    await AsyncStorage.setItem("accountType", accountType);

    Alert.alert("Sucesso", `Cadastro realizado com sucesso! ID: ${id}`, [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home", { accountType }),
      },
    ]);
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

        <TouchableOpacity onPress={escolherImagem} style={styles.imagePicker}>
          {imagem ? (
            <Image source={{ uri: imagem }} style={styles.profileImage} />
          ) : (
            <Ionicons name="camera" size={40} color="#888" />
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

        {accountType === "empresa" && (
          <MaskInput
            value={cnpj}
            onChangeText={(masked) => setCnpj(masked)}
            mask={Masks.BRL_CNPJ}
            keyboardType="numeric"
            style={styles.input}
            placeholder="CNPJ"
          />
        )}

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

        {/* Seletor para empresa */}
        {accountType === "empresa" && (
          <View style={styles.tipoContainer}>
            <Text style={styles.tipoTitle}>
              Tipo de profissional que procura:
            </Text>
            <View style={styles.tipoOptions}>
              {opcoesTipoEmpresa.map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.tipoBotao,
                    tipoProfissional === tipo && styles.tipoSelecionado,
                  ]}
                  onPress={() => setTipoProfissional(tipo as "PJ" | "CLT")}
                >
                  <Text
                    style={{
                      color: tipoProfissional === tipo ? "#fff" : "#333",
                    }}
                  >
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Campos para candidato */}
        {accountType === "candidato" && (
          <>
            <TextInput
              placeholder="Habilidades (separadas por vírgula)"
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

            <View style={styles.tipoContainer}>
              <Text style={styles.tipoTitle}>Tipo de Serviço:</Text>
              <View style={styles.tipoOptions}>
                {opcoesTipoCandidato.map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    style={[
                      styles.tipoBotao,
                      tiposSelecionados.includes(tipo) &&
                        styles.tipoSelecionado,
                    ]}
                    onPress={() => handleTipoToggleCandidato(tipo)}
                  >
                    <Text
                      style={{
                        color: tiposSelecionados.includes(tipo)
                          ? "#fff"
                          : "#333",
                      }}
                    >
                      {tipo}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        <CustomButton title="Cadastrar" onPress={handleCadastro} />
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
    backgroundColor: "#c6c5c4",
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
});
