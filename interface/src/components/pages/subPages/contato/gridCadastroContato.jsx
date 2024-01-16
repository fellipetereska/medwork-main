import { BsFillPencilFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { connect } from '../../../../services/api';

function GridCadastroContato({ contato, setContato, setOnEdit }) {

  const handleEditClick = (empresa) => () => {
    handleEdit(empresa);
  };
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  // const handleDesactivation = async (id, ativo) => {
  //   try {
  //     // Inverte o estado ativo localmente
  //     const novoContato = contato.map(item =>
  //       item.id_contato === id ? { ...item, ativo: !ativo } : item
  //     );
  //     setContato(novoContato);

  //     // Atualiza o estado no banco de dados
  //     const { error } = await supabase
  //       .from("contato")
  //       .upsert([{ id_contato: id, ativo: !ativo }]);

  //     if (error) {
  //       // Se houver um erro na atualização do banco de dados, reverte o estado local
  //       setContato(contato.map(item =>
  //         item.id_contato === id ? { ...item, ativo } : item
  //       ));
  //       throw new Error(error.message);
  //     }

  //     toast.info(`Contato ${!ativo ? 'ativado' : 'inativado'} com sucesso`);
  //   } catch (error) {
  //     console.log("Erro ao atualizar status do contato", error);
  //     toast.error("Erro ao atualizar status do contato, verifique o console");
  //   }
  // };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Telefone
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Email Secundario
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Ações
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Inativo?
            </th>
          </tr>
        </thead>
        <tbody>
          {contato.map((item, i) => (
            <tr key={i} className={`border-b bg-white ${!item.ativo ? 'opacity-25' : ''}`}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_contato}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.nome_contato}
              </th>
              <td className="px-6 py-4">
                {item.telefone_contato}
              </td>
              <td className="px-6 py-4">
                {item.email_contato}
              </td>
              <td className="px-6 py-4">
                {item.email_secundario_contato}
              </td>
              <td className="py-4 gap-4">
                <a className="flex justify-center font-medium text-blue-400 hover:text-blue-800">
                  <BsFillPencilFill onClick={handleEditClick(item)} />
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
                    // onChange={() => handleDesactivation(item.id_contato, item.ativo)}
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

export default GridCadastroContato;
