import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { getProduto } from "../services/api";
import { excluirProduto } from "../services/api";

export default function DetalhesProdutoScreen({ route, navigation }) {
  const { id } = route.params;

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProduto() {
      try {
        const dados = await getProduto(id);
        setProduto(dados);
      } catch (error) {
        setErro("Não foi possível carregar o produto.");
      } finally {
        setLoading(false);
      }
    }

    carregarProduto();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  if (erro) {
    return <Text style={styles.erro}>{erro}</Text>;
  }

  if (!produto) {
    return <Text style={styles.erro}>Produto não encontrado.</Text>;
  }

  async function excluir() {
    console.log("Botão excluir clicado. ID:", id);

    const confirmar = window.confirm("Deseja realmente excluir este produto?");

    if (!confirmar) return;

    try {
      console.log("Enviando DELETE para a API...");

      await excluirProduto(id);

      window.alert("Produto excluído com sucesso!");
      navigation.navigate("Produtos");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      window.alert("Erro ao excluir produto. Verifique o terminal.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{produto.descricao}</Text>

      <Text style={styles.preco}>
        {produto.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>

      <Text style={styles.texto}>Código: {produto.id}</Text>
      <Text style={styles.texto}>Estoque: {produto.estoque} unidades</Text>
      <View style={styles.botoes}>
        <Button
          title="Editar produto"
          onPress={() =>
            navigation.navigate("EditarProduto", { id: produto.id })
          }
        />

        <Button title="Excluir produto" color="#dc2626" onPress={excluir} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  loading: {
    marginTop: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
  },
  preco: {
    fontSize: 22,
    color: "#15803d",
    marginVertical: 16,
  },
  texto: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 8,
  },
  erro: {
    padding: 20,
    color: "#dc2626",
  },
  botoes: {
    gap: 12,
    marginTop: 20,
  },
});
