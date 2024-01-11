//Importando Ferramentas
import { useRef, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco de dados


function CadastroMedidas({ onEdit, setOnEdit, get }) {

  //Instanciando as Variáveis
  const ref = useRef(null); // Referência do formulario

  // Colocando as informações do formulario nas variaveis
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const { nome_aparelho, marca_aparelho, modelo_aparelho, data_calibracao_aparelho } = user;

      nome_aparelho.value = onEdit.nome_aparelho || "";
      marca_aparelho.value = onEdit.marca_aparelho || "";
      modelo_aparelho.value = onEdit.modelo_aparelho || "";
      data_calibracao_aparelho.value = onEdit.data_calibracao_aparelho || "";
    }
  }, [onEdit]);



  //Função para adicionar ou atualizar dados
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const user = ref.current;

  //   //Verificandose todos os campos foram preenchidos
  //   if (
  //     !user.nome_aparelho.value) {
  //     return toast.warn("Preencha Todos os Campos!")
  //   }
  //   try {
  //     const aparelhoData = {
  //       nome_aparelho: user.nome_aparelho.value || null,
  //       marca_aparelho: user.marca_aparelho.value || null,
  //       modelo_aparelho: user.modelo_aparelho.value || null,
  //       data_calibracao_aparelho: user.data_calibracao_aparelho.value || null,
  //     };

  //     if (onEdit) {
  //       //Caso já tiver o cadastro ele vai colocar as opções para editar
  //       await supabase
  //         .from("aparelhos")
  //         .upsert([
  //           {
  //             id_aparelho: onEdit.id_aparelho,
  //             ...aparelhoData,
  //           },
  //         ]);
  //       toast.success(`Aparelho: ${onEdit.nome_aparelho} atualizado com sucesso`)
  //     } else {
  //       //Caso contrario é uma inserção
  //       const { error } = await supabase
  //         .from("aparelhos").upsert([aparelhoData]);

  //       if (error) {
  //         toast.error("Erro ao inserir aparelho, verifique o console!");
  //         console.log("Erro ao inserir aparelho! Erro: ", error)
  //         throw error;
  //       }

  //       toast.success("Aparelho inserido com sucesso!")
  //     }
  //   } catch (error) {
  //     console.log("Erro ao cadastrar ou editar aparelho: ", error);
  //   }

  //   //Limpa os campos e reseta o estaodo de edição
  //   user.nome_aparelho.value = "";
  //   user.marca_aparelho.value = "";
  //   user.modelo_aparelho.value = "";
  //   user.data_calibracao_aparelho.value = "";

  //   //Atualiza os dados
  //   get();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    // Verificando se todos os campos foram preenchidos
    if (!user.nome_aparelho.value) {
      return toast.warn("Preencha Todos os Campos!");
    }

    try {
      const aparelhoData = {
        nome_aparelho: user.nome_aparelho.value || null,
        marca_aparelho: user.marca_aparelho.value || null,
        modelo_aparelho: user.modelo_aparelho.value || null,
        data_calibracao_aparelho: user.data_calibracao_aparelho.value || null,
      };

      const url = onEdit
        ? `${connect}/aparelhos/${onEdit.id_aparelho}`
        : `${connect}/aparelhos`;

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aparelhoData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar/editar aparelho. Status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData); // Assumindo que sua API retorna uma mensagem de sucesso
    } catch (error) {
      console.log("Erro ao cadastrar ou editar aparelho: ", error);
      toast.error("Erro ao cadastrar ou editar aparelho. Verifique o console!");
    }

    // Limpa os campos e reseta o estado de edição
    user.nome_aparelho.value = "";
    user.marca_aparelho.value = "";
    user.modelo_aparelho.value = "";
    user.data_calibracao_aparelho.value = "";

    // Atualiza os dados
    get();
  };

  //Função para limpar o formulário
  const handleClear = () => {
    // Limpa todos os campos do formulário
    const user = ref.current;
    user.nome_aparelho.value = "";
    user.marca_aparelho.value = "";
    user.modelo_aparelho.value = "";
    user.data_calibracao_aparelho.value = "";
  };


  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6 p-3">
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Nome do Aparelho:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="nome_aparelho"
              placeholder="Nome do Aparelho"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Marca do Aparelho:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="marca_aparelho"
              placeholder="Marca do Aparelho"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Modelo Aparelho
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="modelo_aparelho"
              placeholder="Modelo Aparelho"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Data da Calibração
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="date"
              name="data_calibracao_aparelho"
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