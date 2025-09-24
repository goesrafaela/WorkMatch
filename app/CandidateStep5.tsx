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

export default function CandidateStep5() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const {
    imagem,
    nome,
    sobrenome,
    nascimento,
    localizacao,
    areas,
    experiencia,
  } = route.params;

  const [bio, setBio] = useState("");
  const [genero, setGenero] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre você</Text>
      <TextInput
        style={styles.input}
        placeholder="Escreva uma breve bio"
        value={bio}
        onChangeText={setBio}
      />

      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={genero}
        onChangeText={setGenero}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("CandidateStep6", {
            candidateData: {
              imagem,
              nome,
              sobrenome,
              nascimento,
              localizacao,
              areas,
              experiencia,
              bio,
              genero,
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
