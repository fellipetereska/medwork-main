//Importando Ferramentas
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco de dados


function CadastroEpi({ onEdit, setOnEdit, get, medidas }) {

  //Instanciando as Variáveis
  const ref = useRef(null); // Referência do formulario

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const {
        descricao_medida
      } = user;

      descricao_medida.value = onEdit.descricao_medida || "";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [onEdit]);

  const verify = async (medida) => {
    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

    try {
      const verifyMedida = medidas.filter((i) => normalizeString(i.descricao_medida) === normalizeString(medida));

      if (verifyMedida.length > 0) {
        return verifyMedida;
      }
    } catch (error) {
      console.error("Erro ao verificar medidas EPC", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.descricao_medida.value) {
      toast.warn("Preencha todos os campos!");
    }
    try {

      const res = await verify(user.descricao_medida.value);

      if (res) {
        return toast.warn(`Medida: ${user.descricao_medida.value} ja cadastrada!`)
      }

      const epcData = {
        descricao_medida: user.descricao_medida.value || "",
      };

      const url = onEdit
        ? `${connect}/medidas_epc/${onEdit.id_medida}`
        : `${connect}/medidas_epc`

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(epcData),
      })

      if (!response.ok) {
        toast.error("Erro ao inserir/atualizar o EPC");
        throw new Error(`Erro ao inserir/atualizar o EPC. Status ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData)
    } catch (error) {
      console.log("Erro ao inserir EPC: ", error)
    }

    user.descricao_medida.value = "";

    get();
  }

  const handleClear = () => {
    const user = ref.current;

    user.descricao_medida.value = "";
  }

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6 p-3">
          <div className="w-full px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Descrição do EPC:
            </label>
            <textarea
              className="resize-none appearence-none block w-full bg-gray-100 h-20 min-h-20 max-h-20 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="descricao_medida"
              placeholder="Descreva o EPC..."
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