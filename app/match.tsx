import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const { width, height } = Dimensions.get("window");

// Tipagem de dados do perfil para corresponder ao novo design
type Perfil = {
  id: number;
  nome: string;
  foto: string;
  profissao: string;
  avaliacao: number;
  valorHora: number;
  descricao: string;
  localizacao: string;
  atendimento: string;
};

// Dados mock para simular os perfis
const mockPerfis: Perfil[] = [
  {
    id: 1,
    nome: "Catherine Lucas",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profissao: "Babá",
    avaliacao: 5,
    valorHora: 80,
    descricao: "Babá com 5 anos de experiência",
    localizacao: "Jundiaí, SP",
    atendimento: "Atendimento flexível",
  },
  {
    id: 2,
    nome: "João Silva",
    foto: "https://images.unsplash.com/photo-1557022237-f0490b79ac7a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profissao: "Encanador",
    avaliacao: 4,
    valorHora: 90,
    descricao: "Encanador profissional",
    localizacao: "São Paulo, SP",
    atendimento: "Emergencial 24h",
  },
  {
    id: 3,
    nome: "Maria Souza",
    foto: "https://images.unsplash.com/photo-1542159021-d0b28669e262?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profissao: "Pintora",
    avaliacao: 3,
    valorHora: 65,
    descricao: "Especialista em pintura",
    localizacao: "Campinas, SP",
    atendimento: "Orçamento grátis",
  },
];

export default function MatchScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [perfis, setPerfis] = useState<Perfil[]>(mockPerfis);
  const [currentIndex, setCurrentIndex] = useState(0);
  let swiperRef: Swiper<any> | null = null;

  const handleLike = () => {
    swiperRef?.swipeRight();
  };

  const handleDislike = () => {
    swiperRef?.swipeLeft();
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < rating ? "star" : "star-outline"}
          size={20}
          color={i < rating ? "#FFC107" : "#ccc"}
          style={styles.star}
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderCard = (card: Perfil) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{ uri: card.foto }} style={styles.profileImage} />
          <Text style={styles.name}>{card.nome}</Text>
          <View style={styles.professionRating}>
            <Text style={styles.profession}>{card.profissao}</Text>
            {renderStarRating(card.avaliacao)}
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>R${card.valorHora}/hora</Text>
          </View>
          <Text style={styles.description}>{card.descricao}</Text>
          <Text style={styles.details}>
            {card.localizacao} • {card.atendimento}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header com Logo e Ícone de Busca */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          BreeV<Text style={styles.logoCheck}>✔</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
          <Ionicons name="search-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      {/* Swiper e o Card */}
      <View style={styles.swiperContainer}>
        {perfis.length > 0 && currentIndex < perfis.length ? (
          <Swiper
            ref={(ref: Swiper<any> | null): void => {
              swiperRef = ref;
            }}
            cards={perfis}
            cardIndex={currentIndex}
            onSwiped={() => setCurrentIndex(currentIndex + 1)}
            onSwipedAll={() => Alert.alert("Fim dos perfis!")}
            renderCard={renderCard}
            stackSize={3}
            backgroundColor="transparent"
            disableTopSwipe={false}
            cardVerticalMargin={20} // Ajuste a margem vertical para mover o card para baixo
          />
        ) : (
          <Text style={styles.noMoreCardsText}>
            Não há mais perfis para hoje.
          </Text>
        )}
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsWrapper}>
        <TouchableOpacity style={styles.buttonDislike} onPress={handleDislike}>
          <Ionicons name="close" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLike} onPress={handleLike}>
          <Ionicons name="checkmark" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  logoCheck: {
    color: "#007BFF",
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  swiperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMoreCardsText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  card: {
    height: width * 1.25, // Ajustado para ser mais alto
    width: width * 0.9,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: "flex-start", // Conteúdo começa do topo
    alignItems: "center",
    padding: 20,
  },
  cardContent: {
    alignItems: "center",
    width: "100%",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  professionRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profession: {
    fontSize: 16,
    color: "#666",
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
  star: {
    marginHorizontal: 1,
  },
  priceTag: {
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 15,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  actionsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 30,
  },
  buttonDislike: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FF5252",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonLike: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
