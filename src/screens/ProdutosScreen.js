import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { getProdutos } from "../services/api";
import ProdutoCard from "../components/ProdutoCard";
import { useNavigation } from "@react-navigation/native";

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setLoading(true);
      const dados = await getProdutos();
      setProdutos(dados);
    } catch (error) {
      setErro("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View>
        <Text>{erro}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProdutoCard
            produto={item}
            onPress={() =>
              navigation.navigate("DetalhesProduto", { id: item.id })
            }
          />
        )}
      />
    </View>
  );
}
