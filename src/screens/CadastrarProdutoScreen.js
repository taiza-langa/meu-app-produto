import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { criarProduto } from "../services/api";

export default function CadastrarProdutoScreen({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [loading, setLoading] = useState(false);

  async function cadastrar() {
    if (!descricao.trim() || !preco.trim() || !estoque.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const precoNumero = Number(preco.replace(",", "."));
    const estoqueNumero = Number(estoque);

    if (
      !Number.isFinite(precoNumero) ||
      precoNumero < 0 ||
      !Number.isInteger(estoqueNumero) ||
      estoqueNumero < 0
    ) {
      Alert.alert("Atenção", "Informe um preço e um estoque válidos.");
      return;
    }

    try {
      setLoading(true);

      await criarProduto({
        descricao: descricao.trim(),
        preco: precoNumero,
        estoque: estoqueNumero,
      });

      Alert.alert("Sucesso", "Produto cadastrado!");

      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o produto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar produto</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 29,90"
        value={preco}
        onChangeText={setPreco}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Estoque</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={estoque}
        onChangeText={setEstoque}
        keyboardType="numeric"
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Cadastrar produto" onPress={cadastrar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1f2937",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
});
