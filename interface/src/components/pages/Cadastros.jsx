import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

import BotaoEmpresa from "./subPages/buttons/Cadastros/BotaoEmpresa";
import BotaoUnidade from "./subPages/buttons/Cadastros/BotaoUnidade";
import BotaoSetor from "./subPages/buttons/Cadastros/BotaoSetor";
import BotaoCargo from "./subPages/buttons/Cadastros/BotaoCargo";
import BotaoContato from "./subPages/buttons/Cadastros/BotaoContato";
import BotaoProcessos from './subPages/buttons/Cadastros/BotaoProcessos';
import BotaoRiscos from './subPages/buttons/Cadastros/BotaoRiscos';
import BotaoMedidasDeProtecao from "./subPages/buttons/Cadastros/BotaoMedidasDeProtecao";
import BotaoVinculos from "./subPages/buttons/Cadastros/BotaoVinculos";

import { IoInformationCircleSharp } from "react-icons/io5";

function Cadastros() {

  const { loadSelectedCompanyFromLocalStorage, companyId } = useAuth(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadSelectedCompanyFromLocalStorage();
  }, []);

  return (
    <>

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="flex justify-end w-11/12">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página de Cadastros</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A tela de cadastro do nosso sistema segue a mesma abordagem intuitiva e eficiente, proporcionando uma experiência direta aos usuários. Ao acessar essa funcionalidade, os usuários encontrarão duas linhas distintas de botões, cada um representando uma categoria específica. Caso o usuário não tenha selecionado nenhuma empresa, alguns botões ficam insdisponivel.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Na primeira linha, destacamos botões grandes e visualmente atraentes para os cadastros relacionados a contatos, empresas, unidades, setores e cargos. Cada botão é adornado por um ícone representativo, tornando a identificação rápida e fácil. Essa abordagem simplificada permite que os usuários acessem de maneira direta as funcionalidades desejadas sem a necessidade de preenchimento de formulários.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Na segunda linha de botões, apresentamos as opções de cadastros de processos, riscos, medidas e vínculos. Novamente, a disposição clara dos botões com ícones distintos torna a navegação intuitiva, proporcionando aos usuários a capacidade de realizar suas tarefas de maneira eficaz.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Ao manter a consistência visual com a tela inicial, onde a agilidade é priorizada, a tela de cadastro foi projetada para ser acessível e amigável, garantindo que os usuários possam navegar entre diferentes funcionalidades com facilidade e eficiência.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botões Relacionados a Empresa*/}
      <div className="mt-16 px-12 mb-12">
        <div className="grid xl:grid-cols-5 md:grid-cols-3 gap-6 bg-white">
          <figure className="flex flex-col justify-center">
            <Link to="/cadastro_contato">
              <BotaoContato />
            </Link>
          </figure>
          {companyId ? (null) : (
            <figure className="flex flex-col justify-center">
              <Link to="/cadastro_empresa">
                <BotaoEmpresa />
              </Link>
            </figure>
          )}
          {companyId ? (
            <>
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
            </>
          ) : null}
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200 mt-8 mb-8"></div>

        {/* Botões Realcionados aos Processos */}
        <div className="grid xl:grid-cols-5 md:grid-cols-3 gap-6 bg-white">
          <figure className="flex flex-col justify-center">
            <Link to="/cadastro_processo">
              <BotaoProcessos />
            </Link>
          </figure>
          <figure className="flex flex-col justify-center">
            <Link to="/cadastro_risco">
              <BotaoRiscos />
            </Link>
          </figure>
          <figure className="flex flex-col justify-center">
            <Link to="/cadastro_medida">
              <BotaoMedidasDeProtecao />
            </Link>
          </figure>
          {companyId ? (
            <>
              <figure className="flex flex-col justify-center">
                <Link to="/vinculos">
                  <BotaoVinculos />
                </Link>
              </figure>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Cadastros;