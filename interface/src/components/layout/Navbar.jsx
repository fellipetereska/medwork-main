import { Link } from 'react-router-dom'
import logo from '../media/logo_menu.png'

function Navbar () {
    return(
        <nav>
            <div class="flex flex-wrap items-center justify-between h-20 px-20 shadow-md max-w-screen-2xl mx-auto">
                <div>
                    <Link to="/"><img class="w-12 h-12 flex justify-start" src={logo} alt="" /></Link>
                </div>
                <div>
                    <ul class="text-white flex space-x-4 flex-wrap">
                        <li class="text-zinc-900 hover:text-red-500 rounded-md px-5 py-2 text-sm font-semibold"><Link to="/">Home</Link></li>
                        <li class="text-zinc-900 hover:text-red-500 rounded-md px-5 py-2 text-sm font-semibold"><Link to="/cadastros">Cadastros</Link></li>
                        <li class="text-zinc-900 hover:text-red-500 rounded-md px-5 py-2 text-sm font-semibold"><Link to="/gestao">Gestão</Link></li>
                        <li class="text-zinc-900 hover:text-red-500 rounded-md px-5 py-2 text-sm font-semibold"><Link to="/inventario">Inventario de Risco</Link></li>
                        <li class="text-zinc-900 hover:text-red-500 rounded-md px-5 py-2 text-sm font-semibold"><Link to="/plano">Plano de Ação</Link></li>
                        <li class="text-zinc-900 hover:text-red-500 rounded-md px-5 py-2 text-sm font-semibold"><Link to="/laudos">Laudos</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;