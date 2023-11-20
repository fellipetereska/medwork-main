import React, { useState, useRef } from 'react';
import axios from 'axios';

const ModalLogin = ({ onCancel, isOpen }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post(`http://localhost:8800/login`, {
                usuario: username,
                senha: password
            });
            
            setNomeUsuario(username);
            console.log("Usuário", username, "logado com sucesso!")

        }catch(error) {
            console.log(error)
        }
        
    }

      if (!isOpen) {
        return null;
    }
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute inset-0 bg-black opacity-25"></div>
            <div className="modal-container max-w-lg bg-white mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                <div className="flex justify-end p-1">
                    <button
                        type="button"
                        className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                        onClick={onCancel}>
                        <svg className="flex m-auto w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                    <form class="rounded px-8 pt-6 pb-8 mb-6 ml-6 mr-6" onSubmit={handleSubmit}>
                        <h1 class='flex justify-center mb-10 text-3xl text-rose-600 font-bold'>Login</h1>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="usuario">
                                Usuário
                            </label>
                            <input
                                class="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                                name='usuario'
                                type="text" 
                                value={username}
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="senha">
                                Senha
                            </label>
                            <input 
                                class="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                                name='senha'
                                value={password}
                                type="password" 
                                placeholder="Senha"
                                onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                            <div class="flex items-center justify-between mt-10">
                            <button class="w-full py-2 font-semibold cursor-pointer text-center focus:outline-none shadow hover:bg-rose-700 rounded-md text-white bg-rose-600"
                                    type='submit'>
                                Entrar
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default ModalLogin;