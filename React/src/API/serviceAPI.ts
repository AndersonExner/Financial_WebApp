import axios, { AxiosResponse } from "axios";
import { ResponseAPI } from "./typeStoreAPI";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const apiGet = async (route: string): Promise<ResponseAPI> => {
    try{
        const resp: AxiosResponse = await axios.get(route);
    
        const respostaAPI : ResponseAPI = {
          success: resp.data.success,
          message: resp.data.message,
          data: resp.data.data
        }
    
        return respostaAPI;
      }catch (error: any){
        const respostaAPIErro: ResponseAPI = {
          success: error.response.data.success,
          message: error.response.data.message,
          data: error.data.data
        }
    
        return respostaAPIErro
      }
}

export const apiPost = async (route: string, data: any): Promise<ResponseAPI> => {
  try {
    const resp: AxiosResponse = await axios.post(route, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(resp)

    const respostaAPI: ResponseAPI = {
      success: resp.data.success,
      message: resp.data.message,
      data: resp.data.data,
    };

    return respostaAPI;
  } catch (error: any) {
    const respostaAPIErro: ResponseAPI = {
      success: false,  
      message: error.response?.data?.detail || "Erro desconhecido",
      data:{},
    };

    return respostaAPIErro;
  }
};

export const apiPut = async (route: string, data: any): Promise<ResponseAPI> => {
    try{
        const resp: AxiosResponse = await axios.put(route, data);
    
        const respostaAPI : ResponseAPI = {
          success: resp.data.success,
          message: resp.data.message,
          data: resp.data.data
        }
    
        return respostaAPI;
      }catch (error: any){
        const respostaAPIErro: ResponseAPI = {
          success: error.response.data.success,
          message: error.response.data.message,
          data: error.data.data
        }
    
        return respostaAPIErro
      }
}

export const apiDelete = async (route: string): Promise<ResponseAPI> => {
    try{
        const resp: AxiosResponse = await axios.delete(route);
    
        const respostaAPI : ResponseAPI = {
          success: resp.data.success,
          message: resp.data.message,
          data: resp.data.data
        }
    
        return respostaAPI;
      }catch (error: any){
        const respostaAPIErro: ResponseAPI = {
          success: error.response.data.success,
          message: error.response.data.message,
          data: error.data.data
        }
    
        return respostaAPIErro
      }
}