import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function PerfilDetalhado() {
  const route = useRoute();
  const navigation = useNavigation();
  const { card } = route.params as {
    card: { id: number; nome: string; descricao: string; foto: string };
  };

  const handleLike = () => {
    console.log("Curtido:", card.nome);
    // Aqui você poderia salvar no AsyncStorage, backend ou state global
    Alert.alert("Você curtiu", `${card.nome}`);
    navigation.goBack();
  };

  const handleDislike = () => {
    console.log("Rejeitado:", card.nome);
    Alert.alert("Você rejeitou", `${card.nome}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <Image
        source={{
          uri:
            card.foto?.length > 0
              ? card.foto
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.image}
      />
      <Text style={styles.nome}>{card.nome}</Text>
      <Text style={styles.descricao}>{card.descricao}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.naoGostei]}
          onPress={handleDislike}
        >
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.gostei]}
          onPress={handleLike}
        >
          <Ionicons name="heart" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: width * 0.9,
    height: 450,
    borderRadius: 15,
    marginBottom: 20,
  },
  nome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  descricao: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 30,
    gap: 40,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  gostei: {
    backgroundColor: "#f56624",
  },
  naoGostei: {
    backgroundColor: "#999",
  },
});
