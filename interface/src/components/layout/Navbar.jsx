import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';


import { BiLogIn } from 'react-icons/bi'
import logo from '../media/logo_menu.png'
import useAuth from '../../hooks/useAuth'

function Navbar ({ handleLogout }) {

    const { user } = useAuth();
    const { signout } = useAuth();
    const navigate = useNavigate();
    
    //Instanciando as variaveis
    const [modalOpen, setModalOpen] = useState(false);

    const OpenModal = () => {
        setModalOpen(true);
    }

    const CloseModal = () => {
        setModalOpen(false);
    }

    const handleLogoutClick = async () =>{
        await handleLogout();
        signout(true);
        navigate("/")
    }


    return(
        <div>
            <nav>
                <div class="flex flex-wrap items-center justify-between h-20 px-20 shadow-md max-w-screen-2xl mx-auto mb-10">
                    <div>
                        <div className='flex gap-10 items-center'>
                            <div>
                                <Link to="/home"><img class="w-12 h-12 flex justify-start" src={logo} alt="" /></Link>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='font- text-sm text-zinc-600'>Empresa:</p>
                                <div className='bg-zinc-50 rounded-md py-2 px-3 shadow-sm hover:bg-zinc-100'>
                                    <p className='text-red-900 font-bold text-base'>MedWork</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='font- text-sm text-zinc-600'>Usuário:</p>
                                <div className='bg-zinc-50 rounded-md py-2 px-3 shadow-sm hover:bg-zinc-100'>
                                {user ? (
                                        <p className='text-red-900 font-bold text-base'>{user.nome_usuario}</p>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul class="text-white flex flex-wrap gap-5">
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/home">Home</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/cadastros">Cadastros</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/gestao">Gestão</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/inventario">Inventario de Risco</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/plano">Plano de Ação</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/laudos">Laudos</Link></li>
                            <Link to="/">
                                <button
                                    class="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 border shadow hover:shadow-md rounded"
                                >
                                    Login
                                </button>
                            </Link>
                            <div className='flex items-center hover:cursor-pointer px-2 rounded-md'>
                                {user ? (
                                    <BiLogIn 
                                        className='text-gray-700 scale-150'
                                        onClick={handleLogoutClick}
                                    />
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;