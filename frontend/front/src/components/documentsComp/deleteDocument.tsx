export const DeleteDocument = async (documentId) => {
    const response = await fetch(`/api/documents/${documentId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erro ao deletar o documento');
    }

    return response.json();
};
