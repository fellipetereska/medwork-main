//Importando Ferramentas
import { useRef, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { connect, supabase } from "../../../../services/api"; //Conexão com o banco de dados

import ModalSetor from '../components/Modal/ModalSearchSetor'
import ModalCargo from "../components/Modal/ModalCargo";
import icon_sair from '../../../media/icon_sair.svg'
import icon_lupa from '../../../media/icon_lupa.svg'


function CadastroProcesso({ onEdit, getProcessos, nomeSetor, nomeCargo }) {

  //Instanciando as Variáveis
  const ref = useRef(null); // Referência do formulario
  const [showModalSetor, setShowModalSetor] = useState(false); //Controlar o Modal
  const [setor, setSetor] = useState(null); //Armazenando os dados para o Modal
  const [setorId, setSetorId] = useState(null);
  const [setorName, setSetorName] = useState(null);
  const [showModalCargo, setShowModalCargo] = useState(false); //Controlar o Modal
  const [cargo, setCargo] = useState(null); //Armazenando os dados para o Modal
  const [cargoId, setCargoId] = useState(null);
  const [cargoName, setCargoName] = useState(null);

  // Colocando as informações do formulario nas variaveis
  useEffect(() => {
    const user = ref.current;

    if (onEdit) {
      const { nome_processo, descricao } = user;

      nome_processo.value = onEdit.nome_processo || "";
      descricao.value = onEdit.descricao || "";

      if (nomeSetor && onEdit.fk_setor_id) {
        setSetorName(nomeSetor);
        setSetorId(onEdit.fk_setor_id)
      } else {
        setSetorId(null);
        setSetorName(null);
      }

      if (nomeCargo && onEdit.fk_cargo_id) {
        setCargoName(nomeCargo);
        setCargoId(onEdit.fk_cargo_id)
      } else {
        setCargoId(null);
        setCargoName(null);
      }
    }
  }, [onEdit, setor, setCargoId]);

  //Função para adicionar ou atualizar dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    //Verificandose todos os campos foram preenchidos
    if (
      !user.nome_processo.value ||
      !user.descricao.value) {
      return toast.warn("Preencha Todos os Campos!")
    }
    try {
      const processoData = {
        nome_processo: user.nome_processo.value || null,
        descricao: user.descricao.value || null,
        fk_setor_id: setorId || null,
        fk_cargo_id: cargoId || null,
      };

      const url = onEdit
      ? `${connect}/processos/${onEdit.id_processo}`
      : `${connect}/processos`

      const method = onEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processoData),
      });
      
      if(!response.ok) {
        throw new Error (`Erro ao cadastrar/Editar processo. Status: ${response.status}`);
      }

      const responseData = await response.json();
      
      toast.success(responseData);
    } catch (error) {
      toast.error("Erro ao cadastrar ou editar processo!")
      console.log("Erro ao cadastrar ou editar processo: ", error);
    }

    //Limpa os campos e reseta o estaodo de edição
    user.nome_processo.value = "";
    user.descricao.value = "";
    setCargoName(null);
    setSetorName(null);

    //Atualiza os dados
    getProcessos();
  };

  //Função para limpar o formulário
  const handleClear = () => {
    const user = ref.current;

    // Limpa todos os campos do formulário
    user.nome_processo.value = "";
    user.descricao.value = "";
    setCargoName(null);
    setSetorName(null);
  };

  const getSetor = async () => {
    const { data } = await supabase.from("setor").select();
    const filteredData = data.filter((item) => item.ativo);
    const sortData = filteredData.sort();
    setSetor(sortData);
  }


  const fetchCargo = async () => {
    try {
      const { data } = await supabase.from("cargo").select();
      setCargo(data);
    } catch (error) {
      console.log("Erro ao buscar cargos", error);
    }
  }

  useEffect(() => {
    getSetor();
    fetchCargo();
  }, [])


  //Funções do Modal
  //Função para abrir o Modal
  const openModalSetor = () => setShowModalSetor(true);
  const openModalCargo = () => setShowModalCargo(true);
  //Função para fechar o Modal
  const closeModalSetor = () => setShowModalSetor(false);
  const closeModalCargo = () => setShowModalCargo(false);

  const handleSetorSelect = useCallback((setorId, setorName) => {
    closeModalSetor();
    setSetorId(setorId);
    setSetorName(setorName);
  }, [closeModalSetor]);

  const handleClearSetor = () => {
    setSetorId(null);
    setSetorName(null);
  }

  const handleCargoSelect = useCallback((cargoId, cargoName) => {
    closeModalCargo();
    setCargoId(cargoId);
    setCargoName(cargoName);
  }, [closeModalCargo]);

  const handleClearCargo = () => {
    setCargoId(null);
    setCargoName(null);
  }

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="-mx-3 mb-6 p-3">
          {/* Campos Formulário */}
          <div className="flex">
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                Nome do Processo
              </label>
              <input
                className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                type="text"
                name="nome_processo"
                placeholder="Nome do Processo"
              />
            </div>
            <div className="w-full px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                Descrição do Processo
              </label>
              <textarea
                className="resize-none appearence-none block w-full bg-gray-100 h-20 min-h-20 max-h-20 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                type="text"
                name="descricao"
                placeholder="Descreva o processo"
              />
            </div>
          </div>

          {/* Botões Formulário */}
          <div className="w-full px-3 pl-8 flex justify-end">
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
      </form>
    </div>
  )
}

export default CadastroProcesso;