import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import { FiMenu } from "react-icons/fi";
import { BiLogIn } from 'react-icons/bi'
import logo from '../media/logo_menu.png'
import { IoClose } from "react-icons/io5";

function Navbar() {

  //Instanciando as variaveis
  const { user, selectedCompany, handleClearLocalStorageCompany, getUsuarios, checkSignIn, clearUser, } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const empresa = selectedCompany[0]?.nome_empresa;
  const usuario = user ? user.nome_usuario : '';

  //Criando as Funções
  const handleLogoutClick = () => {
    try {
      clearUser();
      navigate("/")
      setIsMenuOpen(false)
    } catch (error) {
      console.log("Erro ao deslogar!", error)
    }
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const clearLocalSotrageCompany = () => {
    handleClearLocalStorageCompany();
    navigate("/home");
    window.location.reload();
  }

  useEffect(() => {
    getUsuarios();
    checkSignIn();
  }, []);

  const findTipo = (item) => {
    switch (item) {
      case 1:
        return "Adm"
      case 2:
        return "Técnico"
      default:
        return ""
    }
  }

  return (
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
        <div className='flex gap-8 items-center'>
          <Link to="/home"><img className="h-10 flex justify-start" src={logo} alt="" /></Link>
        </div>
        <div className="flex xl:order-1">
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
                    <p className='text-sky-700 font-bold text-base'>{usuario}</p>
                  </div>
                  <button onClick={handleLogoutClick}>
                    <IoClose />
                  </button>
                </div>
              ) : null}

              {/* Informa a empresa selecioanda */}
              {selectedCompany && empresa ? (
                <div className='flex items-center gap-2'>
                  <p className='font- text-sm text-zinc-600'>Empresa:</p>
                  <div className='bg-zinc-50 rounded-md py-2 px-3 hover:bg-zinc-100 truncate max-w-[200px]'>
                    <p className='text-sky-700 font-bold text-base'>{empresa}</p>
                  </div>
                  <button onClick={clearLocalSotrageCompany}>
                    <IoClose />
                  </button>
                </div>
              ) : null}
            </div>
            <div className='border-b border-gray-300 mt-2 mb-2'></div>

            <li onClick={handleMenuItemClick}
              className="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/home">Home</Link></li>
            <li onClick={handleMenuItemClick}
              className="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/cadastros">Cadastros</Link></li>
            <li onClick={handleMenuItemClick}
              className="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/gestao">Gestão</Link></li>
            <li onClick={handleMenuItemClick}
              className="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/inventario">Inventario de Risco</Link></li>
            <li onClick={handleMenuItemClick}
              className="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/plano">Plano de Ação</Link></li>
            <li onClick={handleMenuItemClick}
              className="block py-2 px-3 text-zinc-700 md:bg-transparent md:text-zinc-700 md:p-0 hover:rounded-md hover:text-sky-800"><Link to="/laudos">Laudos</Link></li>

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
                  className=" bg-sky-600 hover:bg-skky-700 text-white font-bold py-2 px-4 border shadow hover:shadow-md rounded"
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