import { apiPost } from "../API/serviceAPI"

export const userService = {
    // Função para criar um novo usuário
    createUser: async (login: string, password: string) => {
      try {
        const response = await apiPost("/user/createUser", { login, password });
        return response;
      } catch (error) {
        throw new Error("Erro ao criar usuário.");
      }
    },
    
    // Função de login
    login: async (login: string, password: string) => {
      try {
        const response = await apiPost("/user/login", { login, password });  
        return response;
      } catch (error) {
        throw new Error("Erro ao fazer login.");
      }
    },
  
  };