import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../types/index";

export default function PerfilScreen() {
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const [nome, setNome] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [tipo, setTipo] = useState<string>("Candidato"); // candidato ou empresa
  const [idade, setIdade] = useState<number | null>(null);

  // extras
  const [cpf, setCpf] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [areaAtuacao, setAreaAtuacao] = useState<string>("");

  // Mock de vagas para empresas
  const [vagas, setVagas] = useState([
    {
      id: 1,
      titulo: "Auxiliar Administrativo",
      localizacao: "Jundiaí, SP",
      interessados: 12,
    },
    {
      id: 2,
      titulo: "Vendedor Interno",
      localizacao: "São Paulo, SP",
      interessados: 5,
    },
  ]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem("userName");
        const fotoSalva = await AsyncStorage.getItem("userPhoto");
        const tipoConta = await AsyncStorage.getItem("accountType"); // "empresa" ou "candidato"
        const idadeSalva = await AsyncStorage.getItem("userAge");
        const cpfSalvo = await AsyncStorage.getItem("userCpf");
        const cnpjSalvo = await AsyncStorage.getItem("userCnpj");
        const localSalvo = await AsyncStorage.getItem("userLocation");
        const areaSalva = await AsyncStorage.getItem("userArea");

        if (nomeSalvo) setNome(nomeSalvo);
        if (fotoSalva) setFoto(fotoSalva);
        if (tipoConta)
          setTipo(tipoConta === "empresa" ? "Empresa" : "Candidato");
        if (idadeSalva) setIdade(Number(idadeSalva));
        if (cpfSalvo) setCpf(cpfSalvo);
        if (cnpjSalvo) setCnpj(cnpjSalvo);
        if (localSalvo) setLocalizacao(localSalvo);
        if (areaSalva) setAreaAtuacao(areaSalva);
      } catch (err) {
        console.error("Erro ao carregar dados do perfil:", err);
      }
    };

    carregarDados();
  }, []);

  const escolherNovaFoto = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Permita acesso à galeria para mudar a foto."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        const novaFoto = result.assets[0].uri;
        setFoto(novaFoto);
        await AsyncStorage.setItem("userPhoto", novaFoto);
      }
    } catch (err) {
      console.error("Erro ao selecionar nova foto:", err);
    }
  };

  const handleCriarVaga = () => {
    // Aqui implementaremos a navegação para a tela de criação de vagas
    Alert.alert("Criar Vaga", "Funcionalidade de criar vaga será implementada");
  };

  const handleVerInteressados = (vagaId: number) => {
    Alert.alert(
      "Ver Interessados",
      `Ver candidatos interessados na vaga ${vagaId}`
    );
  };

  // Renderização para perfil de empresa
  if (tipo === "Empresa") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../assets/logo.jpg")} style={styles.logo} />
          <TouchableOpacity
            style={styles.criarVagaButton}
            onPress={handleCriarVaga}
          >
            <Text style={styles.criarVagaButtonText}>+ Criar nova vaga</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tituloVagas}>Minhas Vagas</Text>

        <ScrollView style={styles.vagasContainer}>
          {vagas.map((vaga) => (
            <View key={vaga.id} style={styles.vagaCard}>
              <View style={styles.vagaInfo}>
                <Text style={styles.vagaTitulo}>{vaga.titulo}</Text>
                <Text style={styles.vagaLocalizacao}>{vaga.localizacao}</Text>
                <View style={styles.interessadosContainer}>
                  <FontAwesome5 name="user-friends" size={16} color="#333" />
                  <Text style={styles.interessadosText}>
                    {vaga.interessados} interessados
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.verInteressadosButton}
                onPress={() => handleVerInteressados(vaga.id)}
              >
                <Text style={styles.verInteressadosText}>Ver interessados</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <CompanyFooter />
      </View>
    );
  }

  // Renderização para perfil de candidato (mantém o original)
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Foto */}
        <View>
          <Image
            source={{
              uri:
                foto?.length > 0
                  ? foto
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={escolherNovaFoto}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Nome + Idade */}
        <Text style={styles.nome}>
          {nome ? nome : "Usuário"} {idade ? `, ${idade}` : ""}
        </Text>
        <Text style={styles.tipoConta}>
          {tipo === "Empresa" ? "Conta Empresarial" : "Conta de Candidato"}
        </Text>

        {/* Infos extras */}
        <Text style={styles.extra}>CPF: {cpf || "Não informado"}</Text>
        <Text style={styles.extra}>
          Localização: {localizacao || "Não informado"}
        </Text>
        <Text style={styles.extra}>
          Área de atuação: {areaAtuacao || "Não informado"}
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Config")}
        >
          <Ionicons name="settings" size={28} color="#524355" />
          <Text style={styles.iconText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="shield-checkmark" size={28} color="#105d3b" />
          <Text style={styles.iconText}>Segurança</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}

// Componente de Footer específico para empresas
function CompanyFooter() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate("home")}
      >
        <Ionicons name="home-outline" size={24} color="#0066FF" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Ionicons name="briefcase-outline" size={24} color="#666" />
        <Text style={styles.footerText}>Vagas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Ionicons name="notifications-outline" size={24} color="#666" />
        <Text style={styles.footerText}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Ionicons name="person-outline" size={24} color="#666" />
        <Text style={styles.footerText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  criarVagaButton: {
    backgroundColor: "#0066FF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  criarVagaButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tituloVagas: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 20,
  },
  vagasContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  vagaCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  vagaInfo: {
    marginBottom: 10,
  },
  vagaTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  vagaLocalizacao: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  interessadosContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  interessadosText: {
    marginLeft: 5,
    fontSize: 16,
  },
  verInteressadosButton: {
    backgroundColor: "#0066FF",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  verInteressadosText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingBottom: 20,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
  // Estilos originais mantidos
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  editIcon: {
    backgroundColor: "#FF5864",
    borderRadius: 15,
    padding: 5,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  tipoConta: {
    color: "#777",
    marginTop: 5,
    marginBottom: 10,
  },
  extra: {
    color: "#555",
    fontSize: 14,
    marginTop: 3,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 25,
    alignSelf: "center",
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    textAlign: "center",
  },
});
