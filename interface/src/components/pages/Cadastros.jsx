import { Link } from "react-router-dom";

import BotaoEmpresa from "./subPages/buttons/Cadastros/BotaoEmpresa";
import BotaoUnidade from "./subPages/buttons/Cadastros/BotaoUnidade";
import BotaoSetor from "./subPages/buttons/Cadastros/BotaoSetor";
import BotaoCargo from "./subPages/buttons/Cadastros/BotaoCargo";
import BotaoContato from "./subPages/buttons/Cadastros/BotaoContato";
import BotaoProcessos from './subPages/buttons/Cadastros/BotaoProcessos';
import BotaoRiscos from './subPages/buttons/Cadastros/BotaoRiscos';
import BotaoCadastroEpi from "./subPages/buttons/Cadastros/CadastroEpi";
import BotaoMedidasDeProtecao from "./subPages/buttons/Cadastros/BotaoMedidasDeProtecao";

function Cadastros() {

  return (
    <>
      <div className="mt-16 px-12 mb-12">
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
        <div className="border-b border-gray-200 mt-8 mb-8"></div>
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
          <figure className="flex flex-col justify-center">
            <Link to="/cadastro_epi">
              <BotaoCadastroEpi />
            </Link>
          </figure>
        </div>
      </div>
    </>
  )
}

export default Cadastros;