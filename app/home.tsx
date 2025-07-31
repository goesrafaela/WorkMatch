import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSourcePropType } from "react-native";

const apertoIcon: ImageSourcePropType = require("../assets/aperto.png");
const verificarIcon: ImageSourcePropType = require("../assets/verifica.png");

const { width } = Dimensions.get("window");

type Perfil = {
  id: number;
  nome: string;
  foto: string;
  descricao: string;
};

const mockCandidatos: Perfil[] = [
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

const mockEmpresas: Perfil[] = [
  {
    id: 1,
    nome: "Tech Corp",
    foto: "https://via.placeholder.com/300x400",
    descricao: "Empresa de tecnologia",
  },
  {
    id: 2,
    nome: "Design Co",
    foto: "",
    descricao: "Agência de design",
  },
  {
    id: 3,
    nome: "Finance Ltda",
    foto: "https://via.placeholder.com/300x400",
    descricao: "Consultoria financeira",
  },
];

export default function HomeScreen() {
  const route = useRoute();
  const routeAccountType = (route.params as any)?.accountType;

  const [accountType, setAccountType] = useState<
    "empresa" | "candidato" | null
  >(null);
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carregarTipoConta = async () => {
      try {
        let tipo = routeAccountType;
        if (!tipo) {
          tipo = await AsyncStorage.getItem("accountType");
        }

        if (tipo === "empresa" || tipo === "candidato") {
          setAccountType(tipo);
          setPerfis(tipo === "empresa" ? mockCandidatos : mockEmpresas);
        } else {
          console.warn("Tipo de conta não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao carregar tipo de conta:", err);
      }
    };

    carregarTipoConta();
  }, []);

  const handleLike = () => {
    const perfil = perfis[currentIndex];
    console.log("Curtido:", perfil?.nome);
    swiperRef?.swipeRight();
  };

  const handleDislike = () => {
    const perfil = perfis[currentIndex];
    console.log("Rejeitado:", perfil?.nome);
    swiperRef?.swipeLeft();
  };

  const handleSuperLike = () => {
    const perfil = perfis[currentIndex];
    console.log("Super Like em:", perfil?.nome);
    swiperRef?.swipeTop();
  };

  let swiperRef: Swiper<any> | null = null;

  if (!accountType) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={(ref: Swiper<any> | null): void => {
            swiperRef = ref;
          }}
          cards={perfis}
          cardIndex={currentIndex}
          onSwiped={(i) => setCurrentIndex(i + 1)}
          renderCard={(card) => (
            <View style={styles.card}>
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
            </View>
          )}
          stackSize={3}
          backgroundColor="transparent"
          disableTopSwipe={false}
        />
      </View>

      <View style={styles.actionsWrapper}>
        <TouchableOpacity
          onPress={handleDislike}
          style={[styles.button, styles.naoGostei]}
        >
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSuperLike}
          style={[styles.button, styles.superLike]}
        >
          <Image source={apertoIcon} style={styles.apertoImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLike}
          style={[styles.button, styles.gostei]}
        >
          <Image source={verificarIcon} style={styles.verificaImage} />
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
  },
  swiperContainer: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 500,
    padding: 15,
    alignItems: "center",
    elevation: 5,
  },
  image: {
    width: width * 0.8,
    height: 320,
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
  actionsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 90,
    gap: 30,
    zIndex: 2,
  },
  apertoImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  verificaImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  gostei: {
    backgroundColor: "#2fd185",
  },
  naoGostei: {
    backgroundColor: "#bf2f2f",
  },
  superLike: {
    backgroundColor: "#2fb4d1",
  },
});
