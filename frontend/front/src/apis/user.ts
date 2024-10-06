import axios from "axios";

const url = "http://localhost:4001";

export const RegistryAccount = async (email: string, name: string) => {
    try {
        const response = await axios.post(`${url}/createUser`, {
            email,
            name
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar conta:", error);
        throw error;
    }
};

export const GetAccount = async (email: string, name: string) => {
    try {
        const response = await axios.get(`${url}/getAccount`, {
            params: {
                email,
                name
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter conta:", error);
        throw error;
    }
};

export const DeleteAccount = async (account_id: string) => {
    try {
        const response = await axios.delete(`${url}/deleteAccount`, {
            params: {
                account_id
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar conta:", error);
        throw error;
    }
};

export const UpdateAccount = async (account_id: string, email: string, name: string) => {
    try {
        const response = await axios.put(`${url}/updateAccount`, {
            account_id,
            email,
            name
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar conta:", error);
        throw error;
    }
};
