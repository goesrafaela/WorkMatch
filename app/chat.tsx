import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

const mockConversas = [
  {
    id: "1",
    nome: "João Silva",
    ultimaMensagem: "Olá tudo bom?",
  },
  {
    id: "2",
    nome: "Maria Souza",
    ultimaMensagem: "Podemos marcar a entrevista para sexta?",
  },
  {
    id: "3",
    nome: "ProgramCenter",
    ultimaMensagem: "Podemos conversar sobre seus interesses na empresa?",
  },
  {
    id: "4",
    nome: "Carlos Eduardo",
    ultimaMensagem: "Ok, então me manda seu curriculo",
  },
];

export default function ChatScreen() {
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const abrirConversa = (nome: string) => {
    navigation.navigate("ChatDetail", { nome });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conversas</Text>
      </View>

      <FlatList
        data={mockConversas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => abrirConversa(item.nome)}>
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.mensagem}>{item.ultimaMensagem}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5864",
    marginLeft: 15,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  mensagem: {
    fontSize: 14,
    color: "#666",
  },
});
