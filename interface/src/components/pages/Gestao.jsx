import { Link } from "react-router-dom";
import BotaoUsuario from "./subPages/buttons/Gestao/BotaoUsuarios";
import BotaoCadastroAparelho from "./subPages/buttons/Cadastros/BotaoCadastroAparelho";
import BotaoImportCsv from './subPages/buttons/Gestao/BotaoImportCsv'

function Gestao () {
    return (
        <div>
            <div className="mt-16 px-12">
                <div className="grid xl:grid-cols-5 md:grid-cols-3 gap-6 bg-white">
                    <figure className="flex flex-col justify-center">
                        <Link to="/cadastro_usuario">
                            <BotaoUsuario />
                        </Link>
                    </figure>
                    <figure className="flex flex-col justify-center">
                        <Link to="/cadastro_aparelhos">
                            <BotaoCadastroAparelho />
                        </Link>
                    </figure>
                    <figure className="flex flex-col justify-center">
                        <Link to="/importxlsx">
                            <BotaoImportCsv />
                        </Link>
                    </figure>
                </div>
                <div className="border-b border-gray-300 mt-8 mb-8"></div>
            </div>
        </div>
    )
}

export default Gestao;