import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco de dados

import ModalSearchContato from '../components/Modal/ModalSearchContato'
import icon_lupa from '../../../media/icon_lupa.svg'
import icon_sair from '../../../media/icon_sair.svg'

function FrmCadastroUnidade({ onEdit, setOnEdit, getUnidades, contact, company, contato, companyId }) {

  // Instanciando a variavel que vai referenciar o formulario
  const ref = useRef(null);

  const [showModalContato, setShowModalContato] = useState(false); //Controlar o Modal Contato
  const [contatoId, setContatoId] = useState(null);
  const [nomeContato, setNomeContato] = useState(null);
  const [cnpj, setCnpj] = useState(""); //Armazena o CNPJ
  const [cep, setCep] = useState(""); //Armazena o CNPJ
  const [estado, setEstado] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [logradouro, setLogradouro] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [numero, setNumero] = useState(null);

  const user = ref.current

  // Colocando as informações do formulario nas variaveis
  useEffect(() => {
    if (onEdit) {

      //Passando o dado do input para a props
      user.nome_unidade.value = onEdit.nome_unidade;
      setCnpj(onEdit.cnpj_unidade || "");
      setCep(onEdit.cep_unidade || "");
      setEstado(onEdit.uf_unidade || "");
      setBairro(onEdit.bairro_unidade || "");
      setCidade(onEdit.cidade_unidade || "");
      setLogradouro(onEdit.endereco_unidade || "");
      setNumero(onEdit.numero_unidade || "");

      if (contact && onEdit.fk_contato_id) {
        setNomeContato(contact);
        setContatoId(onEdit.fk_contato_id);
      } else {
        setNomeContato(null)
        setContatoId(null);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [onEdit, contact, company, user]);

  //Função para adicionar ou atualizar dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Verificandose todos os campos foram preenchidos
    if (
      !user.nome_unidade.value ||
      !user.cnpj_unidade.value ||
      !user.cep_unidade.value) {
      return toast.warn("Preencha Todos os Campos!")
    }
    try {
      const unidadesData = {
        nome_unidade: user.nome_unidade.value || null,
        cnpj_unidade: user.cnpj_unidade.value || null,
        cep_unidade: user.cep_unidade.value || null,
        endereco_unidade: user.endereco_unidade.value || null,
        numero_unidade: user.numero_unidade.value || null,
        cidade_unidade: user.cidade_unidade.value || null,
        bairro_unidade: user.bairro_unidade.value || null,
        uf_unidade: user.uf_unidade.value || null,
        fk_contato_id: contatoId || null,
        fk_empresa_id: companyId || null,
        ativo: 1,
      };

      const url = onEdit
        ? `${connect}/unidades/${onEdit.id_unidade}`
        : `${connect}/unidades`

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unidadesData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar/Editar unidade. Status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData);

    } catch (error) {
      console.log("Erro ao cadastrar ou atualizar Unidade", error)
    }

    user.nome_unidade.value = "";
    setNumero("");
    setBairro("");
    setLogradouro("")
    setCidade("")
    setEstado("");
    setCnpj("");
    setCep("");
    setOnEdit(null);
    setContatoId(null);
    setNomeContato(null);
    setOnEdit(null);

    //Atualiza os dados
    getUnidades();
  }

  //Função para limpar os campos
  const handleClear = () => {
    // Limpa todos os campos do formulário
    user.nome_unidade.value = "";
    setNumero("");
    setBairro("");
    setLogradouro("");
    setCidade("")
    setEstado("");
    setCnpj("");
    setCep("");
    setContatoId(null);
    setNomeContato(null);
    setOnEdit(null);
  };

  //Funções do Modal
  //Função para abrir o Modal Contato
  const openModalContato = () => setShowModalContato(true);
  //Função para fechar o Modal Empresa
  const closeModalContato = () => setShowModalContato(false);

  // Função para atualizar o Id Contato
  const handleContactSelect = (contactId, contactName) => {
    closeModalContato();
    setContatoId(contactId);
    setNomeContato(contactName);
  };

  //Função para limpar o campo Contato
  const handleClearContato = () => {
    setContatoId(null);
    setNomeContato(null);
  };

  //Funções para formatação do CNPJ
  const handleFormatCnpj = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  const handlePasteCnpj = (event) => {
    const inputCnpj = event.clipboardData.getData('text/plain');
    const cnpjFormatado = handleFormatCnpj(inputCnpj);
    setCnpj(cnpjFormatado);
  };

  const handleCnpjChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 14);
    const formattedCnpj = handleFormatCnpj(truncatedValue);

    if (formattedCnpj === inputValue) {
      setCnpj(inputValue);
    } else {
      setCnpj(formattedCnpj);
    }
  };

  //Formatando o CEP
  const handleFormatCep = (value) => {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2');
  };

  const obterInformacoesCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      // Verifica se há um erro na resposta
      if (data.erro) {
        console.error("Erro ao obter informações do CEP");
        return null;
      }

      return {
        estado: data.uf,
        cidade: data.localidade,
        bairro: data.bairro,
        logradouro: data.logradouro
      };
    } catch (error) {
      console.error("Erro ao obter informações do CEP:", error);
      return null;
    }
  };

  const handleCepChange = async (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 8); // Ajusta para 8 caracteres
    const formattedCep = handleFormatCep(truncatedValue);
    setCep(formattedCep);

    if (truncatedValue.length === 8) {
      const cepInfo = await obterInformacoesCep(truncatedValue);

      if (cepInfo) {
        setEstado(cepInfo.estado);
        setCidade(cepInfo.cidade);
        setBairro(cepInfo.bairro);
        setLogradouro(cepInfo.logradouro);
      }
    }
  };

  const handlePasteCep = async (event) => {
    const inputCep = event.clipboardData.getData('text/plain');
    const numericCep = inputCep.replace(/\D/g, '');
    const truncatedCep = numericCep.slice(0, 8); // Ajusta para 8 caracteres
    const formattedCep = handleFormatCep(truncatedCep);
    setCep(formattedCep);

    if (truncatedCep.length === 8) {
      const cepInfo = await obterInformacoesCep(truncatedCep);

      if (cepInfo) {
        setEstado(cepInfo.estado);
        setCidade(cepInfo.cidade);
        setBairro(cepInfo.bairro);
        setLogradouro(cepInfo.logradouro);
      }
    }
  };

  // Função para formatar e atualizar o estado (UF)
  const handleUfChange = (e) => {
    const inputValue = e.target.value.trim().toUpperCase();

    // Verifica se o valor tem no máximo 2 letras
    if (/^[a-zA-Z]{0,2}$/.test(inputValue)) {
      setEstado(inputValue);
    } else {
      toast.warn("UF inválido. Digite no máximo 2 letras.");
      // Pode optar por não limpar o estado aqui
    }
  };

  //Função para Validar numero(endereço)
  const handleNumChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setNumero(numericValue)
  }

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6 p-3">
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Nome da Unidade:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="nome_unidade"
              placeholder="Nome da Unidade"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-cnpj_empresa">
              CNPJ:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="cnpj_unidade"
              value={cnpj}
              onChange={handleCnpjChange}
              onPaste={handlePasteCnpj}
              maxLength={14}
              placeholder="00.000.000/0000-00"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-cnpj_empresa">
              CEP:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="cep_unidade"
              value={cep}
              onChange={handleCepChange}
              onPaste={handlePasteCep}
              maxLength={9}
              placeholder="00000-000"
            />
          </div>
          <div className="flex w-full md:w-1/3 px-3 gap-4">
            <div className="w-full">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                Endereço:
              </label>
              <input
                className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                type="text"
                name="endereco_unidade"
                placeholder="Endereço da Unidade"
                value={logradouro}
              />
            </div>
            <div className="w-1/3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2 ml-1" htmlFor="grid-nome_empresa">
                Nº:
              </label>
              <input
                className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                type="text"
                name="numero_unidade"
                placeholder="Nº"
                value={numero}
                onChange={handleNumChange}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Bairro:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="bairro_unidade"
              placeholder="Bairro da Unidade"
              value={bairro}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Cidade:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="cidade_unidade"
              placeholder="Cidade da Unidade"
              value={cidade}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Selecione um Estado:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="uf_unidade"
              placeholder="UF da Unidade"
              value={estado}
              onChange={handleUfChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
              Contato:
            </label>
            <div className="flex items-center w-full">
              {nomeContato ? (
                <>
                  <button
                    className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                    onClick={openModalContato}
                  >
                    <p className="px-2 text-sm font-sm text-gray-600">
                      Contato:
                    </p>
                    <p className="font-bold">
                      {nomeContato}
                    </p>
                  </button>
                  <button className="ml-4" onClick={handleClearContato}>
                    <img src={icon_sair} alt="" className="h-9" />
                  </button>
                </>
              ) : (
                <button
                  className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                  onClick={openModalContato}
                >
                  <p className="px-2 text-sm font-medium">
                    Nenhum Contato Selecionado
                  </p>
                </button>
              )}
              <button
                type="button"
                onClick={openModalContato}
                className={`flex cursor-pointer ml-4`}
              >
                <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
              </button>
            </div>
            <ModalSearchContato
              isOpen={showModalContato}
              onCancel={closeModalContato}
              children={contato}
              onContactSelect={handleContactSelect}
            />
          </div>

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

export default FrmCadastroUnidade;