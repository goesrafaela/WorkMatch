import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import Footer from "../components/Footer";

const { width } = Dimensions.get("window");

const mockPerfis = [
  {
    id: 1,
    nome: "João Silva",
    foto: "https://via.placeholder.com/300x400",
    descricao: "Desenvolvedor",
  },
  {
    id: 2,
    nome: "Maria Souza",
    foto: "https://via.placeholder.com/300x400",
    descricao: "Designer",
  },
];

export default function HomeScreen() {
  const [perfis, setPerfis] = useState(mockPerfis);

  return (
    <View style={styles.container}>
      <Swiper
        cards={perfis}
        renderCard={(card) => (
          <View style={styles.card}>
            <Image source={{ uri: card.foto }} style={styles.image} />
            <Text style={styles.nome}>{card.nome}</Text>
            <Text style={styles.descricao}>{card.descricao}</Text>
          </View>
        )}
        stackSize={3}
        backgroundColor="transparent"
      />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 450,
    padding: 15,
    alignItems: "center",
    elevation: 5,
  },
  image: {
    width: width * 0.8,
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  nome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  descricao: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
});
