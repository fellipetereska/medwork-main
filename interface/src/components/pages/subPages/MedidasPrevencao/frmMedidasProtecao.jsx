//Importando Ferramentas
import { useRef, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { connect, supabase } from "../../../../services/api"; //Conexão com o banco de dados


function CadastroMedidas({ onEdit, setOnEdit, get }) {

  //Instanciando as Variáveis
  const ref = useRef(null); // Referência do formulario

  // Colocando as informações do formulario nas variaveis
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const { nome_medida, descricao } = user;

      nome_medida.value = onEdit.nome_medida || "";
      descricao.value = onEdit.descricao || "";
    }
  }, [onEdit]);



  //Função para adicionar ou atualizar dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    //Verificandose todos os campos foram preenchidos
    if (
      !user.nome_medida.value ||
      !user.descricao.value) {
      return toast.warn("Preencha Todos os Campos!")
    }
    try {
      const medidasData = {
        nome_medida: user.nome_medida.value || null,
        descricao: user.descricao.value || null,
      };

      const url = onEdit
        ? `${connect}/medidas_protecao/${onEdit.id_medida}`
        : `${connect}/medidas_protecao`;

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medidasData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar/editar medida de proteção. Status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData);
    } catch (error) {
      toast.error("Erro ao cadastrar ou editar medida de proteção")
      console.log("Erro ao cadastrar ou editar medida de proteção: ", error);
    }

    //Limpa os campos e reseta o estaodo de edição
    user.nome_medida.value = "";
    user.descricao.value = "";

    //Atualiza os dados
    get();
  };

  //Função para limpar o formulário
  const handleClear = () => {
    // Limpa todos os campos do formulário
    const user = ref.current;
    user.nome_medida.value = "";
    user.descricao.value = "";
  };


  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6 p-3">
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Nome da Medida:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="nome_medida"
              placeholder="Nome da Medida de Proteção"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Descrição da Medida:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="descricao"
              placeholder="Descrição da Medida de Proteção"
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

export default CadastroMedidas;