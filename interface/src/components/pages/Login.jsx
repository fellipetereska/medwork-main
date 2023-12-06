import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../../services/api';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        try {

            const { error } = await supabase.auth.signInWithPassword({
                email: username,
                password: password
            })


            if (error) {
                toast.error("Erro ao fazer login. Verifique suas credenciais.");
                console.error("Erro de autenticação:", error);
                return;
            }

            toast.success(`Login bem-sucedido! Bem-vindo, ${username}!`);
            setRedirect(true);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            toast.error("Erro ao fazer login. Verifique o console para mais detalhes.");
        }
    };

    if (redirect == true) {
        return <Navigate to="/home" />
    }



    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className='w-full bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <div>
                        <h1 className='text-3xl font-semibold text-neutral-800'>Faça login em sua conta</h1>
                        <p className='text-lg font-light text-sky-700'>Medwork - Segurança do Trabalho</p>
                    </div>
                    <form className="rounded space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className='mb-6 border-b border-gray-100'></div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usuario">
                                Usuário
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                                name='usuario'
                                type="text"
                                value={username}
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                                Senha
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                                name='senha'
                                value={password}
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    className="w-4 h-4 bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 hover:text-gray-800">Remember me</label>
                            </div>
                        </div>
                        <button className="w-full py-2 font-semibold cursor-pointer text-center focus:outline-none shadow hover:bg-sky-700 rounded-md text-white bg-sky-600"
                            type='submit'>
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;