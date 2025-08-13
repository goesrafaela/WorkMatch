import axios from "axios";

const API_URL = "http://192.168.11.246:3000/api";

export const api = axios.create({
    baseURL: API_URL,
});

export const excluirContaAPI = (tipo: "candidatos" | "empresas", id: number) => {
    return api.delete(`/${tipo}/${id}`);
};
