import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProdutosScreen from "../screens/ProdutosScreen";
import DetalhesProdutoScreen from "../screens/DetalhesProdutoScreen";
import CadastrarProdutoScreen from "../screens/CadastrarProdutoScreen";
import EditarProdutoScreen from "../screens/EditarProdutoScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Produtos"
          component={ProdutosScreen}
          options={{ title: "Lista de Produtos" }}
        />
        <Stack.Screen
          name="DetalhesProduto"
          component={DetalhesProdutoScreen}
          options={{ title: "Detalhes do Produto" }}
        />
        <Stack.Screen
          name="CadastrarProduto"
          component={CadastrarProdutoScreen}
          options={{ title: "Cadastrar Produto" }}
        />
        <Stack.Screen
          name="EditarProduto"
          component={EditarProdutoScreen}
          options={{ title: "Editar Produto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
