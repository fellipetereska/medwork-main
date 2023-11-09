import { Link } from 'react-router-dom'
import logo from '../media/logo_menu.png'
import ModalLogin from '../pages/subPages/ModalLogin';
import { useState } from 'react';

function Navbar () {
    
    //Instanciando as variaveis
    const [modalOpen, setModalOpen] = useState(false);

    const OpenModal = () => {
        setModalOpen(true);
    }

    const CloseModal = () => {
        setModalOpen(false);
    }


    return(
        <div>
            <nav>
                <div class="flex flex-wrap items-center justify-between h-20 px-20 shadow-md max-w-screen-2xl mx-auto">
                    <div>
                        <Link to="/"><img class="w-12 h-12 flex justify-start" src={logo} alt="" /></Link>
                    </div>
                    <div>
                        <ul class="text-white flex flex-wrap gap-5">
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/">Home</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/cadastros">Cadastros</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/gestao">Gestão</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/inventario">Inventario de Risco</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/plano">Plano de Ação</Link></li>
                            <li class="text-zinc-900 hover:text-red-500 py-2 text-sm font-semibold"><Link to="/laudos">Laudos</Link></li>
                            <Link to="/login">
                                <button
                                    class="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 border shadow hover:shadow-md rounded"
                                >
                                    Login
                                </button>
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>

            <ModalLogin isOpen={modalOpen} onCancel={CloseModal}/>
        </div>
    )
}

export default Navbar;