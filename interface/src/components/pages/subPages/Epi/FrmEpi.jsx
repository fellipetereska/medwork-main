//Importando Ferramentas
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco de dados


function CadastroEpi({ onEdit, get, epis }) {

  //Instanciando as Variáveis
  const ref = useRef(null); // Referência do formulario
  const [certificado, setCertificado] = useState('');
  const [epi, setEpi] = useState('');

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const {
        nome_medida,
        certificado_medida,
        fator_reducao_medida,
        vencimento_certificado_medida,
        fabricante_medida
      } = user;

      nome_medida.value = onEdit.nome_medida || "";
      certificado_medida.value = onEdit.certificado_medida || "";
      fator_reducao_medida.value = onEdit.fator_reducao_medida || "";

      try {
        // Formate a data para o formato 'YYYY-MM-DD' antes de atribuir ao campo
        vencimento_certificado_medida.value = onEdit.vencimento_certificado_medida
          ? new Date(onEdit.vencimento_certificado_medida).toISOString().split('T')[0]
          : "";
      } catch (error) {
        console.log("Erro ao formatar data para input.", error)
      }

      fabricante_medida.value = onEdit.fabricante_medida || "";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [onEdit]);

  const verify = async (medida, certificado) => {
    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

    try {
      const verifyNome = epis.filter((i) => normalizeString(i.nome_medida) === normalizeString(medida));
      const verifyCa = verifyNome.filter((i) => i.certificado_medida.trim() == certificado.trim());
      if (verifyCa.length > 0) {
        return verifyCa;
      }
    } catch (error) {
      console.log("Erro ao verificar medidas EPI: ", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome_medida.value ||
      !certificado ||
      !user.fator_reducao_medida ||
      !user.vencimento_certificado_medida) {
      return toast.warn("Preencha todos os campos!");
    }

    if (certificado == 0) {
      return toast.warn("Preencha o campo certificado de aprovação!");
    }

    try {

      const res = await verify(user.nome_medida.value, certificado);

      if (res) {
        return toast.warn(`Epi: ${user.nome_medida} com CA: ${certificado} já cadastrado!`)
      }

      const epiData = {
        nome_medida: user.nome_medida.value || "",
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

  const handleVerifyCA = async (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setCertificado(numericValue);
  }

  const teste = () => {
    const user = ref.current;

    const epiData = {
      nome_medida: user.nome_medida.value || "",
      certificado_medida: user.certificado_medida.value || "",
      fator_reducao_medida: user.fator_reducao_medida.value || "",
      vencimento_certificado_medida: user.vencimento_certificado_medida.value || "",
      fabricante_medida: user.fabricante_medida.value || "",
    };

    const json = JSON.stringify(epiData)

    const data = {
      id_medida: 1,
      medida: json,
      grupo_medida: 'MI',
    }

    // Convertendo a string JSON de volta para um objeto
    const medidaObjeto = JSON.parse(data.medida);

    console.log(medidaObjeto);
    console.log(medidaObjeto.nome_medida);

    // Convertendo o objeto em um array de pares chave-valor
    const medidaArray = Object.entries(medidaObjeto);

    console.log(medidaArray);
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
              type="number"
              name="certificado_medida"
              placeholder="Certificado de Aprovação"
              onBlur={handleVerifyCA}
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
            <div className="px-3 pl-8">
              <button className="shadow mt-4 bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={teste}>
                Teste
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CadastroEpi;