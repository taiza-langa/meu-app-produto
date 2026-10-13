import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getProduto, editarProduto } from "../services/api";

export default function EditarProdutoScreen({ route, navigation }) {
  const { id } = route.params;

  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const produto = await getProduto(id);

        setDescricao(produto.descricao);
        setPreco(String(produto.preco).replace(".", ","));
        setEstoque(String(produto.estoque));
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar o produto.");
      } finally {
        setLoading(false);
      }
    }

    carregarProduto();
  }, [id]);

  async function salvarAlteracoes() {
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
      Alert.alert("Atenção", "Informe um preço e estoque válidos.");
      return;
    }

    try {
      setSalvando(true);

      await editarProduto(id, {
        descricao: descricao.trim(),
        preco: precoNumero,
        estoque: estoqueNumero,
      });

      Alert.alert("Sucesso", "Produto atualizado!");

      navigation.navigate("Produtos");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o produto.");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar produto</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Nome do produto"
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Ex.: 29,90"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Estoque</Text>
      <TextInput
        style={styles.input}
        value={estoque}
        onChangeText={setEstoque}
        placeholder="Quantidade"
        keyboardType="numeric"
      />

      {salvando ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Salvar alterações" onPress={salvarAlteracoes} />
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
  loading: {
    marginTop: 30,
  },
});
