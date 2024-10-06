import { RegistryDocument, UpdateDocument } from '@/apis/document';
import React, { useState, useEffect } from 'react';

export default function DocumentForm({ selectedDocument, setSelectedDocument, getAllDocuments, documents, setErrorMessage }) {
    const [documentName, setDocumentName] = useState("");
    const [status, setStatus] = useState("");
    const [jwt, setJwt] = useState("");
    const [accountId, setAccountId] = useState("");

    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt");
        const storedAccountId = localStorage.getItem("account_id");

        if (storedJwt && storedAccountId) {
            setJwt(storedJwt);
            setAccountId(storedAccountId);
        }
    }, []);

    useEffect(() => {
        if (selectedDocument) {
            setDocumentName(selectedDocument.document_name);
            setStatus(selectedDocument.status);
        } else {
            setDocumentName("");
            setStatus("");
        }
    }, [selectedDocument]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 

        const exists = documents.some(doc => doc.document_name === documentName);
        if (exists && !selectedDocument) {
            setErrorMessage("J� existe um documento com esse nome.");
            return;
        }

        if (selectedDocument) {
           const response = await UpdateDocument( selectedDocument.document_id, documentName, status, accountId );
           console.log(response)
        } else {
            if (!accountId || !jwt) {
                setErrorMessage("Erro de autentica��o. Tente novamente.");
                return;
            }
            try {
                const response = await RegistryDocument(documentName, status, accountId, jwt);
                console.log(response);
            } catch (error) {
                setErrorMessage("Erro ao registrar o documento.");
                console.error(error);
            }
        }

        setSelectedDocument(null); 
        getAllDocuments();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">{selectedDocument ? "Modificar Documento" : "Criar Documento"}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={documentName} 
                    onChange={(e) => setDocumentName(e.target.value)} 
                    placeholder="Nome do documento" 
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                    required
                />
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                    required
                >
                    <option value="">Selecione o status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Assinado">Assinado</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200">
                    {selectedDocument ? "Atualizar Documento" : "Salvar Documento"}
                </button>
            </form>
        </div>
    );
}
