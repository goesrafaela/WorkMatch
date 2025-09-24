import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/index";

type CriarVagaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CriarVaga"
>;

const CriarVaga: React.FC = () => {
  const navigation = useNavigation<CriarVagaScreenNavigationProp>();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [salario, setSalario] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [beneficios, setBeneficios] = useState("");

  const handleCriarVaga = () => {
    if (!titulo || !descricao || !localizacao) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Aqui você implementaria a lógica para salvar a vaga
    // Por exemplo, enviar para uma API ou salvar localmente
    console.log("Nova vaga criada:", {
      titulo,
      descricao,
      localizacao,
      salario,
      requisitos,
      beneficios,
    });

    Alert.alert("Sucesso", "Vaga criada com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Criar Nova Vaga</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título da Vaga *</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Desenvolvedor React Native"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Localização *</Text>
          <TextInput
            style={styles.input}
            value={localizacao}
            onChangeText={setLocalizacao}
            placeholder="Ex: São Paulo, SP"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Salário</Text>
          <TextInput
            style={styles.input}
            value={salario}
            onChangeText={setSalario}
            placeholder="Ex: R$ 5.000 - R$ 8.000"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição da Vaga *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva as responsabilidades e atividades da vaga..."
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Requisitos</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={requisitos}
            onChangeText={setRequisitos}
            placeholder="Liste os requisitos necessários para a vaga..."
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Benefícios</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={beneficios}
            onChangeText={setBeneficios}
            placeholder="Liste os benefícios oferecidos..."
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCriarVaga}>
          <Text style={styles.createButtonText}>Criar Vaga</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  createButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CriarVaga;
