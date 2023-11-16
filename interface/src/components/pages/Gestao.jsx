import { Link } from "react-router-dom";
import BotaoUsuario from "./subPages/buttons/BotaoUsuarios";

function Gestao () {
    return (
        <div>
            <div className="mt-16 px-12">
                <div class="grid xl:grid-cols-5 md:grid-cols-3 gap-6 bg-white">
                    <figure class="flex flex-col justify-center">
                        <Link to="/cadastro_usuario">
                            <BotaoUsuario />
                        </Link>
                    </figure>
                </div>
                <div className="border-b border-gray-300 mt-8 mb-8"></div>
            </div>
        </div>
    )
}

export default Gestao;