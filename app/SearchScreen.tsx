import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

export default function SearchScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [serviceType, setServiceType] = useState("Serviço:");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Jundiaí, SP");
  const [price, setPrice] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const handleSearch = () => {
    // Lógica para realizar a busca com base nos filtros
    Alert.alert(
      "Busca realizada",
      `Buscando por: ${searchQuery}\nServiço: ${serviceType}\nLocalização: ${location}\nPreço: ${
        price ? "Até R$50/h" : "Não definido"
      }\nUrgente: ${urgent ? "Sim" : "Não"}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          BreeV<Text style={styles.logoCheck}>✔</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            /* Lógica para a barra de busca */
          }}
        >
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Buscar</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estou buscando</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={serviceType}
            onValueChange={(itemValue) => setServiceType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Serviço:" value="Serviço:" />
            <Picker.Item label="Babá" value="Babá" />
            <Picker.Item label="Encanador" value="Encanador" />
            <Picker.Item label="Eletricista" value="Eletricista" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Por</Text>
        <TextInput
          style={styles.input}
          placeholder="Babá"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Localização</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Jundiaí, SP" value="Jundiaí, SP" />
            <Picker.Item label="São Paulo, SP" value="São Paulo, SP" />
            <Picker.Item label="Campinas, SP" value="Campinas, SP" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filtros</Text>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Faixa de preço</Text>
          <Text style={styles.checkboxText}>Até R$50/h</Text>
          <TouchableOpacity
            style={[styles.checkbox, price && styles.checked]}
            onPress={() => setPrice(!price)}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}></Text>
          <Text style={styles.checkboxText}>Urgente</Text>
          <TouchableOpacity
            style={[styles.checkbox, urgent && styles.checked]}
            onPress={() => setUrgent(!urgent)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 50,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  logoCheck: {
    color: "#007BFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  checkboxText: {
    fontSize: 16,
    color: "#333",
    flex: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007BFF",
    borderRadius: 4,
    marginLeft: 10,
  },
  checked: {
    backgroundColor: "#007BFF",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
