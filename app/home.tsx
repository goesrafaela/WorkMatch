import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import Footer from "../components/Footer";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

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
    foto: "",
    descricao: "Designer",
  },
  {
    id: 3,
    nome: "Carlos Eduardo",
    foto: "https://via.placeholder.com/300x400",
    descricao: "Dev Mobile",
  },
];

export default function HomeScreen() {
  const [perfis, setPerfis] = useState(mockPerfis);
  const [curtidos, setCurtidos] = useState<typeof mockPerfis>([]);
  const [rejeitados, setRejeitados] = useState<typeof mockPerfis>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSwipeRight = (index: number) => {
    const perfil = perfis[index];
    setCurtidos((prev) => [...prev, perfil]);
    console.log("❤️ Curtido:", perfil.nome);
  };

  const handleSwipeLeft = (index: number) => {
    const perfil = perfis[index];
    setRejeitados((prev) => [...prev, perfil]);
    console.log("❌ Rejeitado:", perfil.nome);
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={perfis}
        renderCard={(card) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PerfilDetalhado", { card })}
          >
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
          </TouchableOpacity>
        )}
        stackSize={3}
        backgroundColor="transparent"
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
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
    height: 520, // ← altura aumentada
    padding: 15,
    alignItems: "center",
    elevation: 5,
  },
  image: {
    width: width * 0.8,
    height: 370, // ← imagem maior
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
