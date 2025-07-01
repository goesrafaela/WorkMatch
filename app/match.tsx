import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { buscarPerfisDisponiveis, darLike } from "../utils/mockData";
import { useLocalSearchParams } from "expo-router";

export default function MatchScreen() {
  const { userId, userType } = useLocalSearchParams<{
    userId: string;
    userType: string;
  }>();
  const [perfis, setPerfis] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    buscarPerfisDisponiveis(userType as "empresa" | "candidato", userId!).then(
      setPerfis
    );
  }, []);

  const handleLike = async () => {
    const perfil = perfis[index];
    const deuMatch = await darLike(userId!, perfil.id);
    if (deuMatch) alert("🔥 Deu Match!");
    setIndex(index + 1);
  };

  const handlePassar = () => {
    setIndex(index + 1);
  };

  if (index >= perfis.length)
    return (
      <Text style={{ textAlign: "center", marginTop: 50 }}>
        Sem mais perfis
      </Text>
    );

  const perfil = perfis[index];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {userType === "empresa" ? (
          <>
            <Text style={styles.nome}>{perfil.nome}</Text>
            <Text>Email: {perfil.email}</Text>
            <Text>Habilidades: {perfil.habilidades?.join(", ")}</Text>
          </>
        ) : (
          <>
            <Text style={styles.nome}>{perfil.nomeEmpresa}</Text>
            <Text>Porte: {perfil.porte}</Text>
            <Text>Procurando: {perfil.profissao}</Text>
          </>
        )}
      </View>
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoNegativo} onPress={handlePassar}>
          <Text style={styles.textoBotao}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoPositivo} onPress={handleLike}>
          <Text style={styles.textoBotao}>💚</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: {
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
  },
  nome: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  botoes: { flexDirection: "row", justifyContent: "space-around" },
  botaoNegativo: { backgroundColor: "#F44336", padding: 20, borderRadius: 50 },
  botaoPositivo: { backgroundColor: "#4CAF50", padding: 20, borderRadius: 50 },
  textoBotao: { fontSize: 24, color: "white" },
});
