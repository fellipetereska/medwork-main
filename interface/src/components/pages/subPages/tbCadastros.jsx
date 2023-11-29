import React from "react";
import { Link } from 'react-router-dom'

import BotaoEmpresa from "./buttons/BotaoEmpresa";
import BotaoUnidade from "./buttons/BotaoUnidade";
import BotaoSetor from "./buttons/BotaoSetor";
import BotaoCargo from "./buttons/BotaoCargo";
import BotaoContato from "./buttons/BotaoContato";


function TabCadastroEmpresa() {
    return (
        <>
            <div className="mt-16 px-12">
                <div className="grid xl:grid-cols-5 md:grid-cols-3 gap-6 bg-white">
                    <figure className="flex flex-col justify-center">
                        <Link to="/cadastro_empresa">
                            <BotaoEmpresa />
                        </Link>
                    </figure>
                    <figure className="flex flex-col justify-center">
                        <Link to="/cadastro_unidade">
                            <BotaoUnidade />
                        </Link>
                    </figure>
                    <figure className="flex flex-col justify-center">
                        <Link to="/cadastro_setor">
                            <BotaoSetor />
                        </Link>
                    </figure>
                    <figure className="flex flex-col justify-center">
                        <Link to="/cadastro_cargo">
                            <BotaoCargo />
                        </Link>
                    </figure>
                    <figure className="flex flex-col justify-center">
                        <Link to="/cadastro_contato">
                            <BotaoContato />
                        </Link>
                    </figure>
                </div>
                <div className="border-b border-gray-300 mt-8 mb-8"></div>
            </div>
        </>
    )
}

export default TabCadastroEmpresa;
