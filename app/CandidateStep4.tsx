import React, { useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

const getProgressFillStyle = (percent: number): ViewStyle => ({
  height: "100%",
  width: `${percent}%`,
  backgroundColor: "#007BFF",
  borderRadius: 3,
});

// Mocks para simplificar
const MOCK_AREAS = ["Babá", "Auxiliar Administrativo", "Designer"];
const EXPERIENCIA_OPCOES = [
  "Nenhuma experiência",
  "Menos de 1 ano",
  "1–3 anos",
  "3–5 anos",
  "+5 anos",
];
const DISPONIBILIDADE_OPCOES = ["Integral", "Meio Período", "Freelancer"];

export default function CandidateStep4() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { candidateData } = route.params || {};

  const [areas, setAreas] = useState<string[]>([]);
  const [experiencia, setExperiencia] = useState(EXPERIENCIA_OPCOES[0]);
  const [disponibilidade, setDisponibilidade] = useState<string[]>([]);

  const toggleArea = (area: string) => {
    setAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleDisponibilidade = (item: string) => {
    setDisponibilidade((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    navigation.navigate("CandidateStep5", {
      candidateData: {
        ...candidateData,
        areas: areas.join(", "),
        experiencia: experiencia,
        disponibilidade: disponibilidade.join(", "),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stageText}>Etapa 5 de 9</Text>
        <View style={styles.progressBar}>
          <View style={getProgressFillStyle(50)} />
        </View>
      </View>

      <Text style={styles.title}>Áreas de Atuação</Text>
      <View style={styles.tagsContainer}>
        {MOCK_AREAS.map((area) => (
          <TouchableOpacity
            key={area}
            style={[styles.tag, areas.includes(area) && styles.tagActive]}
            onPress={() => toggleArea(area)}
          >
            <Text
              style={[
                styles.tagText,
                areas.includes(area) && styles.tagTextActive,
              ]}
            >
              {area}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        Quanto tempo de experiência você tem na área principal?
      </Text>
      {EXPERIENCIA_OPCOES.map((opcao) => (
        <TouchableOpacity
          key={opcao}
          style={styles.radioContainer}
          onPress={() => setExperiencia(opcao)}
        >
          <Ionicons
            name={
              experiencia === opcao ? "radio-button-on" : "radio-button-off"
            }
            size={20}
            color={experiencia === opcao ? "#007BFF" : "#ccc"}
            style={styles.radioIcon}
          />
          <Text style={styles.radioLabel}>{opcao}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Disponibilidade</Text>
      {DISPONIBILIDADE_OPCOES.map((opcao) => (
        <TouchableOpacity
          key={opcao}
          style={styles.checkboxRow}
          onPress={() => toggleDisponibilidade(opcao)}
        >
          <Ionicons
            name={
              disponibilidade.includes(opcao)
                ? "checkbox-outline"
                : "square-outline"
            }
            size={24}
            color={disponibilidade.includes(opcao) ? "#007BFF" : "#666"}
            style={styles.checkboxIcon}
          />
          <Text style={styles.checkboxLabel}>{opcao}</Text>
        </TouchableOpacity>
      ))}

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
  stageText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginBottom: 5,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  tagActive: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  tagText: {
    fontSize: 16,
    color: "#333",
  },
  tagTextActive: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioIcon: {
    marginRight: 10,
  },
  radioLabel: {
    fontSize: 16,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxIcon: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "auto", // Empurra o botão para baixo
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
