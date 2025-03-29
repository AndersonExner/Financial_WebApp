import { apiPost } from "../API/serviceAPI"

export const userService = {
    createUser: async (login: string, password: string) => {
      try {
        const response = await apiPost("/user/createUser", { login, password });
        return response;
      } catch (error) {
        throw new Error("Erro ao criar usuário.");
      }
    },
    
    login: async (login: string, password: string) => {
      try {
        const response = await apiPost("/user/login", { login, password });  
        return response;
      } catch (error) {
        throw new Error("Erro ao fazer login.");
      }
    },
  
  };