import { BsFillPencilFill } from 'react-icons/bs';

function GridProcesso({ processos, setProcesso, setOnEdit, setor, cargo}) {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const findSetor = (fkSetorId) => {
    if (!setor) {
      return 'N/A';
    }

    const setorInfo = setor.find((c) => c.id_setor === fkSetorId);
    return setorInfo ? setorInfo.nome_setor : 'N/A';
  };

  const findCargo = (fkCargoId) => {
    if (!cargo) {
      return 'N/A';
    }

    const cargoInfo = cargo.find((c) => c.id_cargo === fkCargoId);
    return cargoInfo ? cargoInfo.nome_cargo : 'N/A';
  };


  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              ID
            </th>
            <th scope="col" className="px-4 py-3">
              Processo
            </th>
            <th scope="col" className="px-4 py-3">
              Descrição
            </th>
            <th scope="col" className="px-4 py-3">
              Setor
            </th>
            <th scope="col" className="px-4 py-3">
              Cargo
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {processos.map((item, i) => (
            <tr key={i} className="border-b bg-white">
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_processo}
              </th>
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.nome_processo}
              </th>
              <td className="px-4 py-4">
                {item.descricao}
              </td>
              <td className="px-4 py-4">
                {findSetor(item.fk_setor_id)}
              </td>
              <td className="px-4 py-4">
                {findCargo(item.fk_cargo_id)}
              </td>
              <td className="px-5 py-4 gap-4">
                <a className="flex justify-center font-medium text-blue-400 hover:text-blue-800">
                  <BsFillPencilFill onClick={() => handleEdit(item)} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridProcesso;
