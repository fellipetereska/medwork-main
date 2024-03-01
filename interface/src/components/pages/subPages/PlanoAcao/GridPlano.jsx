import React from "react";

import { BsFillPencilFill } from 'react-icons/bs';

function GridPlano({
  setOnEdit,
  unidade,
  setor,
  processo,
  risco,
  companyId,
  plano,
  medidasAdm, medidasEpi, medidasEpc,
}) {

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 'nome_unidade':
          const unidadeEncontrada = unidade.find((c) => c.id_unidade === item);
          return unidadeEncontrada ? unidadeEncontrada.nome_unidade : 'N/A';

        case 'nome_setor':
          const setorEncontrado = setor.find((c) => c.id_setor === item);
          return setorEncontrado ? setorEncontrado.nome_setor : 'N/A';

        case 'descricao_processo':
          const processoEncontrado = processo.find((c) => c.id_processo === item);
          return processoEncontrado ? processoEncontrado.descricao : 'N/A';

        case 'nome_risco':
        case 'grupo_risco':
        case 'consequencia':
        case 'avaliacao':
        case 'limite_tolerancia':
        case 'metodologia':
        case 'severidade':
        case 'unidade_medida':
          const riscoEncontrado = risco.find((c) => c.id_risco === item);
          if (riscoEncontrado) {
            switch (tipo) {
              case 'nome_risco':
                return riscoEncontrado.nome_risco;
              case 'grupo_risco':
                return riscoEncontrado.grupo_risco;
              case 'consequencia':
                return riscoEncontrado.danos_saude_risco;
              case 'avaliacao':
                return riscoEncontrado.classificacao_risco;
              case 'limite_tolerancia':
                return riscoEncontrado.limite_tolerancia_risco;
              case 'metodologia':
                return riscoEncontrado.metodologia_risco;
              case 'severidade':
                return riscoEncontrado.severidade_risco;
              case 'unidade_medida':
                return riscoEncontrado.unidade_medida_risco;
            }
          } else {
            return 'N/A';
          }
        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const findMedidas = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 1:
          const admMedidas = medidasAdm.find((i) => i.id_medida_adm === item);
          return admMedidas ? admMedidas.descricao_medida_adm : 'N/A';
        case 2:
          const epiMedidas = medidasEpi.find((i) => i.id_medida === item);
          return epiMedidas ? epiMedidas.nome_medida : 'N/A';
        case 3:
          const epcMedidas = medidasEpc.find((i) => i.id_medida === item);
          return epcMedidas ? epcMedidas.descricao_medida : 'N/A';

        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const handleEditClick = (item) => () => {
    handleEdit(item);
  };

  //Função para editar Item
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const formatData = (item) => {
    const data_formatada = new Date(item).toLocaleDateString('pr-BR');
    return data_formatada;
  }

  const filteredPlano = plano.filter((i) => i.fk_empresa_id === companyId)

  return (
    <>
      <div className="w-full">
        <div className="w-11/12 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full table-auto text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-2 text-center">
                  ID
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Data
                </th>
                <th scope="col" className="px-4 py-2">
                  Unidade
                </th>
                <th scope="col" className="px-4 py-2">
                  Setor
                </th>
                <th scope="col" className="px-4 py-2">
                  Responsável
                </th>
                <th scope="col" className="px-4 py-2">
                  Processo
                </th>
                <th scope="col" className="px-4 py-2">
                  Risco
                </th>
                <th scope="col" className="px-4 py-2">
                  Medida
                </th>
                <th scope="col" className="px-4 py-2">
                  Prazo
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Data de Conclusão
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Status
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {plano && filteredPlano.map((item, i) => (
                <tr
                  key={i}
                  className={`bg-white border-b`}
                >
                  <th scope="row" className="px-4 py-2 text-gray-800 text-center">
                    {item.id_plano}
                  </th>
                  <th className="px-4 py-2 text-gray-800 text-center">
                    {formatData(item.data)}
                  </th>
                  <th className="px-4 py-2 text-gray-800 whitespace-normal">
                    {find(item.fk_unidade_id, 'nome_unidade')}
                  </th>
                  <th className="px-4 py-2 text-gray-800 whitespace-normal">
                    {find(item.fk_setor_id, 'nome_setor')}
                  </th>
                  <th className="px-4 py-2 text-gray-800 whitespace-normal text-center">
                    {item.responsavel}
                  </th>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal">
                    {find(item.fk_processo_id, 'descricao_processo')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal">
                    {find(item.fk_risco_id, 'nome_risco')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 hyphens-auto text-justify whitespace-normal">
                    {findMedidas(item.fk_medida_id, item.tipo_medida)}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal text-center">
                    {item.prazo}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal text-center">
                    {item.data_conclusao}
                  </td>
                  <td className="px-4 py-2 text-gray-800 text-center">
                    {item.status}
                  </td>
                  <td className="py-4 gap-4">
                    <a className="flex justify-center font-medium text-blue-400 cursor-pointer hover:text-sky-600">
                      <BsFillPencilFill
                        onClick={handleEditClick(item)}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default GridPlano;