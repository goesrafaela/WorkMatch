import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform, // Importado para lidar com permissões
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../types";

export default function CandidateStep1() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [imagem, setImagem] = useState<string | null>(null);

  // --- Solicitar permissão da galeria e câmera ---
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status: cameraStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
          Alert.alert(
            "Permissão necessária",
            "Precisamos de permissão para acessar sua câmera e galeria para adicionar uma foto de perfil."
          );
        }
      }
    })();
  }, []);

  const tirarFoto = async () => {
    let resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (
      !resultado.canceled &&
      resultado.assets &&
      resultado.assets.length > 0
    ) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const enviarDaGaleria = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (
      !resultado.canceled &&
      resultado.assets &&
      resultado.assets.length > 0
    ) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const handleNext = () => {
    navigation.navigate("CandidateStep2", {
      candidateData: {
        imagem: imagem,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER: Posição superior com logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          Bree<Text style={styles.logoCheck}>✔</Text>
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>Adicione sua foto de perfil</Text>
          <Text style={styles.subtitle}>
            Perfis com foto têm mais chances de receber matches.
          </Text>
        </View>

        {/* CONTAINER DA FOTO DE PERFIL */}
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={enviarDaGaleria}
        >
          {imagem ? (
            <Image source={{ uri: imagem }} style={styles.photo} />
          ) : (
            <Ionicons name="camera-outline" size={40} color="#ccc" />
          )}
        </TouchableOpacity>

        {/* BOTÕES DE OPÇÕES DE FOTO */}
        <View style={styles.actionButtonsGroup}>
          <TouchableOpacity style={styles.actionButton} onPress={tirarFoto}>
            <Text style={styles.actionButtonText}>Tirar foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={enviarDaGaleria}
          >
            <Text style={styles.actionButtonText}>Enviar da galeria</Text>
          </TouchableOpacity>
        </View>

        {/* BOTÃO PRÓXIMO */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          disabled={!imagem} // Opcional: Desabilita se não houver imagem
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  logoCheck: {
    color: "#007BFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between", // Distribui o conteúdo principal
    paddingBottom: 30,
  },
  textGroup: {
    width: "100%",
    alignItems: "flex-start", // Alinha textos à esquerda
  },
  title: {
    fontSize: 30, // Aumentado para corresponder ao visual
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
    textAlign: "left",
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  actionButtonsGroup: {
    width: "100%",
    alignItems: "center",
    marginBottom: 100, // Empurra o botão "Próximo" para o final
  },
  actionButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  actionButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#007BFF",
    padding: 18,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
