import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Config() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [notificacoesAtivas, setNotificacoesAtivas] = React.useState(true);

  const confirmarExclusao = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert(
              "Conta excluída",
              "Sua conta foi removida com sucesso."
            );
            navigation.navigate("Login");
          },
        },
      ]
    );
  };

  const sairDaConta = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Remove o token salvo
      // Aqui você também poderia limpar dados do contexto, se usar Context API
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Conta</Text>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Alterar Senha</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Preferências</Text>

        <View style={styles.item}>
          <Text style={styles.itemText}>Notificações</Text>
          <Switch
            value={notificacoesAtivas}
            onValueChange={setNotificacoesAtivas}
          />
        </View>

        <Text style={styles.sectionTitle}>Privacidade</Text>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Política de Privacidade</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Termos de Uso</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={confirmarExclusao}>
          <Text style={[styles.itemText, { color: "red" }]}>Excluir Conta</Text>
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.item, { marginTop: 30 }]}
          onPress={sairDaConta}
        >
          <Text style={[styles.itemText, { color: "red" }]}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
