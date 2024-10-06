// DocumentManager.jsx
import React, { useState } from 'react';
import DocumentForm from './DocumentForm';
import DocumentList from './DocumentList';

export default function DocumentManager({ documents, getAllDocuments }) {
    const [selectedDocument, setSelectedDocument] = useState(null);

    const handleDelete = async (id) => {
        // Chamar a função de deletar
        await DeleteDocument(id);
        getAllDocuments(); // Recarregar lista de documentos
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Gerenciar Documentos</h1>
            <DocumentForm 
                selectedDocument={selectedDocument} 
                setSelectedDocument={setSelectedDocument} 
                getAllDocuments={getAllDocuments} 
                documents={documents}
            />
            <DocumentList 
                documents={documents} 
                setSelectedDocument={setSelectedDocument} 
                handleDelete={handleDelete} 
            />
        </div>
    );
}
