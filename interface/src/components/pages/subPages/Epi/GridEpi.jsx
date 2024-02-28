import { BsFillPencilFill } from 'react-icons/bs';

function GridCadastroEpi({ epis, setOnEdit }) {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const formatarData = (data) => {
    if (!data || data === '0000/00/00') {
      return 'N/A';
    }

    const dataFormatada = new Date(data);
    return isNaN(dataFormatada.getTime()) ? 'N/A' : dataFormatada.toLocaleDateString();
  }

  const diasRestantesCertificado = (dataExpiracao) => {
    if (!dataExpiracao || dataExpiracao === '0000/00/00') {
      return 'N/A';
    }

    const dataExpiracaoDate = new Date(dataExpiracao);
    if (isNaN(dataExpiracaoDate.getTime())) {
      return 'N/A';
    }

    const hoje = new Date();
    const diferencaMilissegundos = dataExpiracaoDate - hoje;
    const umDia = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
    const diasRestantes = Math.floor(diferencaMilissegundos / umDia);

    if (diasRestantes < 0) {
      return 'Vencido';
    }

    const anos = Math.floor(diasRestantes / 365);
    const meses = Math.floor((diasRestantes % 365) / 30);
    const dias = diasRestantes % 30;

    let resultado = '';
    if (anos > 0) {
      resultado += `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    }
    if (meses > 0) {
      resultado += ` ${resultado.length > 0 ? ', ' : ''}${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    }
    if (dias > 0) {
      resultado += ` ${resultado.length > 0 ? 'e ' : ''}${dias} ${dias === 1 ? 'dia' : 'dias'}`;
    }

    return resultado.length > 0 ? resultado : 'Vence hoje';
  }


  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              ID
            </th>
            <th scope="col" className="px-4 py-3">
              EPI
            </th>
            <th scope="col" className="px-4 py-3">
              Certificação
            </th>
            <th scope="col" className="px-4 py-3">
              Data
            </th>
            <th scope="col" className="px-4 py-3">
              Vencimento
            </th>
            <th scope="col" className="px-4 py-3">
              Fabricante
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {epis.map((item, i) => (
            <tr key={i} className={`border-b bg-white`}>
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_medida}
              </th>
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.nome_medida}
              </th>
              <td className="px-4 py-4">
                {item.certificado_medida}
              </td>
              <th className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {formatarData(item.vencimento_certificado_medida)}
              </th>
              <th className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {diasRestantesCertificado(item.vencimento_certificado_medida)}
              </th>
              <td className="px-4 py-4">
                {item.fabricante_medida}
              </td>
              <td className="px-5 py-4 gap-4">
                <a className="flex justify-center font-medium text-blue-400 hover:text-blue-800 cursor-pointer">
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

export default GridCadastroEpi;