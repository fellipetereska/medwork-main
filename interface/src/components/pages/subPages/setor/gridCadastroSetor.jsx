//Importando ferramentas
import { BsFillPencilFill } from 'react-icons/bs'; //Icone de Edição
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { supabase } from '../../../../services/api'; //Conexão com o banco de dados
import icon_processo from '../../../media/icon_processos.svg'
import ModalProcesso from '../components/Modal/ModalProcesso'
import { FiLink } from "react-icons/fi";

function GridCadastroSetor({ setor, setSetor, setOnEdit }) {

  //Instanciando variavel e definindo o estado como null
  const [unidade, setUnidade] = useState(null);

  const [showModal, setShowModal] = useState(null);
  const [setorName, setSetorName] = useState(null);
  const [setorId, setSetorId] = useState(null);

  //Função para editar item
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  //Função para buscar as unidades do select
  const fetchUnidade = async () => {
    try {
      const { data } = await supabase.from("unidade").select();
      setUnidade(data);
    } catch (error) {
      console.error("Erro ao buscar unidade:", error);
    }
  }

  useEffect(() => {
    fetchUnidade();
  }, [])

  //Função para verificar a unidade
  const finUnidade = (fkUnidadeId) => {
    if (!unidade) {
      return 'N/A';
    }

    const unidades = unidade.find((c) => c.id_unidade === fkUnidadeId);
    return unidades ? unidades.nome_unidade : 'N/A';
  };

  //Função para desativar o setor
  const handleDesactivation = async (id, ativo) => {
    try {
      await supabase
        .from("setor")
        .update({ ativo: !ativo })
        .eq("id_setor", id)

      const novoSetor = setor.map(item =>
        item.id_setor === id ? { ...item, ativo: !ativo } : item
      );
      setSetor(novoSetor)
      toast.info(`Setor ${!ativo ? 'ativado' : 'inativado'} com sucesso!`);
    } catch (error) {
      console.error("Erro ao atualizar status do setor:", error);
      toast.error("Erro ao atualizar status do setor, verifique o console!");
    }
  }

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  const handleSetorSelect = (item) => {
    console.log(item)
    setSetorName(item.nome_setor)
    setSetorId(item.id_setor)
    openModal();
  }


  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm mt-4 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Setor
            </th>
            <th scope="col" className="px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3">
              Observação
            </th>
            <th scope="col" className="px-6 py-3">
              Unidade
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
            <th scope="col" className="px-6 py-3">
              Vínculos
            </th>
          </tr>
        </thead>
        <tbody>
          {setor && setor.map((item, i) => (
            <tr key={i} className={`border-b bg-white ${!item.ativo ? 'opacity-25' : ''}`}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_setor}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.nome_setor}
              </th>
              <td className="px-6 py-4">{item.ambiente_setor}</td>
              <td className="px-6 py-4">{item.observacao_setor}</td>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {finUnidade(item.fk_unidade_id)}
              </th>
              <td className={`px-5 py-4 gap-4 flex justify-start `}>
                <a className={`font-medium text-blue-600 hover:text-blue-800 cursor-pointer ${!item.ativo ? 'cursor-not-allowed' : '' }`}>
                  <BsFillPencilFill onClick={() => handleEdit(item)} />
                </a>
                <label
                  className="relative flex items-center rounded-full cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!item.ativo}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-amber-500 checked:bg-amber-500 checked:before:bg-amber-500 hover:before:opacity-10"
                    onChange={() => handleDesactivation(item.id_setor, item.ativo)}
                  />
                  <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </label>
              </td>
              <td className="px-6 py-4">
                <a className={`cursor-pointer text-yellow-500 text-lg flex justify-center ${!item.ativo ? 'cursor-not-allowed' : '' }`} onClick={() => handleSetorSelect(item)}>
                  <FiLink />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalProcesso
        isOpen={showModal}
        onCancel={closeModal}
        setorName={setorName}
        setorId={setorId}
        setor={setor}
      />
    </div>

  );
}

export default GridCadastroSetor;