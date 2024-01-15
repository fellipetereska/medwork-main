import { toast } from 'react-toastify';
import { connect } from '../../../../services/api'; //Conexão com o banco de dados

import { BsFillPencilFill } from 'react-icons/bs';

function GridCadastroUnidade({ unidade, setUnidade, setOnEdit, contato, empresa }) {

  //Função para editar os campos
  const handleEdit = (unidade) => {
    setOnEdit(unidade);
  };

  //Função para encontrar o nome do contato
  const findContactName = (fkContatoId) => {
    if (!contato) {
      return 'N/A';
    }

    const contatos = contato.find((c) => c.id_contato === fkContatoId);
    return contatos ? contatos.nome_contato : 'N/A';
  };

  //Função para encontrar o nome da empresa
  const findEmpresaName = (fkEmpresaID) => {
    const company = empresa.find((c) => c.id_empresa === fkEmpresaID);
    return company ? company.nome_empresa : 'N/A';
  };

  // //Função para inativar uma empresa
  // const handleDesactivation = async (id, ativo) => {
  //   try {
  //     const novaUnidade = unidade.map(item =>
  //       item.id_unidade === id ? { ...item, ativo: !ativo } : item
  //     );
  //     setUnidade(novaUnidade);

  //     const { error } = await supabase
  //       .from("unidade")
  //       .upsert([{ id_unidade: id, ativo: !ativo }]);

  //     if (error) {
  //       setUnidade(unidade.map(item =>
  //         item.id_unidade === id ? { ...item, ativo } : item
  //       ));
  //       throw new Error(error.message);
  //     }

  //     toast.info(`Unidade ${!ativo ? 'ativada' : 'inativada'} com sucesso!`)

  //   } catch (error) {
  //     console.log("Erro ao atualizar status da unidade", error);
  //     toast.error("Erro ao atualizar status da unidade, verifique o console");
  //   }
  // };


  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              ID
            </th>
            <th scope="col" className="px-4 py-3">
              Unidade
            </th>
            <th scope="col" className="px-4 py-3">
              CNPJ
            </th>
            <th scope="col" className="px-4 py-3">
              Endereço
            </th>
            <th scope="col" className="px-4 py-3">
              Responsável
            </th>
            <th scope="col" className="px-4 py-3">
              Empresa
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Ações
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Inativa?
            </th>
          </tr>
        </thead>
        <tbody>
          {unidade.map((item, i) => (
            <tr
              key={i}
              className={`bg-white border-b ${!item.ativo ? 'opacity-25' : ''}`}
            >
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_unidade}
              </th>
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.nome_unidade}
              </th>
              <td className="px-4 py-4">
                {item.cnpj_unidade}
              </td>
              <td className="px-4 py-4">
                {item.endereco_unidade}
              </td>
              <th className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {findContactName(item.fk_contato_id)}
              </th>
              <th className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {findEmpresaName(item.fk_empresa_id)}
              </th>
              <td className="py-4 gap-4">
                <a className="flex justify-center font-medium text-blue-400 hover:text-blue-800">
                  <BsFillPencilFill onClick={() => handleEdit(item)} />
                </a>
              </td>
              <td className="py-4 gap-4 text-right">
                <label
                  className="relative flex items-center justify-center rounded-full cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!item.ativo}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-amber-500 checked:bg-amber-500 checked:before:bg-amber-500 hover:before:opacity-10"
                    // onChange={() => handleDesactivation(item.id_unidade, item.ativo)}
                  />
                  <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridCadastroUnidade;
