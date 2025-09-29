import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

// Função para gerar o estilo da barra de progresso (movida para fora do StyleSheet)
const getProgressFillStyle = (percent: number): ViewStyle => ({
  height: "100%",
  width: `${percent}%`,
  backgroundColor: "#007BFF",
  borderRadius: 3,
});

export default function CandidateStep2() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();

  const { candidateData } = route.params || {};

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [diaNasc, setDiaNasc] = useState("");
  const [mesNasc, setMesNasc] = useState("");
  const [anoNasc, setAnoNasc] = useState("");

  // Refs para controlar o foco dos campos de data
  const mesInputRef = useRef<TextInput>(null);
  const anoInputRef = useRef<TextInput>(null);

  const handleNext = () => {
    // Garante que a data está formatada como string
    const nascimento = `${diaNasc.padStart(2, "0")}/${mesNasc.padStart(
      2,
      "0"
    )}/${anoNasc}`;

    navigation.navigate("CandidateStep3", {
      candidateData: {
        ...candidateData, // Traz a imagem da tela anterior
        nome: nome,
        sobrenome: sobrenome,
        nascimento: nascimento,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Bree<Text style={styles.logoCheck}>✔</Text>
        </Text>
        <View style={styles.progressBar}>
          <View style={getProgressFillStyle(20)} />
        </View>
        <Text style={styles.stageText}>Etapa 2 de 9</Text>
        <Text style={styles.stageText}>20% do perfil completo</Text>
      </View>

      <Text style={styles.title}>Confirme seu nome e data de nascimento</Text>

      <Text style={styles.inputLabel}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.inputLabel}>Sobrenome</Text>
      <TextInput
        style={styles.input}
        value={sobrenome}
        onChangeText={setSobrenome}
      />

      <Text style={styles.inputLabel}>Data de nascimento</Text>
      <View style={styles.dateInputContainer}>
        <TextInput
          style={[styles.inputDate, { flex: 1.5 }]}
          placeholder="Dia"
          value={diaNasc}
          onChangeText={(text) => {
            setDiaNasc(text);
            // Pula para o campo "Mês" após 2 dígitos
            if (text.length === 2 && mesInputRef.current) {
              mesInputRef.current.focus();
            }
          }}
          // --- AJUSTE AQUI: Teclado numérico ---
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          ref={mesInputRef}
          style={[styles.inputDate, { flex: 1.5 }]}
          placeholder="Mês"
          value={mesNasc}
          onChangeText={(text) => {
            setMesNasc(text);
            // Pula para o campo "Ano" após 2 dígitos
            if (text.length === 2 && anoInputRef.current) {
              anoInputRef.current.focus();
            }
          }}
          // --- AJUSTE AQUI: Teclado numérico ---
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          ref={anoInputRef}
          style={[styles.inputDate, { flex: 2 }]}
          placeholder="Ano"
          value={anoNasc}
          onChangeText={setAnoNasc}
          // --- AJUSTE AQUI: Teclado numérico ---
          keyboardType="numeric"
          maxLength={4}
          // Fecha o teclado ao completar 4 dígitos
          onSubmitEditing={handleNext}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    marginBottom: 30,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  logoCheck: {
    color: "#007BFF",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginBottom: 5,
  },
  stageText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  inputDate: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
