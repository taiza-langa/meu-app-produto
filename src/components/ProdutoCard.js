import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProdutoCard({ produto, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressionado,
      ]}
      onPress={onPress}
    >
      <View style={styles.conteudo}>
        <View style={styles.informacoes}>
          <Text style={styles.descricao}>{produto.descricao}</Text>
          <Text style={styles.estoque}>
            Estoque: {produto.estoque} unidades
          </Text>
        </View>

        <Text style={styles.seta}>›</Text>
      </View>

      <View style={styles.rodape}>
        <Text style={styles.preco}>
          {Number(produto.preco).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
        <Text style={styles.acao}>Ver detalhes</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginBottom: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
  },
  cardPressionado: {
    opacity: 0.8,
  },
  conteudo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  informacoes: {
    flex: 1,
    marginRight: 12,
  },
  descricao: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1f2937",
  },
  estoque: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 7,
  },
  seta: {
    fontSize: 28,
    color: "#9ca3af",
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    marginTop: 14,
    paddingTop: 12,
  },
  preco: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#15803d",
  },
  acao: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563eb",
  },
});
