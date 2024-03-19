import React, { useEffect, useState } from 'react';

import { MdCleaningServices } from "react-icons/md";
import { BiSolidMessageAdd } from "react-icons/bi";
import { toast } from 'react-toastify';
import { connect } from '../../../../../services/api';
import useAuth from '../../../../../hooks/useAuth'

import GridModalConclusao from '../gridsModal/GridModalConclusao';

const ModalConclusaoLtcat = ({ onCancel, isOpen, riscoId, riscos, lip, ltcat, inventario, onSelect }) => {

  const { getConclusoes, conclusoes } = useAuth(null);

  const [nome, setNome] = useState('');
  const [conclusao, setConclusao] = useState('');
  const [laudo, setLaudo] = useState('0');
  const [anexo, setAnexo] = useState('');
  const [onEdit, setOnEdit] = useState(null);
  const [att, setAtt] = useState(false);

  useEffect(() => {
    getConclusoes();
  }, [isOpen])

  useEffect(() => {
    if (onEdit) {
      setNome(onEdit.nome_conclusao);
      setConclusao(onEdit.conclusao);
      setLaudo(onEdit.laudo)

      if (onEdit.anexo && onEdit.laudo === 'lip') {
        setAnexo(onEdit.Anexo)
      }

    }
  }, [onEdit, att]);

  if (!isOpen) {
    return null;
  }

  const handleClear = () => {
    setNome('');
    setConclusao('');
    setLaudo('');
    setAnexo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!nome || !conclusao) {
        return toast.info("Preencha todos os campos!");
      }

      const conclusaoData = {
        fk_risco_id: riscoId,
        nome_conclusao: nome,
        conclusao: conclusao,
        laudo: laudo,
        anexo: anexo || '',
      }

      const url = onEdit
        ? `${connect}/conclusoes/${onEdit.id_conclusao}`
        : `${connect}/conclusoes`

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(conclusaoData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar conclusao. Status: ${response.status}`)
      }

      const responseData = await response.json();

      toast.success(responseData);
    } catch (error) {
      console.log("Erro ao adicionar conclusão", error)
    }
    handleClear();
    getConclusoes();
    setAtt(!att);
  };

  const find = (item) => {
    const filterRisk = riscos.find((i) => i.id_risco === item);
    return filterRisk ? filterRisk.nome_risco : ''
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-3/4 bg-white mx-auto rounded-lg z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <div>
            <h1 className='text-xl font-bold text-sky-800'>Cadastro de Conclusões</h1>
            <p className='txt-gray-600 font-light'>Cadastre uma conclusão para o risco <span className='font-semibold text-gray-800'>{find(riscoId)}</span> e selecione a qual laudo ela se refere.</p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-sky-800 rounded-lg text-sm w-8 h-8"
              onClick={onCancel}>
              <svg className="flex m-auto w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <div className='border-b border-gray-200 mb-4'></div>
        <form onSubmit={handleSubmit}>
          {/* Conclusão LTCAT */}
          <div className="px-1 py-1">
            <div className="flex gap-3">
              {/* Nome */}
              <div className={`w-full md:w-3/4`}>
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome_conclusao_ltcat">
                  Nome:
                </label>
                <input
                  className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  type="text"
                  name="nome_conclusao_ltcat"
                  placeholder="Nome da conclusão"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              {/* Laudo */}
              <div className="w-1/4">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="laudo">
                  Laudo:
                </label>
                <select
                  className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100"
                  name="laudo"
                  id='laudo'
                  value={laudo}
                  onChange={(e) => setLaudo(e.target.value)}
                >
                  <option value="0">Selecione o Laudo</option>
                  {ltcat && (
                    <option value="ltcat">LTCAT</option>
                  )}
                  {lip && (
                    <option value="lip">LIP</option>
                  )}
                  {(ltcat && lip) && (
                    <option value="ambos">Ambos</option>
                  )}
                </select>
              </div>

            </div>

            <div className='flex items-center gap-3'>
              {/* conclusão */}
              <div className={`${laudo !== 'lip' ? 'w-full' : 'w-3/4'}`}>
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="conclusao_ltcat">
                  Conclusão:
                </label>
                <textarea
                  className="resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                  type="text"
                  name="conclusao_ltcat"
                  placeholder="Conclusão..."
                  value={conclusao}
                  onChange={(e) => setConclusao(e.target.value)}
                />
              </div>

              {/* Anexo */}
              {laudo === "lip" && (
                <div className={`w-full md:w-1/4`}>
                  <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="anexo">
                    Anexo:
                  </label>
                  <input
                    className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                    type="text"
                    id='anexo'
                    name="anexo"
                    placeholder="Anexo"
                    value={anexo}
                    onChange={(e) => setAnexo(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="w-full flex justify-end gap-2">
              <div>
                <button onClick={handleClear} className="shadow bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-gray-50 font-bold py-2 px-3 rounded" type="button">
                  <MdCleaningServices />
                </button>
              </div>
              <div className="">
                <button className="shadow bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-gray-50 font-bold py-2 px-3 rounded" type="submit">
                  <BiSolidMessageAdd />
                </button>
              </div>
            </div>
          </div>
        </form>

        <div>
          <GridModalConclusao
            childId={riscoId}
            conclusoes={conclusoes}
            setOnEdit={setOnEdit}
            onSelect={onSelect}
            invent={inventario}
          />
        </div>

      </div>
    </div>
  );
};


export default ModalConclusaoLtcat;
