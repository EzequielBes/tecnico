import React from 'react';

export default function DocumentList({ documents, setSelectedDocument, handleDelete }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Documentos Existentes</h2>
            <ul>
                {documents.map((doc) => (
                    <li key={doc.id} className="flex justify-between items-center mb-2 p-2 border-b">
                        <span className="text-gray-800">{doc.document_name}</span>
                        <div>
                            <button onClick={() => setSelectedDocument(doc)} className="text-blue-500 mr-2 hover:underline">Modificar</button>
                            <button onClick={() => handleDelete(doc.document_id)} className="text-red-500 hover:underline">Deletar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
