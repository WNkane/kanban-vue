import axios from 'axios';

const API_BASE_URL = '';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*',
  'cache-control': 'no-cache',
};

// 創建一個 Axios 實例
const apiClient = axios.create({
  baseURL: API_BASE_URL, 
  headers: API_HEADERS,
  auth: {
    username: 'admin',
    password: 'password'
    },
  httpsAgent:{ rejectUnauthorized: false }
});

export interface Header {
  resultCode: string;
  resultDescription: string;
}

export interface RardResponse{
header:Header;
body:Card;
}


export const getCard = async (): Promise<RardResponse> => {
  try {
    const response = await apiClient.post<RardResponse>('/api/sample/Card/v1/getCard');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const insert = async<TRequest, TResponse> ( param: TRequest): Promise<TResponse> => {
    try {
      const response = await apiClient.post<TResponse>('/api/sample/Card/v1/insert',param);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


  
  export const update = async<TRequest, TResponse> ( param: TRequest): Promise<TResponse> => {
    try {
      const response = await apiClient.post<TResponse>('/api/sample/Card/v1/update',param);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

    
  export const del = async<TRequest, TResponse> ( param: TRequest): Promise<TResponse> => {
    try {
      const response = await apiClient.post<TResponse>('/api/sample/Card/v1/delete',param);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };