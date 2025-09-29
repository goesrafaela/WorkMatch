import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewStyle,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const MAX_BIO_LENGTH = 140;
const GENERO_OPCOES = ["Masculino", "Feminino", "Prefiro não informar"];

const getProgressFillStyle = (percent: number): ViewStyle => ({
  height: "100%",
  width: `${percent}%`,
  backgroundColor: "#007BFF",
  borderRadius: 3,
});

export default function CandidateStep5() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { candidateData } = route.params || {};

  const [bio, setBio] = useState("");
  const [genero, setGenero] = useState(GENERO_OPCOES[0]);

  const handleNext = () => {
    navigation.navigate("CandidateStep6", {
      candidateData: {
        ...candidateData,
        bio: bio,
        genero: genero,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressWrapper}>
          <View style={styles.progressBar}>
            <View style={getProgressFillStyle(100)} />
          </View>
          <View style={styles.stageTextContainer}>
            <Text style={styles.stageText}>Etapa 9 de 9</Text>
            <Text style={styles.stageText}>Perfil concluído</Text>
          </View>
        </View>
      </View>

      <Text style={styles.title}>Bio curta</Text>

      <View style={styles.inputBioWrapper}>
        <Text style={styles.bioExemplo}>Ex.:</Text>
        <Text style={styles.charCount}>
          {bio.length}/{MAX_BIO_LENGTH}
        </Text>
        <TextInput
          style={styles.inputBio}
          placeholder="Babá com 5 anos de experiência em cuidado infantis."
          multiline={true}
          maxLength={MAX_BIO_LENGTH}
          value={bio}
          onChangeText={setBio}
        />
      </View>

      <Text style={styles.tipText}>
        Dica: seja direto e destaque seu principal diferencial.
      </Text>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Gênero</Text>
      {GENERO_OPCOES.map((opcao) => (
        <TouchableOpacity
          key={opcao}
          style={styles.radioContainer}
          onPress={() => setGenero(opcao)}
        >
          <Ionicons
            name={genero === opcao ? "radio-button-on" : "radio-button-off"}
            size={24}
            color={genero === opcao ? "#007BFF" : "#ccc"}
            style={styles.radioIcon}
          />
          <Text style={styles.radioLabel}>{opcao}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Finalizar perfil</Text>
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
  progressWrapper: {
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginBottom: 5,
  },

  stageTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stageText: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputBioWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    minHeight: 120,
    marginBottom: 10,
  },
  bioExemplo: {
    position: "absolute",
    top: 15,
    left: 15,
    color: "#333",
    fontWeight: "bold",
  },
  charCount: {
    position: "absolute",
    top: 15,
    right: 15,
    color: "#666",
    fontSize: 14,
  },
  inputBio: {
    fontSize: 16,
    marginTop: 20, // Empurra o texto para baixo, começando após o "Ex."
    textAlignVertical: "top",
    height: 70,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioIcon: {
    marginRight: 10,
  },
  radioLabel: {
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
