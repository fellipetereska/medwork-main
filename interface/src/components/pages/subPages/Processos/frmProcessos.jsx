//Importando Ferramentas
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco de dados


function CadastroProcesso({ onEdit, getProcessos, setOnEdit, setSearchTerm, processos }) {

  //Instanciando as Variáveis
  const ref = useRef(null); // Referência do formulario

  // Colocando as informações do formulario nas variaveis
  useEffect(() => {
    const user = ref.current;

    if (onEdit) {
      const { nome_processo, ramo_trabalho } = user;

      nome_processo.value = onEdit.nome_processo || "";
      ramo_trabalho.value = onEdit.ramo_trabalho || "";

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  }, [onEdit]);

  const verifyProcessRegister = async (processo, ramo) => {
    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
    getProcessos();

    try {
      const process = processos.filter((proc) => normalizeString(proc.nome_processo) === normalizeString(processo));
      console.log(process)
      const procRam = process.filter((ram) => normalizeString(ram.ramo_trabalho) === normalizeString(ramo));

      if (procRam.length > 0) {
        return procRam;
      }
    } catch (error) {
      console.error(`Erro ao verificar registro do processo ${processo}!`, error)
    }
  }

  //Função para adicionar ou atualizar dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    //Verificandose todos os campos foram preenchidos
    if (
      !user.nome_processo.value ||
      !user.ramo_trabalho.value) {
      return toast.warn("Preencha Todos os Campos!")
    }
    try {

      const resVerify = await verifyProcessRegister(user.nome_processo.value, user.ramo_trabalho.value);

      if (resVerify) {
        return toast.warn(`Já existem processos cadastrados com esse nome: ${user.nome_processo.value} nesse ramo: ${user.ramo_trabalho.value}`);
      }

      const processoData = {
        nome_processo: user.nome_processo.value || null,
        ramo_trabalho: user.ramo_trabalho.value || null,
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

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar/Editar processo. Status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData);
    } catch (error) {
      toast.error("Erro ao cadastrar ou editar processo!")
      console.log("Erro ao cadastrar ou editar processo: ", error);
    }

    //Limpa os campos e reseta o estaodo de edição
    user.nome_processo.value = "";
    user.ramo_trabalho.value = "";
    setOnEdit(null);
    setSearchTerm('');
    //Atualiza os dados
    getProcessos();
  };

  //Função para limpar o formulário
  const handleClear = () => {
    const user = ref.current;

    // Limpa todos os campos do formulário
    user.nome_processo.value = "";
    user.ramo_trabalho.value = "";
    setOnEdit(null);
    setSearchTerm('');
  };

  const handleSearchProcesso = (e) => {
    const term = e.target.value;
    if (!term) {
      setSearchTerm('');
    }
    setSearchTerm(term)
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="-mx-3 mb-6 p-3">
          {/* Campos Formulário */}
          <div className="flex">
            <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                Nome do Processo
              </label>
              <input
                className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                type="text"
                name="nome_processo"
                placeholder="Nome do Processo"
                onChange={handleSearchProcesso}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                Ramo de Trabalho
              </label>
              <input
                className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                type="text"
                name="ramo_trabalho"
                placeholder="Ramo de Trabalho"
                onChange={handleSearchProcesso}
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