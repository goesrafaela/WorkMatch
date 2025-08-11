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
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";

export default function ChatDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { nome } = route.params as { nome: string };

  const [mensagens, setMensagens] = useState([
    { id: "1", texto: "Olá, tudo bem?", enviadoPorMim: false, tipo: "texto" },
    { id: "2", texto: "Oi! Tudo e você?", enviadoPorMim: true, tipo: "texto" },
  ]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [documentoAnexo, setDocumentoAnexo] = useState<{
    name: string;
    uri: string;
  } | null>(null);

  const enviarMensagem = () => {
    if (!novaMensagem.trim() && !documentoAnexo) return;

    setMensagens((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        texto: novaMensagem.trim() || "",
        documento: documentoAnexo || null,
        enviadoPorMim: true,
        tipo: documentoAnexo ? "documento" : "texto",
      },
    ]);

    setNovaMensagem("");
    setDocumentoAnexo(null);
  };

  const anexarDocumento = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      if (resultado.type === "success") {
        setDocumentoAnexo({ name: resultado.name, uri: resultado.uri });
      }
    } catch (error) {
      console.log("Erro ao anexar documento:", error);
    }
  };

  const abrirDocumento = async (uri: string) => {
    try {
      if (Platform.OS === "android") {
        const cUri = await FileSystem.getContentUriAsync(uri);
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        });
      } else {
        await FileSystem.readAsStringAsync(uri); // Apenas para garantir acesso
        await FileSystem.getContentUriAsync(uri); // iOS abre nativamente
      }
    } catch (error) {
      console.log("Erro ao abrir documento:", error);
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
            {item.tipo === "documento" && item.documento && (
              <TouchableOpacity
                style={styles.docContainer}
                onPress={() => abrirDocumento(item.documento.uri)}
              >
                <MaterialIcons
                  name="insert-drive-file"
                  size={24}
                  color="#555"
                />
                <Text style={styles.docName}>{item.documento.name}</Text>
              </TouchableOpacity>
            )}
            {item.texto ? (
              <Text
                style={[
                  styles.textoMensagem,
                  item.enviadoPorMim && { color: "#fff" },
                ]}
              >
                {item.texto}
              </Text>
            ) : null}
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
      />

      {/* Campo de Nova Mensagem */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={anexarDocumento}>
          <MaterialIcons name="attach-file" size={24} color="#666" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          {documentoAnexo && (
            <View style={styles.previewDoc}>
              <MaterialIcons name="insert-drive-file" size={20} color="#555" />
              <Text
                numberOfLines={1}
                style={{ flex: 1, marginLeft: 5, fontSize: 13 }}
              >
                {documentoAnexo.name}
              </Text>
              <TouchableOpacity onPress={() => setDocumentoAnexo(null)}>
                <Ionicons name="close-circle" size={18} color="#999" />
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            placeholder="Digite sua mensagem..."
            style={styles.input}
            value={novaMensagem}
            onChangeText={setNovaMensagem}
          />
        </View>

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
  docContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  docName: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 5,
  },
  previewDoc: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
});
