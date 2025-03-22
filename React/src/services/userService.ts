import { apiPost } from "../API/serviceAPI"

export const userService = {
    // Função para criar um novo usuário
    createUser: async (email: string, password: string) => {
      try {
        const response = await apiPost("/user/createUser", { email, password });
        return response;
      } catch (error) {
        throw new Error("Erro ao criar usuário.");
      }
    },
    
    // Função de login
    login: async (email: string, password: string) => {
      try {
        const response = await apiPost("/user/login", { email, password });  
        console.log(response)
        return response;
      } catch (error) {
        throw new Error("Erro ao fazer login.");
      }
    },
  
    
    // Você pode adicionar outras funções como cadastrar itens, etc.
  };