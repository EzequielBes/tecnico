'use client';
import React, { useState, useEffect } from 'react';
import DocumentForm from '@/components/documentsComp/documentForm';
import DocumentList from '@/components/documentsComp/documentlist';
import { DeleteDocument, GetAllDocuments } from '@/apis/document';

export default function DocumentManager() {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState(null);
    const [jwt, setJwt] = useState("");

    useEffect(() => {
        const storedAccountId = localStorage.getItem("account_id");
        const storedJwt = localStorage.getItem("jwt");

        if (storedAccountId) {
            setAccountId(storedAccountId);
            setJwt(storedJwt);
            console.log("JWT armazenado:", storedJwt);
        } else {
            setErrorMessage("Nenhum account_id encontrado.");
        }
    }, []); 

    useEffect(() => {
        if (accountId) {
            getAllDocuments();
        }
    }, [accountId]);

    const getAllDocuments = async () => {
        try {
            const getAllDocuments = await GetAllDocuments(accountId);
            setDocuments(getAllDocuments);
        } catch (error) {
            setErrorMessage("Erro ao buscar documentos.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await DeleteDocument(id, jwt);
            getAllDocuments(); 
        } catch (error) {
            setErrorMessage("Erro ao deletar documento.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Gerenciar Documentos</h1>
            <DocumentForm 
                selectedDocument={selectedDocument} 
                setSelectedDocument={setSelectedDocument} 
                getAllDocuments={getAllDocuments} 
                documents={documents}
                setErrorMessage={setErrorMessage} 
            />
            <DocumentList 
                documents={documents} 
                setSelectedDocument={setSelectedDocument} 
                handleDelete={handleDelete} 
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
}
