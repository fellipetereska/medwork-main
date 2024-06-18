import React from "react";
import { useRef, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { connect } from '../../../../services/api';


function CadastroRisco({ onEdit, setOnEdit, getRiscos }) {

  // const [pgr, setPgr] = useState(false);
  // const [ltcat, setLtcat] = useState(false);
  // const [lip, setLip] = useState(false);
  const [classificacao, setClassificacao] = useState(false);
  const [avaliacao, setAvaliacao] = useState("0");

  const ref = useRef(null);

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const {
        nome_risco,
        avaliacao,
        codigo_esocial_risco,
        meio_propagacao_risco,
        unidade_medida_risco,
        classificacao_risco,
        nivel_acao_risco,
        limite_tolerancia_risco,
        danos_saude_risco,
        metodologia_risco,
        severidade_risco,
      } = user;

      nome_risco.value = onEdit.nome_risco || "";
      setAvaliacao(onEdit.grupo_risco || "0");
      codigo_esocial_risco.value = onEdit.codigo_esocial_risco || "";
      meio_propagacao_risco.value = onEdit.meio_propagacao_risco || "";
      unidade_medida_risco.value = onEdit.unidade_medida_risco || "";
      classificacao_risco.value = onEdit.classificacao_risco || "0";
      nivel_acao_risco.value = onEdit.nivel_acao_risco || "";
      limite_tolerancia_risco.value = onEdit.limite_tolerancia_risco || "";
      danos_saude_risco.value = onEdit.danos_saude_risco || "";
      metodologia_risco.value = onEdit.metodologia_risco || "";
      severidade_risco.value = onEdit.severidade_risco || "0";
      // setPgr(onEdit.pgr_risco || false)
      // setLtcat(onEdit.ltcat_risco || false)
      // setLip(onEdit.lip_risco || false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.nome_risco.value ||
      !user.danos_saude_risco ||
      !user.severidade_risco ||
      !user.grupo_risco ||
      !user.classificacao_risco) {
      toast.warn("Preencha todos os campos!");
    }
    try {
      const riscoData = {
        nome_risco: user.nome_risco.value || "N/A",
        grupo_risco: avaliacao || "N/A",
        codigo_esocial_risco: user.codigo_esocial_risco.value || "N/A",
        meio_propagacao_risco: user.meio_propagacao_risco.value || "Risco Qualitativo",
        unidade_medida_risco: user.unidade_medida_risco.value || "",
        classificacao_risco: user.classificacao_risco.value || "0",
        nivel_acao_risco: user.nivel_acao_risco.value || "0",
        limite_tolerancia_risco: user.limite_tolerancia_risco.value || "0",
        danos_saude_risco: user.danos_saude_risco.value || "N/A",
        metodologia_risco: user.metodologia_risco.value || "Risco Qualitativo",
        severidade_risco: user.severidade_risco.value || "0",
        // pgr_risco: pgr,
        // ltcat_risco: ltcat,
        // lip_risco: lip,
      };

      const url = onEdit
        ? `${connect}/riscos/${onEdit.id_risco}`
        : `${connect}/riscos`

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(riscoData),
      });

      if (!response.ok) {
        toast.error("Erro ao cadastrar/editar risco!")
        throw new Error(`Erro ao cadastrar/editar risco. Status: ${response.status}`)
      }

      const responseData = await response.json();

      toast.success(responseData);
    } catch (error) {
      console.log("Erro ao inserir risco: ", error)
    }

    user.nome_risco.value = "";
    user.codigo_esocial_risco.value = "";
    user.meio_propagacao_risco.value = "";
    user.unidade_medida_risco.value = "";
    user.nivel_acao_risco.value = "";
    user.limite_tolerancia_risco.value = "";
    user.danos_saude_risco.value = "";
    user.metodologia_risco.value = "";
    user.severidade_risco.value = "0";
    setAvaliacao("0");

    // setPgr(false);
    // setLtcat(false);
    // setLip(false);
    setOnEdit(null);
    setClassificacao('')

    getRiscos();
  }

  const handleClear = () => {

    const user = ref.current;

    user.nome_risco.value = "";
    user.codigo_esocial_risco.value = "";
    user.meio_propagacao_risco.value = "";
    user.unidade_medida_risco.value = "";
    user.classificacao_risco.value = '0';
    setClassificacao(false);
    user.nivel_acao_risco.value = "";
    user.limite_tolerancia_risco.value = "";
    user.danos_saude_risco.value = "";
    user.metodologia_risco.value = "";
    user.severidade_risco.value = "0";
    setAvaliacao("0");

    // setPgr(false);
    // setLtcat(false);
    // setLip(false);
    setOnEdit(null);
  }

  // const checkedPgr = () => {
  //   setPgr(!pgr);
  // }

  // const checkedLtcat = () => {
  //   setLtcat(!ltcat);
  // }

  // const checkedLip = () => {
  //   setLip(!lip);
  // }

  const setClassificacaoChange = (event) => {
    const user = ref.current;
    const data = event.target.value;

    if (data !== "Quantitativo") {
      user.meio_propagacao_risco.value = "Risco Qualitativo";
      user.unidade_medida_risco.value = 'Risco Qualitativo';
      user.nivel_acao_risco.value = '0';
      user.limite_tolerancia_risco.value = '0';
      user.metodologia_risco.value = 'Risco Qualitativo';
      setClassificacao(true);
    } else {
      setClassificacao(false);
    }
  }

  const handleFormatCodigo = () => {
    // Codgio E-social
  }


  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6 p-3">
          {/* Campos do Formulário */}

          {/* Nome Risco */}
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Nome do Risco:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="nome_risco"
              placeholder="Nome do Risco"
            />
          </div>

          {/* Grupo Risco */}
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Grupo de Risco
            </label>
            <select
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              name="grupo_risco"
              value={avaliacao}
              onChange={(e) => setAvaliacao(e.target.value)}
            >
              <option value="0">Selecione um Grupo de Risco</option>
              <option value="Fisico">Físico</option>
              <option value="Químico">Químico</option>
              <option value="Biológico">Biológico</option>
              <option value="Ergonômico">Ergonômico</option>
              <option value="Acidentes">Acidentes</option>
              <option value="Inespecífico">Inespecífico</option>
            </select>
          </div>

          {/* Código E-social */}
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Código do E-social
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="codigo_esocial_risco"
              placeholder="Código E-social"
              onChange={handleFormatCodigo}
            />
          </div>

          {/* Danos a Saúde */}
          <div className={`w-full md:w-1/3 px-3`}>
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Danos a Saúde:
            </label>
            <input
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="text"
              name="danos_saude_risco"
              placeholder="Danos a Saúde"
            />
          </div>

          {/* Severidade */}
          <div className={`w-full md:w-1/3 px-3`}>
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Severidade
            </label>
            <select
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="severidade_risco"
              placeholder="Metodologia"
            >
              <option value="0">Selecione uma Severidade</option>
              <option value="1">Muito Baixa</option>
              <option value="2">Baixa</option>
              <option value="3">Média</option>
              <option value="4">Alta</option>
              <option value="5">Muito Alta</option>
            </select>
          </div>

          {/* Classificação */}
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Classificação
            </label>
            <select
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="classificacao_risco"
              onChange={setClassificacaoChange}
            >
              <option value="0">Selecione uma classificação</option>
              <option value="Qualitativo">Qualitativo</option>
              <option value="Quantitativo">Quantitativo</option>
            </select>
          </div>

          {/* Meio de Propagação */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao ? 'opacity-50' : ''}`}>
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Meio de Propagação:
            </label>
            <input
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="text"
              name="meio_propagacao_risco"
              placeholder="Meio de Propagação"
              disabled={classificacao}
            />
          </div>

          {/* Unidade de Medida */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao ? 'opacity-50' : ''}`}>
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Unidade de Medida:
            </label>
            <input
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="text"
              name="unidade_medida_risco"
              placeholder="Unidade de Medida"
              disabled={classificacao}
            />
          </div>

          {/* Nivel de Ação */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao ? 'opacity-50' : ''}`}>
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Nível de Ação:
            </label>
            <input
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="number"
              name="nivel_acao_risco"
              placeholder="Nivel de Ação"
              disabled={classificacao}
              step="any"
            />
          </div>

          {/* Limite de Tolerància */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao ? 'opacity-50' : ''}`}>
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Limite de Tolerância:
            </label>
            <input
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="number"
              name="limite_tolerancia_risco"
              placeholder="Limite de Tolerância"
              disabled={classificacao}
              step="any"
            />
          </div>

          {/* Metodologia */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao ? 'opacity-50' : ''}`}>
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Metodologia:
            </label>
            <input
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="text"
              name="metodologia_risco"
              placeholder="Metodologia"
              disabled={classificacao}
            />
          </div>
        </div>

        {/* Relatórios */}
        {/* <div className="border-b bg-gray-200"></div>
        <h3 className="flex justify-center text-sky-700 text-2xl font-bold mt-4">Relatórios</h3>
        <div className="flex flex-col -mx-3 mb-6 p-3">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              checked={pgr}
              onChange={checkedPgr}
            />
            <label className="text-sm font-medium ms-2 text-gray-900">PGR <span className="font-light">(Porgrama de Gerenciamento de Riscos)</span></label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              checked={ltcat}
              onChange={checkedLtcat}
            />
            <label className="text-sm font-medium ms-2 text-gray-900">LTCAT <span className="font-light">(Laudo Técnico das Condições do Ambiente de Trabalho)</span></label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              checked={lip}
              onChange={checkedLip}
            />
            <label className="text-sm font-medium ms-2 text-gray-900">LIP <span className="font-light">(Laudo de Insalubridade e Periculosidade)</span></label>
          </div>
        </div> */}

        <div className="w-full px-3 pl-8 flex justify-end mb-6">
          <div>
            <button onClick={handleClear} className="shadow mt-4 bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Limpar
            </button>
          </div>
          <div className="px-3 pl-8">
            <button className="shadow mt-4 bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
              Cadastrar
            </button>
          </div>
        </div>
      </form >
    </div >
  );
}

export default CadastroRisco;