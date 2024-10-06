"use client";
import { GetAccount } from "@/apis/user";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const router = useRouter(); 
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await GetAccount(data.email, data.name);
      console.log(response.jwt);
      if (response) {
        localStorage.setItem("account_id", response.account_id);
        localStorage.setItem("jwt", response.jwt)
        console.log(response.account_id)
        console.log(response.jwt)
        router.push("/document");
      }
    } catch (error) {
      console.error("Erro ao obter conta:", error);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-gray-800 font-semibold text-xl text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu email"
          />
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu nome"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
          >
            Logar
          </button>
        </form>
      </div>
    </div>
  );
}
