//Importando Ferramentas
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco de dados


function CadastroEpi({ onEdit, setOnEdit, get }) {

  //Instanciando as Variáveis
  const ref = useRef(null); // Referência do formulario

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const {
        nome_medida,
        certificado_medida,
        fator_reducao_medida,
        vencimento_certificado_medida,
        fabricante_medida,
        descricao_medida
      } = user;

      nome_medida.value = onEdit.nome_medida || "";
      certificado_medida.value = onEdit.certificado_medida
      fator_reducao_medida.value = onEdit.fator_reducao_medida || "";
      vencimento_certificado_medida.value = onEdit.vencimento_certificado_medida || "";
      fabricante_medida.value = onEdit.fabricante_medida || "";
      descricao_medida.value = onEdit.descricao_medida || "";
    }
  }, [onEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome_medida.value ||
      !user.certificado_medida) {
      toast.warn("Preencha todos os campos!");
    }
    try {
      const epiData = {
        nome_medida: user.nome_medida.value || "",
        descricao_medida: user.fabricante_medida.value || "",
        certificado_medida: user.certificado_medida.value || "",
        fator_reducao_medida: user.fator_reducao_medida.value || "",
        vencimento_certificado_medida: user.vencimento_certificado_medida.value || "",
        fabricante_medida: user.fabricante_medida.value || "",
      };

      const url = onEdit
        ? `${connect}/medidas_epi/${onEdit.id_medida}`
        : `${connect}/medidas_epi`

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(epiData),
      })

      if (!response.ok) {
        toast.error("Erro ao inserir/atualizar o EPI");
        throw new Error(`Erro ao inserir/atualizar o EPI. Status ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData)
    } catch (error) {
      console.log("Erro ao inserir EPI: ", error)
    }

    user.nome_medida.value = "";
    user.certificado_medida.value = "";
    user.fator_reducao_medida.value = "";
    user.vencimento_certificado_medida.value = "";
    user.fabricante_medida.value = "";

    get();
  }

  const handleClear = () => {
    const user = ref.current;

    user.nome_medida.value = "";
    user.certificado_medida.value = "";
    user.fator_reducao_medida.value = "";
    user.vencimento_certificado_medida.value = "";
    user.fabricante_medida.value = "";
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
              name="nome_medida"
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
              name="certificado_medida"
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
              name="fator_reducao_medida"
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
              name="vencimento_certificado_medida"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
              Fabricante:
            </label>
            <input
              className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="fabricante_medida"
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