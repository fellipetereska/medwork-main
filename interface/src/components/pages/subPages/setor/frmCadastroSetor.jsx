//Importando ferramentas
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect, supabase } from '../../../../services/api' //Conexão com o banco de dados

import icon_sair from '../../../media/icon_sair.svg'
import icon_lupa from '../../../media/icon_lupa.svg'
import ModalSearchUnidade from "../components/Modal/ModalSearchUnidade";


function FrmCadastroSetor({ onEdit, setOnEdit, getSetor, unidades, onCancel, unidade }) {

  //Instanciando Variaveis
  // Instanciando a variavel que vai referenciar o formulario
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false); //Controlar o Modal
  const [unidadeId, setUnidadeId] = useState(null); //Armazenar o Id do Contato recebido do Modal
  const [nomeUnidade, setNomeUnidade] = useState(null); //Armazenar o Nome do Contato Recebido do Modal

  // Colocando as informações do formulario nas variaveis
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome_setor.value = onEdit.nome_setor;
      user.ambiente_setor.value = onEdit.ambiente_setor;
      user.observacao_setor.value = onEdit.observacao_setor;

      if (unidades && onEdit.fk_unidade_id) {
        setNomeUnidade(unidades);
        setUnidadeId(onEdit.fk_unidade_id);
      } else {
        setNomeUnidade(null);
        setUnidadeId(null);
      }
    }
  }, [onEdit, unidades]);

  //Função para adicionar ou atualizar dado
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    //Verificando se todos os campos foram preenchidos
    if (!user.nome_setor.value ||
      !user.ambiente_setor.value) {
      return toast.warn("Preencha Todos os Campos!");
    }

    try {
      const setorData = {
        nome_setor: user.nome_setor.value || null,
        fk_unidade_id: unidadeId || null,
        observacao_setor: user.observacao_setor.value || null,
        ambiente_setor: user.ambiente_setor.value || null,
      };

      const url = onEdit
        ? `${connect}/setores/${onEdit.id_setor}`
        : `${connect}/setores`;

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setorData),
      });

      if (!response.ok) {
        toast.error("Erro ao cadastrar ou editar setor!")
        throw new Error(`Erro ao cadastrar/editar Setor. Status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData);
    } catch (error) {
      toast.error("Erro ao salvar o registro");
      console.error(error);
    }

    // Limpa campos e reseta estado de edição
    user.nome_setor.value = "";
    user.ambiente_setor.value = "";
    user.observacao_setor.value = "";
    setUnidadeId(null);
    setNomeUnidade(null);
    setOnEdit(null);

    // Atualiza os dados
    getSetor();
  };

  //Função para limpar o formulário
  const handleClear = () => {
    // Limpa todos os campos do formulário
    const user = ref.current;
    user.nome_setor.value = "";
    user.ambiente_setor.value = "";
    user.observacao_setor.value = "";
    setUnidadeId(null);
    setNomeUnidade(null);
  };

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  // Função para atualizar o Id Contato
  const handleUnidadeSelect = (unidadeId, nomeUnidade) => {
    closeModal();
    setUnidadeId(unidadeId)
    setNomeUnidade(nomeUnidade)
  };

  //Função para limpar o campo Unidade
  const handleClearUnidade = () => {
    setUnidadeId(null);
    setNomeUnidade(null);
  };


  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6 p-3">
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_setor">
              Nome do Setor
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              name="nome_setor"
              placeholder="Nome do Setor"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
              Unidade:
            </label>
            <div className="flex items-center w-full">
              {nomeUnidade ? (
                <>
                  <button
                    className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                    onClick={openModal}
                  >
                    <p className="px-2 text-sm font-sm text-gray-600">
                      unidade:
                    </p>
                    <p className="font-bold">
                      {nomeUnidade}
                    </p>
                  </button>
                  <button className="ml-4" onClick={handleClearUnidade}>
                    <img src={icon_sair} alt="" className="h-9" />
                  </button>
                </>
              ) : (
                <button
                  className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                  onClick={openModal}
                >
                  <p className="text-sm font-medium">
                    Nenhuma Unidade Selecionado
                  </p>
                </button>
              )}
              <button
                type="button"
                onClick={openModal}
                className={`flex cursor-pointer ml-4`}
              >
                <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
              </button>
            </div>
            <ModalSearchUnidade
              isOpen={showModal}
              onCancel={closeModal}
              children={unidade}
              onContactSelect={handleUnidadeSelect}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-observacao_setor">
              Observação
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="observacao_setor"
              placeholder="Observação"
            />
            <p className="text-xs text-gray-400 mb-3">**Apenas se houver necessidade</p>
          </div>
          <div className="w-full md:w-3/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-ambiente_setor">
              Descrição do Ambiente
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded h-24 py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="ambiente_setor"
              placeholder="Descrição do Ambiente"
            />
          </div>
          <div className="w-full pl-8 flex justify-end">
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
        </div>
      </form >
    </div >
  )
}

export default FrmCadastroSetor;