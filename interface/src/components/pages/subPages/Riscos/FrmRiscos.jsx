import React from "react";
import { useRef, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { connect } from '../../../../services/api';

import { BiSolidMessageAdd } from "react-icons/bi";
import { IoIosHelpCircle } from "react-icons/io";

import ModalConclusao from "../components/Modal/ModalConclusao";


function CadastroRisco({ onEdit, setOnEdit, getRiscos, riscos }) {

  const [riscoId, setRiscoId] = useState(false);
  const [pgr, setPgr] = useState(false);
  const [ltcat, setLtcat] = useState(false);
  const [ltcatSave, setLtcatSave] = useState(false);
  const [lip, setLip] = useState(false);
  const [lipSave, setLipSave] = useState(false);
  const [classificacao, setClassificacao] = useState(false);
  const [avaliacao, setAvaliacao] = useState("0");
  const [esocial, setEsocial] = useState('');
  const [inespecific, setInespecific] = useState(false);

  const [showModalLtcat, setShowModalLtcat] = useState(false);

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

      setRiscoId(onEdit.id_risco);
      nome_risco.value = onEdit.nome_risco;
      setAvaliacao(onEdit.grupo_risco);
      if (onEdit.grupo_risco === 'Inespecífico') {
        handleInsespecificGroup();
        return;
      }
      setEsocial(onEdit.codigo_esocial_risco);
      meio_propagacao_risco.value = onEdit.meio_propagacao_risco;
      unidade_medida_risco.value = onEdit.unidade_medida_risco;
      classificacao_risco.value = onEdit.classificacao_risco;
      setClassificacaoChange(onEdit.classificacao_risco);
      nivel_acao_risco.value = onEdit.nivel_acao_risco;
      limite_tolerancia_risco.value = onEdit.limite_tolerancia_risco;
      danos_saude_risco.value = onEdit.danos_saude_risco;
      metodologia_risco.value = onEdit.metodologia_risco;
      severidade_risco.value = onEdit.severidade_risco;

      if (onEdit.pgr_risco === 1) {
        setPgr(true);
      } else {
        setPgr(false);
      }
      if (onEdit.ltcat_risco === 1) {
        setLtcatSave(true);
        setLtcat(true);
      } else {
        setLtcatSave(false);
        setLtcat(false);
      }
      if (onEdit.lip_risco === 1) {
        setLipSave(true);
        setLip(true)
      } else {
        setLipSave(false);
        setLip(false);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.nome_risco.value ||
      !user.grupo_risco.value ||
      !user.danos_saude_risco.value ||
      !user.severidade_risco.value ||
      !user.classificacao_risco.value ||
      !user.meio_propagacao_risco.value ||
      !user.nivel_acao_risco.value ||
      !user.limite_tolerancia_risco.value ||
      !user.metodologia_risco.value) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      const riscoData = {
        nome_risco: user.nome_risco.value,
        grupo_risco: avaliacao,
        codigo_esocial_risco: user.codigo_esocial_risco.value || "N/A",
        meio_propagacao_risco: user.meio_propagacao_risco.value,
        unidade_medida_risco: user.unidade_medida_risco.value,
        classificacao_risco: user.classificacao_risco.value,
        nivel_acao_risco: user.nivel_acao_risco.value,
        limite_tolerancia_risco: user.limite_tolerancia_risco.value,
        danos_saude_risco: user.danos_saude_risco.value,
        metodologia_risco: user.metodologia_risco.value,
        severidade_risco: user.severidade_risco.value,
        pgr_risco: pgr,
        ltcat_risco: ltcat,
        lip_risco: lip,
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
      setRiscoId(responseData.id);
      setLtcatSave(ltcat);
      setLipSave(lip);
      console.log(riscoId)
      console.log(ltcatSave)
      console.log(lipSave)

      toast.success(responseData.message);
    } catch (error) {
      console.log("Erro ao inserir risco: ", error)
    }

    handleClear();

    window.scrollTo({ top: 500, behavior: 'smooth' });

    getRiscos();
  };

  const handleClear = () => {

    const user = ref.current;

    user.nome_risco.value = "";
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

    setPgr(false);
    setLtcat(false);
    setLip(false);
    setLtcatSave(false);
    setLipSave(false);
    setOnEdit(null);
    setEsocial('');
    setRiscoId(false);
    setInespecific(false);
  };

  const checkedPgr = () => {
    setPgr(!pgr);
  };

  const checkedLtcat = () => {
    setLtcat(!ltcat);
    if (onEdit) {
      setLtcatSave(!ltcatSave);
    }
  };

  const checkedLip = () => {
    setLip(!lip);
    if (onEdit) {
      setLipSave(!lipSave);
    }
  };

  const setClassificacaoChange = (event) => {
    const user = ref.current;
    const data = event;
    setPgr(true);

    if (data === "Qualitativo") {
      user.meio_propagacao_risco.value = "Risco Qualitativo";
      user.unidade_medida_risco.value = '';
      user.nivel_acao_risco.value = '0';
      user.limite_tolerancia_risco.value = '0';
      user.metodologia_risco.value = 'Risco Qualitativo';
      setClassificacao(true);
    } else {
      user.meio_propagacao_risco.value = "";
      user.unidade_medida_risco.value = '';
      user.nivel_acao_risco.value = '';
      user.limite_tolerancia_risco.value = '';
      user.metodologia_risco.value = '';
      setClassificacao(false);
    }
  };

  const handleGrupoChange = (e) => {
    const user = ref.current;
    const inputValue = e.target.value;
    const nome = user.nome_risco.value;
    setAvaliacao(inputValue);

    if (inputValue === 'Inespecífico') {
      handleInsespecificGroup();
    } else {
      handleClear();
      user.nome_risco.value = nome;
      setAvaliacao(inputValue);
    }
  };

  const handleInsespecificGroup = (item) => {
    const user = ref.current;
    setInespecific(true);
    user.danos_saude_risco.value = "Risco Inespecífico"
    user.severidade_risco.value = 0;
    setClassificacao("0");
    user.meio_propagacao_risco.value = "Risco Inespecífico";
    user.unidade_medida_risco.value = '';
    user.nivel_acao_risco.value = 0;
    user.limite_tolerancia_risco.value = 0;
    user.metodologia_risco.value = 'Risco Inespecífico';
    setEsocial("09.01.001");
    user.nome_risco.value = "Risco Inespecífico"
    setPgr(false);
    setLtcat(false);
    setLip(false);
  }

  // Modal
  const openModaLtcat = () => setShowModalLtcat(true);
  const closeModalLtcat = () => setShowModalLtcat(false);

  //Funções para formatação do E-social
  const handleFormatEsocial = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{3})/, '$1.$2.$3');
  };

  const handlePastEsocial = async (event) => {
    await handleEsocialChange(event);
  };

  const handleEsocialChange = async (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 7);
    const formated = handleFormatEsocial(truncatedValue);
    setEsocial(formated);
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        {/* Cadastro do Risco */}
        <div className="flex flex-wrap -mx-3 p-3">
          {/* Campos do Formulário */}

          {/* Nome Risco */}
          <div className={`w-full md:w-1/3 px-3 ${inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="grid-risco">
              Nome do Risco:
            </label>
            <input
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white ${inespecific ? 'cursor-not-allowed' : ''}`}
              type="text"
              name="nome_risco"
              placeholder="Nome do Risco"
              disabled={inespecific}
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
              onChange={handleGrupoChange}
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
          <div className={`w-full md:w-1/3 px-3 ${inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className={`flex gap-2 ${inespecific ? 'cursor-not-allowed' : ''}`}>
              <div className={`h-full ${inespecific ? 'cursor-not-allowed' : ''}`}>
                <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="esocial">
                  E-social:
                </label>
              </div>
              <div className={`flex items-center text-sm pt-1`}>
                <a href="https://www.gov.br/esocial/pt-br/documentacao-tecnica/manuais/leiautes-esocial-v-1-1-beta/tabelas.html#24" target="_blank">
                  <button type="button"><IoIosHelpCircle className='text-sky-700' /></button>
                </a>
              </div>
            </div>
            <input
              id="esocial"
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white ${inespecific ? 'cursor-not-allowed' : ''}`}
              type="text"
              disabled={inespecific}
              name="codigo_esocial_risco"
              placeholder="Código E-social"
              onChange={handleEsocialChange}
              onPaste={handlePastEsocial}
              value={esocial}
              max={10}
            />
          </div>

          {/* Danos a Saúde */}
          <div className={`w-full md:w-1/3 px-3 ${inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="grid-risco">
              Danos a Saúde:
            </label>
            <input
              className={`${inespecific ? 'cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="text"
              name="danos_saude_risco"
              placeholder="Danos a Saúde"
              disabled={inespecific}
            />
          </div>

          {/* Severidade */}
          <div className={`w-full md:w-1/3 px-3 ${inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="grid-risco">
              Severidade
            </label>
            <select
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white ${inespecific ? 'cursor-not-allowed' : ''}`}
              type="text"
              name="severidade_risco"
              placeholder="Metodologia"
              disabled={inespecific}
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
          <div className={`w-full md:w-1/3 px-3 ${inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="grid-risco">
              Classificação
            </label>
            <select
              className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white ${inespecific ? 'cursor-not-allowed' : ''}`}
              type="text"
              name="classificacao_risco"
              onChange={(e) => setClassificacaoChange(e.target.value)}
              disabled={inespecific}
            >
              <option value="0">Selecione uma classificação</option>
              <option value="Qualitativo">Qualitativo</option>
              <option value="Quantitativo">Quantitativo</option>
            </select>
          </div>

          {/* Meio de Propagação */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao || inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco ${classificacao || inespecific ? 'cursor-not-allowed' : ''}`}>
              Meio de Propagação:
            </label>
            <input
              className={`${classificacao || inespecific ? 'cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="text"
              name="meio_propagacao_risco"
              placeholder="Meio de Propagação"
              disabled={classificacao || inespecific}
            />
          </div>

          {/* Unidade de Medida */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao || inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${classificacao || inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="grid-risco">
              Unidade de Medida:
            </label>
            <input
              className={`${classificacao || inespecific ? 'cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="text"
              name="unidade_medida_risco"
              placeholder="Unidade de Medida"
              disabled={classificacao || inespecific}
            />
          </div>

          {/* Nivel de Ação */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao || inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${classificacao || inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="grid-risco">
              Nível de Ação:
            </label>
            <input
              className={`${classificacao || inespecific ? 'cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="number"
              name="nivel_acao_risco"
              placeholder="Nivel de Ação"
              disabled={classificacao || inespecific}
              step="any"
            />
          </div>

          {/* Limite de Tolerància */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao || inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${classificacao || inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="grid-risco">
              Limite de Tolerância:
            </label>
            <input
              className={`${classificacao || inespecific ? 'cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="number"
              name="limite_tolerancia_risco"
              placeholder="Limite de Tolerância"
              disabled={classificacao || inespecific}
              step="any"
            />
          </div>

          {/* Metodologia */}
          <div className={`w-full md:w-1/3 px-3 ${classificacao || inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${classificacao || inespecific ? 'cursor-not-allowed' : ''}`} htmlFor="grid-risco">
              Metodologia:
            </label>
            <input
              className={`${classificacao || inespecific ? 'cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
              type="text"
              name="metodologia_risco"
              placeholder="Metodologia"
              disabled={classificacao || inespecific}
            />
          </div>

          {/* Laudo */}
          <div className={`w-full md:w-1/3 px-3 ${inespecific ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${inespecific ? 'cursor-not-allowed' : ''}`}>
              Laudo:
            </label>
            <div className="bg-gray-100 mt-1 h-11 rounded p-2">
              <div className="grid grid-cols-3 h-full rounded">

                {/* PGR */}
                <div htmlFor="cbxPgr" className={`${inespecific ? 'cursor-not-allowed' : ''} flex justify-center items-center gap-2 hover:bg-gray-50 rounded hover:shadow ${inespecific ? 'cursor-not-allowed' : ''}`}>
                  <input
                    type="checkbox"
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ${inespecific ? 'cursor-not-allowed' : ''}`}
                    checked={pgr}
                    onChange={checkedPgr}
                    disabled={inespecific}
                    id="cbxPgr"
                  />
                  <label
                    htmlFor="cbxPgr"
                    className={`font-medium text-gray-700 text-sm ${inespecific ? 'cursor-not-allowed' : ''}`}
                  >
                    PGR
                  </label>
                </div>

                {/* LTCAT */}
                <div htmlFor="cbxLtcat" className={`${inespecific ? 'cursor-not-allowed' : ''} flex justify-center items-center gap-2 hover:bg-gray-50 rounded hover:shadow ${inespecific ? 'cursor-not-allowed' : ''}`}>
                  <input
                    type="checkbox"
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ${inespecific ? 'cursor-not-allowed' : ''}`}
                    checked={ltcat}
                    onChange={checkedLtcat}
                    disabled={inespecific}
                    id="cbxLtcat"
                  />
                  <label
                    htmlFor="cbxLtcat"
                    className={`font-medium text-gray-700 text-sm ${inespecific ? 'cursor-not-allowed' : ''}`}
                  >
                    LTCAT
                  </label>
                </div>

                {/* LIP */}
                <div htmlFor="cbxLip" className={`${inespecific ? 'cursor-not-allowed' : ''} flex justify-center items-center gap-2 hover:bg-gray-50 rounded hover:shadow ${inespecific ? 'cursor-not-allowed' : ''}`}>
                  <input
                    type="checkbox"
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ${inespecific ? 'cursor-not-allowed' : ''}`}
                    checked={lip}
                    onChange={checkedLip}
                    disabled={inespecific}
                    id="cbxLip"
                  />
                  <label
                    htmlFor="cbxLip"
                    className={`font-medium text-gray-700 text-sm ${inespecific ? 'cursor-not-allowed' : ''}`}
                  >
                    LIP
                  </label>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="w-full flex justify-end mb-6 gap-3">
          <div>
            <button onClick={handleClear} className="shadow mt-4 bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-5 rounded" type="button">
              Limpar
            </button>
          </div>
          <div className="">
            <button className="shadow mt-4 bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
              Cadastrar
            </button>
          </div>
        </div>

        {/* Conclusões */}
        {
          (riscoId) && (
            <>
              <div className="mb-6 mx-3">
                <h3 className="flex justify-center text-sky-700 text-2xl font-bold mt-4 mb-1">Conclusões</h3>
                <div className="border-b bg-sky-200 mb-2"></div>
                <div className="px-4 py-2">
                  <div className={`flex w-full justify-start`}>

                    {(ltcatSave || lipSave) && (
                      <>
                        <div
                          className={`flex w-1/3 justify-center items-center px-4 py-2 bg-gray-50 rounded shadow hover:bg-gray-100 cursor-pointer gap-4`}
                          onClick={openModaLtcat}
                        >
                          <div className="flex justify-center items-center text-3xl text-sky-700 hover:text-sky-800">
                            <BiSolidMessageAdd />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h1 className="text-lg font-bold text-sky-700">Cadastrar Conclusão</h1>
                            <p className="text-sm text-gray-600 font-light -mt-1">Abrir cadastro de conclusões</p>
                          </div>
                        </div>


                      </>
                    )}

                  </div>
                </div>
              </div>
            </>
          )
        }
      </form >
      <ModalConclusao
        isOpen={showModalLtcat}
        onCancel={closeModalLtcat}
        riscoId={riscoId}
        ltcat={ltcatSave}
        lip={lipSave}
        riscos={riscos}
      />
    </div >
  );
}

export default CadastroRisco;