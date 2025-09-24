import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../types";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          BreeV<Text style={styles.logoCheck}>✔</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
          <Ionicons name="search-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Olá, Lucas 👋 pronto para dar{"\n"}
          match hoje?
        </Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("match")}
      >
        <Text style={styles.startButtonText}>Começar a buscar</Text>
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Vagas perto de você</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Serviços em alta na sua região</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  logoCheck: {
    color: "#007BFF",
  },
  greetingContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  startButton: {
    backgroundColor: "#007BFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: (width - 60) / 2,
    height: 120,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
