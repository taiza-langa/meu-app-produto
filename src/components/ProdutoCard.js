import { Pressable, StyleSheet, Text } from "react-native";

export default function ProdutoCard({ produto, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.descricao}>{produto.descricao}</Text>

      <Text style={styles.preco}>
        {produto.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>

      <Text style={styles.estoque}>
        Estoque: {produto.estoque} unidades
      </Text>

      <Text style={styles.acao}>Ver detalhes →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  descricao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  preco: {
    fontSize: 16,
    color: "#15803d",
    marginTop: 8,
  },
  estoque: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  acao: {
    color: "#2563eb",
    marginTop: 12,
    fontWeight: "600",
  },
});
