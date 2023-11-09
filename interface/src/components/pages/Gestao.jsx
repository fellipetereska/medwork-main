import { Link } from "react-router-dom";
import BotaoUsuario from "./subPages/buttons/BotaoUsuarios";

function Gestao () {
    return (
        <div>
             <div className="tab-content mt-32 mb-32">
                    <div>
                        <div>
                            <div className="flex justify-center w-full gap-10">
                                <Link to="/cadastro_usuario">
                                    <BotaoUsuario/>
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Gestao;