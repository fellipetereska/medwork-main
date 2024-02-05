import React from "react";

import { BsFillPencilFill } from 'react-icons/bs';

function GridInventario({
  setOnEdit,
  inventario,
  unidade,
  setor,
  processo,
  risco,
  companyId
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

  const convertMedidas = (item) => {
    try {
      const medidasArray = JSON.parse(item);
      return (
        <ul>
          {medidasArray.map(({ nome, tipo }, index) => (
            <li key={index}><span className="font-semibold">{index}</span>{`- ${nome}.`}</li>
          ))}
        </ul>
      );
    } catch (error) {
      console.error("Erro ao converter medidas:", error);
      return 'N/A';
    }
  };

  const filteredInventario = inventario.filter((i) => i.fk_empresa_id === companyId)

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
                  Processo
                </th>
                <th scope="col" className="px-4 py-2">
                  Risco
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Tipo
                </th>
                <th scope="col" className="px-4 py-2">
                  Consequência
                </th>
                <th scope="col" className="px-4 py-2">
                  Fontes
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Pessoas Expostas
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Avaliação
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Medição
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Limite de Tolerância
                </th>
                <th scope="col" className="px-4 py-2">
                  Metodologia
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Medidas
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Probabilidade
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Severidade
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Nível
                </th>
                <th scope="col" className="px-4 py-2">
                  Comentários
                </th>
                <th scope="col" className="px-4 py-2">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {inventario && filteredInventario.map((item, i) => (
                <tr
                  key={i}
                  className={`bg-white border-b`}
                >
                  <th scope="row" className="px-4 py-2 text-gray-800 text-center">
                    {item.id_inventario}
                  </th>
                  <th className="px-4 py-2 text-gray-800 text-center">
                    {formatData(item.data_inventario)}
                  </th>
                  <th className="px-4 py-2 text-gray-800 whitespace-normal min-w-[150px]">
                    {find(item.fk_unidade_id, 'nome_unidade')}
                  </th>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[150px]">
                    {find(item.fk_setor_id, 'nome_setor')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[200px]">
                    {find(item.fk_processo_id, 'descricao_processo')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[200px]">
                    {find(item.fk_risco_id, 'nome_risco')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[50px] text-center">
                    {find(item.fk_risco_id, 'grupo_risco')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[100px]">
                    {find(item.fk_risco_id, 'consequencia')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[100px]">
                    {item.fontes}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[100px] text-center">
                    {item.pessoas_expostas}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[100px] text-center">
                    {find(item.fk_risco_id, 'avaliacao')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[50px] text-center">
                    {item.medicao}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[100px] text-center">
                    {find(item.fk_risco_id, 'limite_tolerancia')} {find(item.fk_risco_id, 'unidade_medida')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[100px] text-center">
                    {find(item.fk_risco_id, 'metodologia')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 hyphens-auto text-justify whitespace-normal min-w-[300px]">
                    {convertMedidas(item.medidas)}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[50px] text-center">
                    {item.probabilidade}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[50px] text-center">
                    {find(item.fk_risco_id, 'severidade')}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[100px] text-center">
                    {item.nivel}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-normal min-w-[200px]">
                    {item.comentarios}
                  </td>
                  <td className="py-4 gap-4">
                    <a className="flex justify-center font-medium text-blue-400 cursor-not-allowed">
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

export default GridInventario;