import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/index";

type VisualizarInteressadosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VisualizarInteressados"
>;
type VisualizarInteressadosScreenRouteProp = {
  params: { vagaId: string };
};

interface Interessado {
  id: string;
  nome: string;
  profissao: string;
  localizacao: string;
  foto?: string;
  experiencia: string;
}

const VisualizarInteressados: React.FC = () => {
  const navigation =
    useNavigation<VisualizarInteressadosScreenNavigationProp>();
  const route = useRoute() as VisualizarInteressadosScreenRouteProp;
  const { vagaId } = route.params;

  // Mock data - em um app real, você buscaria os dados baseado no vagaId
  const interessados: Interessado[] = [
    {
      id: "1",
      nome: "João Silva",
      profissao: "Desenvolvedor Frontend",
      localizacao: "São Paulo, SP",
      experiencia: "3 anos de experiência",
    },
    {
      id: "2",
      nome: "Maria Santos",
      profissao: "Desenvolvedora Full Stack",
      localizacao: "Rio de Janeiro, RJ",
      experiencia: "5 anos de experiência",
    },
    {
      id: "3",
      nome: "Pedro Costa",
      profissao: "Desenvolvedor Mobile",
      localizacao: "Belo Horizonte, MG",
      experiencia: "2 anos de experiência",
    },
  ];

  const handleVerPerfil = (interessadoId: string) => {
    navigation.navigate("PerfilDetalhado", { userId: interessadoId });
  };

  const handleIniciarChat = (interessadoId: string) => {
    navigation.navigate("ChatDetail", { chatId: interessadoId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Interessados na Vaga</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>{interessados.length} interessados</Text>

        {interessados.map((interessado) => (
          <View key={interessado.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {interessado.nome.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.nome}>{interessado.nome}</Text>
                <Text style={styles.profissao}>{interessado.profissao}</Text>
                <Text style={styles.localizacao}>
                  {interessado.localizacao}
                </Text>
                <Text style={styles.experiencia}>
                  {interessado.experiencia}
                </Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.perfilButton]}
                onPress={() => handleVerPerfil(interessado.id)}
              >
                <Text style={styles.perfilButtonText}>Ver Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.chatButton]}
                onPress={() => handleIniciarChat(interessado.id)}
              >
                <Text style={styles.chatButtonText}>Iniciar Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  profissao: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  localizacao: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  experiencia: {
    fontSize: 14,
    color: "#007AFF",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  perfilButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  perfilButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  chatButton: {
    backgroundColor: "#007AFF",
  },
  chatButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default VisualizarInteressados;
