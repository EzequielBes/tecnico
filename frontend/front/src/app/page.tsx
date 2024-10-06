"use client";
import { RegistryAccount } from '@/apis/user';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await RegistryAccount(data.email, data.name);
      console.log(response);
   
      if (response) {
        router.push('/signin');
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    
    }
  };

  return (
    <div className='bg-slate-600 min-h-screen min-w-screen flex items-center justify-center'>
      <div className='bg-white p-6 rounded shadow-md'>
        <h1 className='text-slate-600 font-semibold text-lg mb-4'>Cadastrar usuário</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className='block mb-2'>Email</label>
          <input 
            type="email" 
            {...register('email', { required: true })} 
            className="border border-gray-300 p-2 w-full mb-4" 
          />
          <label className='block mb-2'>Name</label>
          <input 
            type="text" 
            {...register('name', { required: true })} 
            className="border border-gray-300 p-2 w-full mb-4" 
          />
          <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
