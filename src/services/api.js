const API_URL = "http://localhost:8080";

export async function getProdutos() {
  const response = await fetch(`${API_URL}/produtos`);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json();
}

export async function getProduto(id) {
  const response = await fetch(`${API_URL}/produtos/${id}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar produto");
  }

  return response.json();
}

export async function criarProduto(produto) {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar produto");
  }

  return response.json();
}

export async function editarProduto(id, produto) {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar produto");
  }

  return response.json();
}

export async function excluirProduto(id) {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir produto");
  }
}
