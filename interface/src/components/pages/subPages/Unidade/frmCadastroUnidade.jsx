import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import ModalSearchUnidadeContato from './ModalSearchUnidadeContato'
import ModalSearchUnidadeEmpresa from './ModalSearchUnidadeEmpresa'
import icon_lupa from '../../../media/icon_lupa.svg'
import icon_sair from '../../../media/icon_sair.svg'
import { supabase } from "../../../../services/api";

function FrmCadastroUnidade({ onEdit, setOnEdit, getUsers }) {

  // Instanciando a variavel que vai referenciar o formulario
  const ref = useRef(null);

  const [showModalContato, setShowModalContato] = useState(false); //Controlar o Modal Contato
  const [showModalEmpresa, setShowModalEmpresa] = useState(false); //Controlar o Modal Empresa
  const [contato, setContato] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);
  const [nomeEmpresa, setNomeEmpresa] = useState(null);
  const [contatoId, setContatoId] = useState(null);
  const [nomeContato, setNomeContato] = useState(null);

  // Colocando as informações do formulario nas variaveis
  useEffect(() => {
    if (onEdit) {
      const user = ref.current

      //Passando o dado do input para a props
      user.nome_unidade.value = onEdit.nome_unidade;
      user.cnpj_unidade.value = onEdit.cnpj_unidade;
      user.cep_unidade.value = onEdit.cep_unidade;
      user.endereco_unidade.value = onEdit.endereco_unidade;
      user.bairro_unidade.value = onEdit.bairro_unidade;
      user.cidade_unidade.value = onEdit.cidade_unidade;
      user.uf_unidade.value = onEdit.uf_unidade;
      user.fk_contato_id.value = onEdit.fk_contato_id;
      user.fk_empresa_id.value = onEdit.fk_empresa_id;
    }
  }, [onEdit]);

  //Função para adicionar ou atualizar dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    //Verificandose todos os campos foram preenchidos
    if (
      !user.nome_unidade.value ||
      !user.cnpj_unidade.value ||
      !user.cep_unidade.value ||
      !user.endereco_unidade.value ||
      !user.bairro_unidade.value ||
      !user.cidade_unidade.value) {
      return toast.warn("Preencha Todos os Campos!")
    }
    try {
      const unidadeData = {
        nome_unidade: user.nome_unidade.value,
        cnpj_unidade: user.cnpj_unidade.value,
        cep_unidade: user.cep_unidade.value,
        endereco_unidade: user.endereco_unidade.value,
        bairro_unidade: user.bairro_unidade.value,
        cidade_unidade: user.cidade_unidade.value,
        uf_unidade: user.uf_unidade.value,
        fk_contato_id: contatoId,
        fk_empresa_id: empresaId,
      }

      if (onEdit) {
        //Caso já tiver o cadastro ele vai colocar as opções para editar
        await supabase
          .from("unidade")
          .upsert([
            {
              id_unidade: onEdit.id_unidade,
              ...unidadeData,
            },
          ]);
        toast.success(`Unidade: ${onEdit.nome_unidade} atualizada com sucesso!`)
      } else {
        //Caso não tiver o cadastro ele cadastra
        const { data, error } = await supabase
          .from("unidade").upsert([unidadeData]);

        if (error) {
          toast.error("Erro ao inserir Unidade, verifique o console!");
          console.log("Erro ao inserir Unidade! Erro: ", error)
          throw error;
        }

        toast.success("Unidade inserida com sucesso!")
      }
    } catch (error) {
      console.log("Erro ao cadastrar ou atualizar Unidade", error)
    }

    user.nome_unidade.value = "";
    user.cnpj_unidade.value = "";
    user.cep_unidade.value = "";
    user.endereco_unidade.value = "";
    user.bairro_unidade.value = "";
    user.cidade_unidade.value = "";
    user.uf_unidade.value = "";
    setOnEdit(null);
    setContatoId(null);
    setEmpresaId(null);

    //Atualiza os dados
    getUsers();
  }

  const handleClear = () => {
    // Limpa todos os campos do formulário
    const user = ref.current;
    user.nome_unidade.value = "";
    user.cnpj_unidade.value = "";
    user.cep_unidade.value = "";
    user.endereco_unidade.value = "";
    user.bairro_unidade.value = "";
    user.cidade_unidade.value = "";
    user.uf_unidade.value = "";
    setContatoId(null);
    setEmpresaId(null);
  };

  //Busca os contatos para colocar no select
  const fetchContato = async () => {
    try {
      const { data } = await supabase.from("contato").select();
      setContato(data);
    } catch (error) {
      console.error("Erro ao buscar contato:", error);
    }
  }

  useEffect(() => {
    fetchContato();
  }, [])

  //Buscar as empresas para colocar no select
  const fetchEmpresa = async () => {
    try {
      const { data } = await supabase.from("empresa").select();
      setEmpresa(data)
    } catch (error) {
      console.log("Erro ao buscar Empresa: ", error)
    }
  };
  
  useEffect(() => {
    fetchEmpresa();
  }, [])

  //Funções do Modal
  //Função para abrir o Modal Contato
  const openModalContato = () => setShowModalContato(true);
  const openModalEmpresa = () => setShowModalEmpresa(true);
  //Função para fechar o Modal Empresa
  const closeModalContato = () => setShowModalContato(false);
  const closeModalEmpresa = () => setShowModalEmpresa(false);

  // Função para atualizar o Id Contato
  const handleContactSelect = (contactId, contactName) => {
    closeModalContato();
    setContatoId(contactId)
    setNomeContato(contactName)
  };

  // Função para atualizar o Id Empresa
  const handleEmpresaSelect = (contactId, contactName) => {
    closeModalEmpresa();
    setEmpresaId(contactId)
    setNomeEmpresa(contactName)
  };

  //Função para limpar o campo Contato
  const handleClearContato = () => {
    setContatoId(null);
    setNomeContato(null);
  };

  //Função para limpar o campo Contato
  const handleClearEmpresa = () => {
    setEmpresaId(null);
    setNomeEmpresa(null);
  };

  return (
    <div class="flex justify-center mt-10">
      <form class="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6 p-3">
          <div class="w-full md:w-1/3 px-3">
            <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Nome da Unidade:
            </label>
            <input
              class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="nome_unidade"
              placeholder="Nome da Unidade"
            />
          </div>
          <div class="w-full md:w-1/3 px-3">
            <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              CNPJ:
            </label>
            <input
              class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="cnpj_unidade"
              placeholder="CNPJ da Unidade"
            />
          </div>
          <div class="w-full md:w-1/3 px-3">
            <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              CEP:
            </label>
            <input
              class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="cep_unidade"
              placeholder="00000-000"
            />
          </div>
          <div class="w-full md:w-1/3 px-3">
            <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Endereço:
            </label>
            <input
              class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="endereco_unidade"
              placeholder="Endereço da Unidade"
            />
          </div>
          <div class="w-full md:w-1/3 px-3">
            <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Bairro:
            </label>
            <input
              class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="bairro_unidade"
              placeholder="Bairro da Unidade"
            />
          </div>
          <div class="w-full md:w-1/3 px-3">
            <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Cidade:
            </label>
            <input
              class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="cidade_unidade"
              placeholder="Cidade da Unidade"
            />
          </div>
          <div class="w-full md:w-1/3 px-3">
            <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              UF:
            </label>
            <input
              class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="uf_unidade"
              placeholder="UF da Unidade"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
              Contato:
            </label>
            <div className="flex items-center w-full">
              {nomeContato ? (
                <>
                  <div className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-end mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text">
                    <p className="px-2 text-sm font-sm text-gray-600">
                      Contato:
                    </p>
                    <p className="font-bold">
                      {nomeContato}
                    </p>
                  </div>
                  <button className="ml-4" onClick={handleClearContato}>
                    <img src={icon_sair} alt="" className="h-9" />
                  </button>
                </>
              ) : (
                <div className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-end mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text">
                  <p className="px-2 text-sm font-medium">
                    Nenhum Contato Selecionado
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={openModalContato}
                className={`flex cursor-pointer ml-4`}
              >
                <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
              </button>
            </div>
            <ModalSearchUnidadeContato
              isOpen={showModalContato}
              onCancel={closeModalContato}
              children={contato}
              onContactSelect={handleContactSelect}
            />
          </div>


          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
              Empresa:
            </label>
            <div className="flex items-center w-full">
              {nomeEmpresa ? (
                <>
                  <div className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-end mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text">
                    <p className="px-2 text-sm font-sm text-gray-600">
                      Empresa:
                    </p>
                    <p className="font-bold">
                      {nomeEmpresa}
                    </p>
                  </div>
                  <button className="ml-4" onClick={handleClearEmpresa}>
                    <img src={icon_sair} alt="" className="h-9" />
                  </button>
                </>
              ) : (
                <div className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-end mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text">
                  <p className="px-2 text-sm font-medium">
                    Nenhuma Empresa Selecionado
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={openModalEmpresa}
                className={`flex cursor-pointer ml-4`}
              >
                <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
              </button>
            </div>
            <ModalSearchUnidadeEmpresa
              isOpen={showModalEmpresa}
              onCancel={closeModalEmpresa}
              children={empresa}
              onContactSelect={handleEmpresaSelect}
            />
          </div>

          
          <div class="w-full px-3 pl-8 flex justify-end">
            <div>
              <button onClick={handleClear} class="shadow mt-4 bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Limpar
              </button>
            </div>
            <div class="px-3 pl-8">
              <button class="shadow mt-4 bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FrmCadastroUnidade;