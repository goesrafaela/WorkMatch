import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";

const getProgressFillStyle = (percent: number): ViewStyle => ({
  height: "100%",
  width: `${percent}%`,
  backgroundColor: "#007BFF",
  borderRadius: 3,
});

export default function CandidateStep3() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { candidateData } = route.params || {};

  const [localizacao, setLocalizacao] = useState("");
  const [raio, setRaio] = useState("10 km");
  const [semLimite, setSemLimite] = useState(false);

  const handleNext = () => {
    navigation.navigate("CandidateStep4", {
      candidateData: {
        ...candidateData,
        localizacao: localizacao,
        raioBusca: semLimite ? "Sem Limite" : raio,
      },
    });
  };

  const RANGES = ["5 km", "10 km", "50 km"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Bree<Text style={styles.logoCheck}>✔</Text>
        </Text>
        <View style={styles.progressBar}>
          <View style={getProgressFillStyle(30)} />
        </View>
        <Text style={styles.stageText}>Etapa 3 de 9</Text>
        <Text style={styles.stageText}>30% do perfil completo</Text>
      </View>

      <Text style={styles.title}>Informe sua localização</Text>

      <Text style={styles.inputLabel}>Selecione a cidade ou cidades</Text>
      <TextInput
        style={styles.input}
        placeholder="Selecione a cidade ou cidades"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <Text style={styles.sectionTitle}>Usar minha localização atual</Text>
      <View style={styles.raioContainer}>
        {RANGES.map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.raioButton, raio === r && styles.raioButtonActive]}
            onPress={() => setRaio(r)}
            disabled={semLimite}
          >
            <Text
              style={[styles.raioText, raio === r && styles.raioTextActive]}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Definir raio de distância</Text>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          setSemLimite(!semLimite);
          setRaio(semLimite ? "10 km" : ""); // Reseta para 10km se desmarcar
        }}
      >
        <Ionicons
          name={semLimite ? "checkbox-outline" : "square-outline"}
          size={24}
          color={semLimite ? "#007BFF" : "#666"}
          style={styles.checkboxIcon}
        />
        <Text style={styles.checkboxLabel}>Sem limite geográfico</Text>
      </TouchableOpacity>

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
    fontSize: 32,
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
    marginBottom: 30,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  raioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  raioButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#007BFF",
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  raioButtonActive: {
    backgroundColor: "#007BFF",
  },
  raioText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  raioTextActive: {
    color: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
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
    marginTop: "auto",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
