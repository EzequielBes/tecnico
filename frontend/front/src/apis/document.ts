import axios from "axios";

const url = "http://localhost:4001";

export const RegistryDocument = async (document_name: string, status: string, account_id: string, jwt: string) => {
    try {
        const response = await axios.post(`${url}/createDocument`, {
            document_name, 
            status,
            account_id
        }, {
            headers: {
                'Authorization': `Bearer ${jwt}` 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
};

export const GetDocument = async (document_id: string) => {
    try {
        const response = await axios.get(`${url}/getDocument`, {
            params: {
                document_id
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
};

export const GetAllDocuments = async (userId: string) => {
    try {
        const response = await axios.get(`${url}/getAllDocuments`, {
            params: {
                userId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all documents:", error);
        throw error;
    }
};

export const DeleteDocument = async (document_id: string, token: string) => {
    try {
        const response = await axios.delete(`${url}/deleteDocument`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                document_id
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
};

export const UpdateDocument = async (document_id: string, document_name: string, status: string, account_id: string) => {
    try {
        const response = await axios.put(`${url}/updateDocument`, {
            document_id,
            document_name,
            status,
            account_id
        });
        return response.data;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};
