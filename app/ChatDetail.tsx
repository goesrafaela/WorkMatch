import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

export default function ChatDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { nome } = route.params as { nome: string };

  const [mensagens, setMensagens] = useState([
    { id: "1", texto: "Olá, tudo bem?", enviadoPorMim: false },
    { id: "2", texto: "Oi! Tudo e você?", enviadoPorMim: true },
  ]);
  const [novaMensagem, setNovaMensagem] = useState("");

  const enviarMensagem = () => {
    if (!novaMensagem.trim()) return;

    setMensagens((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        texto: novaMensagem,
        enviadoPorMim: true,
      },
    ]);
    setNovaMensagem("");
  };

  const anexarDocumento = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      if (resultado.type === "success") {
        setMensagens((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            texto: `📎 Documento: ${resultado.name}`,
            enviadoPorMim: true,
          },
        ]);
      }
    } catch (error) {
      console.log("Erro ao anexar documento:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{nome}</Text>
      </View>

      {/* Lista de Mensagens */}
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.mensagemContainer,
              item.enviadoPorMim ? styles.mensagemMinha : styles.mensagemOutra,
            ]}
          >
            <Text
              style={[
                styles.textoMensagem,
                item.enviadoPorMim && { color: "#fff" },
              ]}
            >
              {item.texto}
            </Text>
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
      />

      {/* Campo de Nova Mensagem */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={anexarDocumento}>
          <MaterialIcons name="attach-file" size={24} color="#666" />
        </TouchableOpacity>
        <TextInput
          placeholder="Digite sua mensagem..."
          style={styles.input}
          value={novaMensagem}
          onChangeText={setNovaMensagem}
        />
        <TouchableOpacity onPress={enviarMensagem}>
          <Ionicons name="send" size={24} color="#f56624" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f56624",
    marginLeft: 15,
  },
  mensagemContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: "70%",
    borderRadius: 8,
  },
  mensagemMinha: {
    backgroundColor: "#f56624",
    alignSelf: "flex-end",
  },
  mensagemOutra: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  textoMensagem: {
    fontSize: 15,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
});
