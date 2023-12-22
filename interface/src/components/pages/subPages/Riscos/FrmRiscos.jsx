import React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import { supabase } from '../../../../services/api';

import icon_lupa from '../../../media/icon_lupa.svg'
import icon_sair from '../../../media/icon_sair.svg'

function CadastroRisco({ onEdit, setOnEdit, getRiscos }) {

  const ref = useRef(null);

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const {
        nome_risco,
        codigo_esocial_risco,
        meio_propagacao_risco,
        unidade_medida_risco,
        classificacao_risco,
        nivel_acao_risco,
        limite_tolerancia_risco,
        danos_saude_risco,
        metodologia_risco,
        severidade_risco,
        pgr_risco,
        ltcat_risco,
        lip_risco } = user

        nome_risco.value = onEdit.nome_risco || "";
        codigo_esocial_risco.value = onEdit.nome_risco || "";
        meio_propagacao_risco.value = onEdit.meio_propagacao_risco || "";
        unidade_medida_risco.value = onEdit.unidade_medida_risco || "";
        classificacao_risco.value = onEdit.classificacao_risco || "";
        nivel_acao_risco.value = onEdit.nivel_acao_risco || "";
        limite_tolerancia_risco.value = onEdit.limite_tolerancia_risco || "";
        danos_saude_risco.value = onEdit.danos_saude_risco || "";
        metodologia_risco.value = onEdit.metodologia_risco || "";
        severidade_risco.value = onEdit.severidade_risco || "";
        pgr_risco.value = onEdit.pgr_risco || "";
        ltcat_risco.value = onEdit.ltcat_risco || "";
        lip_risco.value = onEdit.lip_risco || "";
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    
  }



  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6 p-3">
          {/* Campos do Formulário */}
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
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Grupo de Risco
            </label>
            <select
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              name="fk_grupo_id"
            >
              <option value="null">Selecione um Grupo de Risco</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Código do E-social
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="codigo_esocial_risco"
              placeholder="Código E-social"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Meio de Propagação:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="meio_propagacao_risco"
              placeholder="Meio de Propagação"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Unidade de Medida:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="unidade_medida_risco"
              placeholder="Unidade de Medida"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Classificação
            </label>
            <select
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="classificacao_risco"
            >
              <option value="NULL">Selecione uma classificação</option>
              <option value="Qualitativo">Qualitativo</option>
              <option value="Quantitativo">Quantitativo</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Nível de Ação:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="nivel_acao_risco"
              placeholder="Nivel de Ação"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Limite de Tolerância:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="limite_tolerancia_risco"
              placeholder="Limite de Tolerância"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Danos a Saúde:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="dano_saude_risco"
              placeholder="Danos a Saúde"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Metodologia:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="metodologia_risco"
              placeholder="Metodologia"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-risco">
              Severidade
            </label>
            <select
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="severidade_risco"
              placeholder="Metodologia"
            >
              <option value="NULL">Selecione uma Severidade</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className="border-b bg-gray-200"></div>
        <h3 className="flex justify-center text-sky-700 text-2xl font-bold mt-4">Relatórios</h3>
        <div className="flex flex-col -mx-3 mb-6 p-3">
          <div class="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900">PGR</label>
          </div>
          <div class="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900">LTCAT</label>
          </div>
          <div class="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900">LIP</label>
          </div>
        </div>
        <div className="border-b bg-gray-200"></div>
        <h3 className="flex justify-center text-sky-700 text-2xl font-bold mt-4">Processos/EPI's</h3>
        <div className="flex -mx-3 mb-6 p-3">
          <div className="w-full md:w-1/2 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
              Processos:
            </label>
            <div className="flex items-center w-full">
              <button
                className="flex appearance-none w-full hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"

              >
                <p name="fk_contato_id" className="px-2 text-sm font-sm text-gray-600">
                  Processo:
                </p>
                <p className="font-bold">
                  Processo
                </p>
              </button>

              <button
                type="button"
                className={`flex cursor-pointer ml-4`}
              >
                <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
              EPI:
            </label>
            <div className="flex items-center w-full">
              <button
                className="flex appearance-none w-full hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"

              >
                <p name="fk_contato_id" className="px-2 text-sm font-sm text-gray-600">
                  EPI:
                </p>
                <p className="font-bold">
                  EPI
                </p>
              </button>

              <button
                type="button"
                className={`flex cursor-pointer ml-4`}
              >
                <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
              </button>
            </div>
          </div>
        </div>
      </form >
    </div >
  );
}

export default CadastroRisco;