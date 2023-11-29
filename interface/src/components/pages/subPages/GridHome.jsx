import { BsBoxArrowDown } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { supabase } from '../../../services/api';
import { toast } from 'react-toastify';

function GridHome({ empresas }) {

  //Instanciando o id da Empresa
  const [contatos, setContatos] = useState([]);
  const { selectCompany } = useAuth();

  const navigate = useNavigate();
  const { empresa } = useAuth();

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        const { data } = await supabase.from("contato").select();
        setContatos(data);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    };

    fetchContatos();
  }, []);

  const findContactName = (fkContatoId) => {
    const contato = contatos.find((c) => c.id_contato === fkContatoId);
    return contato ? contato.nome_contato : 'N/A';
  };

  const handleOpenCompany = async (id) => {
    if (!id) {
      toast.warn("Selecione uma Empresa!");
      return;
    }

    try {
      await selectCompany(id);
      toast.success(`Empresa ${empresa.nome_empresa} Selecionada!`)
      navigate('/cadastros')
    } catch (error) {
      console.log(error);
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
                <a className={`font-medium text-blue-600 hover:text-blue-800 ${item.ativo ? 'cursor-pointer' : ''}`}>
                  <BsBoxArrowDown onClick={() => item.ativo && handleOpenCompany(item.id_empresa)} />
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
