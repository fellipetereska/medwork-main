import { BsBoxArrowDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from '../../../services/api';
import { useState } from 'react';

function GridHome({ empresas, contato }) {

  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState([])

  const findContactName = (fkContatoId) => {
    const contatos = contato.find((c) => c.id_contato === fkContatoId);
    return contatos ? contatos.nome_contato : 'N/A';
  };

  const handleOpenCompany = async (id, nameCompany) => {
    const id_empresa = id;

    if (!id_empresa) {
      toast.warn("Erro ao selecionar empresa!");
      throw new Error("Erro ao selecionar empresa!");
    }

    try {
      const response = await fetch(`${connect}/selectCompany/${id_empresa}`);

      if (!response.ok) {
        throw new Error(`Erro ao selecionar empresa! Status: ${response.status}`);
      }

      const empresa = await response.json();
      setEmpresa(empresa);
      toast.success(`Empresa ${nameCompany} selecionada!`);

      const selectedCompanyData = {
        id_empresa: id_empresa,
        nome_empresa: nameCompany
      };
      localStorage.removeItem('selectedCompanyData')
      localStorage.setItem('selectedCompanyData', JSON.stringify(selectedCompanyData));
      navigate('/cadastros');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Empresa
            </th>
            <th scope="col" className="px-6 py-3">
              Razão Social
            </th>
            <th scope="col" className="px-6 py-3">
              CNPJ
            </th>
            <th scope="col" className="px-6 py-3">
              Contato
            </th>
            <th scope="col" className="flex justify-center px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((item, i) => (
            <tr
              key={i}
              className={`border-b bg-white ${item.ativo ? '' : 'opacity-25'}`}
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_empresa}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.nome_empresa}
              </th>
              <td className="px-6 py-4">
                {item.razao_social}
              </td>
              <td className="px-6 py-4">
                {item.cnpj_empresa}
              </td>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {findContactName(item.fk_contato_id)}
              </th>
              <td className="py-4 flex justify-center">
                <a className={`font-medium text-blue-600 hover:text-blue-800 ${item.ativo ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                  <BsBoxArrowDown
                    onClick={() => item.ativo && handleOpenCompany(item.id_empresa, item.nome_empresa)}
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridHome;
