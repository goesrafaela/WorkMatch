import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

export default function CandidateStep4() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { imagem, nome, sobrenome, nascimento, localizacao } = route.params;

  const [areas, setAreas] = useState("");
  const [experiencia, setExperiencia] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Áreas de atuação</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Programação, Design..."
        value={areas}
        onChangeText={setAreas}
      />

      <Text style={styles.title}>Experiência</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 3 anos como desenvolvedor"
        value={experiencia}
        onChangeText={setExperiencia}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("CandidateStep5", {
            candidateData: {
              imagem,
              nome,
              sobrenome,
              nascimento,
              localizacao,
              areas,
              experiencia,
            },
          })
        }
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
