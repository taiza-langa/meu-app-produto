import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ProdutoCard from "../components/ProdutoCard";
import { getProdutos } from "../services/api";

export default function ProdutosScreen() {
  const navigation = useNavigation();

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregarProdutos = async () => {
    try {
      setErro("");
      setLoading(true);
      const dados = await getProdutos();
      setProdutos(dados);
    } catch (error) {
      setErro("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Meus Produtos</Text>
        <Text style={styles.subtitulo}>
          Consulte e gerencie seus produtos
        </Text>
      </View>

      <View style={styles.botao}>
        <Button
          title="+ Cadastrar produto"
          onPress={() => navigation.navigate("CadastrarProduto")}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={styles.loading} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProdutoCard
              produto={item}
              onPress={() =>
                navigation.navigate("DetalhesProduto", { id: item.id })
              }
            />
          )}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum produto cadastrado.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  cabecalho: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
  },
  botao: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  lista: {
    paddingBottom: 24,
  },
  loading: {
    marginTop: 30,
  },
  erro: {
    color: "#dc2626",
    padding: 16,
  },
  vazio: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 30,
    fontSize: 16,
  },
});
