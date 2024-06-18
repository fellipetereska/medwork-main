import { Link } from "react-router-dom";
import BotaoUsuario from "./subPages/buttons/Gestao/BotaoUsuarios";
import BotaoCadastroAparelho from "./subPages/buttons/Cadastros/BotaoCadastroAparelho";
import BotaoImportCsv from './subPages/buttons/Gestao/BotaoImportCsv'
import { useState } from "react";

import { IoInformationCircleSharp } from "react-icons/io5";

function Gestao() {

    const [visible, setVisible] = useState(false);

    return (
        <div>
            {/* Popover */}
            <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
                <div className="flex justify-end w-11/12">
                    <div onMouseEnter={() => setVisible(true)}>
                        <IoInformationCircleSharp className='text-sky-700' />
                    </div>
                </div>
                <div className="fixed z-50 m-2 -mt-4">
                    <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
                        <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página de Gestão</h2>
                        <div>
                            <p className="mb-2 text-justify font-light text-gray-300 flex">
                                A tela de gestão do nosso sistema segue a mesma abordagem intuitiva e eficiente, proporcionando uma experiência direta aos usuários. Ao acessar essa funcionalidade, os usuários encontrarão botões para acessarem as telas para gerir o sistema.
                            </p>
                            <p className="mb-2 text-justify font-light text-gray-300 flex">
                               O primeiro botão o usuário encontrara o cadastro de usuários, no segundo botao o cadastro de aparelhos e no terceiro uma tela para importação de dados via xlsx.
                            </p>
                            <p className="mb-2 text-justify font-light text-gray-300 flex">
                                Ao manter a consistência visual com a tela decadastros, a tela de gestão permite uma maior agilidade e facilidade para utilização das funcionalidades exibidas. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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