import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import useAuth from '../../hooks/useAuth'

function Login() {

    const { signin } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [showpasd, setShowpasd] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        signin(username, password, setRedirect);
    };

    if (redirect == true) {
        return <Navigate to="/home" />
    }

    const ShowPassword = (e) => {
        e.preventDefault();

        setShowpasd(!showpasd);
    }

    const forgotpasd = () => {
        toast.warn("Fale com um adminitrador!")
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
                            <div className='relative'>
                                <input
                                    className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                                    name='senha'
                                    value={password}
                                    type={showpasd ? "text" : "password"}
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)} />
                                <button
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400"
                                    onClick={ShowPassword}
                                >
                                    {showpasd ? (
                                        <BsEyeSlashFill />
                                    ) : (
                                        <IoEyeSharp />
                                    )}
                                </button>
                            </div>
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
                    <div className="text-right cursor-pointer">
                        <a onClick={forgotpasd}>
                            <p className='text-sm text-gray-500'>Esqueceu sua senha?</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;