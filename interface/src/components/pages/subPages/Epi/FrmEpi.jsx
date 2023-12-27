//Importando Ferramentas
import { useRef, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../../services/api"; //Conexão com o banco de dados


function CadastroEpi({ onEdit, setOnEdit, get }) {

  //Instanciando as Variáveis
  const ref = useRef(null); // Referência do formulario

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const {
        nome_epi,
        certificado_epi,
        fator_reducao_epi,
        vencimento_certificado_epi,
        fabricante_epi
      } = user;

      nome_epi.value = onEdit.nome_epi || "";
      certificado_epi.value = onEdit.certificado_epi
      fator_reducao_epi.value = onEdit.fator_reducao_epi || "";
      vencimento_certificado_epi.value = onEdit.vencimento_certificado_epi || "";
      fabricante_epi.value = onEdit.fabricante_epi || "";
    }
  }, [onEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.nome_epi.value) {
      toast.warn("Preencha todos os campos!");
    }
    try {
      const epiData = {
        nome_epi: user.nome_epi.value || "",
        certificado_epi: user.certificado_epi.value || "",
        fator_reducao_epi: user.fator_reducao_epi.value || "",
        vencimento_certificado_epi: user.vencimento_certificado_epi.value || "",
        fabricante_epi: user.fabricante_epi.value || "",
      };

      if (onEdit) {
        await supabase.from("epi").upsert([
          {
            id_epi: onEdit.id_epi,
            ...epiData,
          }
        ]);

        toast.success(`EPI ${onEdit.nome_epi} autalizado com sucesso!`);
      } else {
        const { error } = await supabase.from("epi").upsert([epiData]);

        if (error) {
          toast.error("Erro ao inserir EPI!");
          console.log("Erro ao inserir EPI: ", error);
          throw error;
        }

        toast.success("EPI inserido com sucesso!");
      }
    } catch (error) {
      console.log("Erro ao inserir EPI: ", error)
    }

    user.nome_epi.value = "";
    user.certificado_epi.value = "";
    user.fator_reducao_epi.value = "";
    user.vencimento_certificado_epi.value = "";
    user.fabricante_epi.value = "";

    get();
  }

  const handleClear = () => {
    const user = ref.current;
    
    user.nome_epi.value = "";
    user.certificado_epi.value = "";
    user.fator_reducao_epi.value = "";
    user.vencimento_certificado_epi.value = "";
    user.fabricante_epi.value = "";
  }

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6 p-3">
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Nome do EPI:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="nome_epi"
              placeholder="Nome do EPI"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Certificado de Aprovação:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="certificado_epi"
              placeholder="Certificado de Aprovação"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Fator de Redução:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="fator_reducao_epi"
              placeholder="Fator de Redução:"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Vencimento do Certificado:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="date"
              name="vencimento_certificado_epi"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Fabricante:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="fabricante_epi"
              placeholder="Fabricante do EPI"
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

export default CadastroEpi;