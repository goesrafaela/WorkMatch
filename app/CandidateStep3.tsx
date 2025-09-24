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

export default function CandidateStep3() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { imagem, nome, sobrenome, nascimento } = route.params;

  const [localizacao, setLocalizacao] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onde você está?</Text>
      <TextInput
        style={styles.input}
        placeholder="Cidade, Estado"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("CandidateStep4", {
            candidateData: {
              imagem: imagem,
              nome,
              sobrenome,
              nascimento,
              localizacao,
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
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
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
