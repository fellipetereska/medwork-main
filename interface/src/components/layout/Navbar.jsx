import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';


import { FiMenu } from "react-icons/fi";
import { BiLogIn } from 'react-icons/bi'
import logo from '../media/logo_menu.png'
import useAuth from '../../hooks/useAuth';

function Navbar({ handleLogout }) {

    //Instanciando as variaveis
    const { user, signed, empresa, signout, selectCompany } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    //Criando as Funções
    const handleLogoutClick = async () => {
        await handleLogout();
        signout(true);
        navigate("/")
        setIsMenuOpen(false)
    }

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen); //Abrir o menu móvel
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false); // Fechar o menu ao clicar em um item de menu
    };


    return (
        <nav class="bg-white border-gray-200 shadow-md">
            <div class="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
                <div className='flex gap-8 items-center'>
                    <Link to="/home"><img class="h-10 flex justify-start" src={logo} alt="" /></Link>
                </div>
                <div class="flex xl:order-1">
                    <div
                        type="button"
                        onClick={handleMenuClick}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-5xl text-sky-800 rounded-lg xl:hidden focus:outline-none focus:ring-2 focus:ring-gray-20">
                        <span className="sr-only">Abrir Menu</span>
                        <FiMenu />
                    </div>
                </div>
                <div className={`items-center justify-between py-2 w-full xl:flex xl:w-auto xl:order-1 ${isMenuOpen ? '' : 'hidden'}`}>
                    <ul className={`flex flex-col justify-center font-semibold p-4 border-gray-100 rounded-xl bg-gray-50 xl:p-0 xl:space-x-8 rtl:space-x-reverse xl:flex-row xl:mt-0 xl:border-0 xl:bg-white ${isMenuOpen ? '' : 'items-center'}`}>
                        <div className='flex gap-4'>
                            {/* Informa o Usuario Selecionado */}
                            {user ? (
                                <div className='flex items-center gap-2'>
                                    <p className='font- text-sm text-zinc-600'>Usuário:</p>
                                    <div className='bg-zinc-50 rounded-md py-2 px-3 hover:bg-zinc-100'>
                                        <p className='text-gray-600 font-bold text-base'>{user.nome_usuario}</p>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {/* Informa a empresa selecioanda */}
                            {empresa ? (
                                <div className='flex items-center gap-2'>
                                    <p className='font- text-sm text-zinc-600'>Empresa:</p>
                                    <div className='bg-zinc-50 rounded-md py-2 px-3 hover:bg-zinc-100'>
                                        <p className='text-gray-600 font-bold text-base'>{empresa.nome_empresa}</p>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className='border-b border-gray-300 mt-2 mb-2'></div>

                        <li onClick={handleMenuItemClick}
                            class="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/home">Home</Link></li>
                        <li onClick={handleMenuItemClick}
                            class="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/cadastros">Cadastros</Link></li>
                        <li onClick={handleMenuItemClick}
                            class="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/gestao">Gestão</Link></li>
                        <li onClick={handleMenuItemClick}
                            class="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/inventario">Inventario de Risco</Link></li>
                        <li onClick={handleMenuItemClick}
                            class="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/plano">Plano de Ação</Link></li>
                        <li onClick={handleMenuItemClick}
                            class="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/laudos">Laudos</Link></li>

                        <div className='border-b border-gray-300 mt-2 mb-2'></div>
                        {/* Renderiza o icon logout quando o usuario loga */}
                        {user ? (
                            <div className='hover:cursor-pointer py-2 rounded-md'>
                                <BiLogIn
                                    className='text-gray-700 scale-150'
                                    onClick={handleLogoutClick}
                                />
                            </div>
                        ) : (
                            // Renderiza o botão login quando o usuario da logout
                            <Link to="/">
                                <button
                                    class=" bg-sky-600 hover:bg-skky-700 text-white font-bold py-2 px-4 border shadow hover:shadow-md rounded"
                                >
                                    Login
                                </button>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
            
        </nav>
    )
}

export default Navbar;