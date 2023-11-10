import React, { useState, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

function Login () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const { signin } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!username || !password) {
        toast.warn("Preencha todos os campos!");
        return;
      }
  
      try {
        await signin(username, password);
        setRedirect(true)
      } catch (error) {
        console.log(error);
      }
    };

    if(redirect){
        return <Navigate to="/home" />
    }
  
  

    return(
        <div>
            <div className="modal-container max-w-lg mt-28 mb-28 bg-white mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
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
}

export default Login;