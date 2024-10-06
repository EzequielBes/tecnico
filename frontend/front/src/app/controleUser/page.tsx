"use client"
import { useEffect, useState } from 'react';
import { DeleteAccount, UpdateAccount } from '@/apis/user'; 

const AccountPage = () => {
    const [accountId, setAccountId] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isUpdateMode, setIsUpdateMode] = useState(false);

   
    useEffect(() => {
        const storedAccountId = localStorage.getItem('account_id'); 
        if (storedAccountId) {
            setAccountId(storedAccountId); 
            setIsUpdateMode(true); 
        }
    }, []);

    const handleUpdate = async () => {
        try {
            const result = await UpdateAccount(accountId, email, name);
            setMessage(`Conta atualizada com sucesso: ${result}`);
        } catch (error) {
            setMessage('Erro ao atualizar a conta.');
        }
    };

    const handleCreate = async () => {
      
        setMessage('Conta criada com sucesso.'); 
    };

    const handleDelete = async () => {
        try {
            const result = await DeleteAccount(accountId);
            setMessage(`Conta deletada com sucesso: ${result}`);
        } catch (error) {
            setMessage('Erro ao deletar a conta.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Gerenciar Conta</h1>

            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
              
                {isUpdateMode && (
                    <input
                        type="hidden"
                        value={accountId}
                        readOnly
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                {isUpdateMode ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Atualizar Conta
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full p-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Deletar Conta
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleCreate}
                        className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                        Criar Conta
                    </button>
                )}
            </div>

            {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </div>
    );
};

export default AccountPage;
