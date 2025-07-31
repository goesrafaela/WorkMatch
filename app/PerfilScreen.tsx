import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../types";

export default function PerfilScreen() {
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const [nome, setNome] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [tipo, setTipo] = useState<string>("Candidato");
  const [idade, setIdade] = useState<number | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem("userName");
        const fotoSalva = await AsyncStorage.getItem("userPhoto");
        const tipoConta = await AsyncStorage.getItem("accountType");
        const idadeSalva = await AsyncStorage.getItem("userAge");

        if (nomeSalvo) setNome(nomeSalvo);
        if (fotoSalva) setFoto(fotoSalva);
        if (tipoConta)
          setTipo(tipoConta === "empresa" ? "Empresa" : "Candidato");
        if (idadeSalva) setIdade(Number(idadeSalva));
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

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
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

        <Text style={styles.nome}>
          {nome ? nome : "Usuário"}, {idade ? idade : ""}
        </Text>
        <Text style={styles.tipoConta}>
          {tipo === "Empresa" ? "Conta Empresarial" : "Conta de Candidato"}
        </Text>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
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
  },
  tipoConta: {
    color: "#777",
    marginTop: 5,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 25,
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
