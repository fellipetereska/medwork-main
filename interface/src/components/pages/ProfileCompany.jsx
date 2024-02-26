import React, { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";
import { IoCloseOutline } from "react-icons/io5";

function ProfileCompany() {

  //Instanciando as variaveis
  const { user,
    loadSelectedCompanyFromLocalStorage, selectedCompany, companyId,
    getEmpresas, empresas,
    getContatos, contatos,
    getUnidades, unidades,
    getSetores, setores,
    getCargos, cargos,
    getProcessos, processos, getSetoresProcessos, setoresProcessos, getProcessosRiscos, processosRiscos, getRiscosMedidas, riscosMedidas,
    getRiscos, riscos,
    getMedidasAdm, medidasAdm,
    getMedidasEpi, medidasEpi,
    getMedidasEpc, medidasEpc,
  } = useAuth();

  const [showSetores, setShowSetores] = useState(false);
  const [showSetorData, setShowSetorData] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [companyCnpj, setCompanyCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [contactMail, setContactMail] = useState('');
  const [unidadesData, setUnidadesData] = useState([]);
  const [contatoUnidade, setContatoUnidade] = useState('');
  const [setoresData, setSetoresData] = useState([]);
  const [cargosData, setCargosData] = useState([]);
  const [processosData, setProcessosData] = useState([]);
  const [riscosData, setRiscosData] = useState([]);
  const [medidasData, setMedidasData] = useState([]);

  useEffect(() => {
    loadSelectedCompanyFromLocalStorage();
  }, []);

  useEffect(() => {
    getEmpresas();
    getContatos();
    getUnidades();
    getSetores();
    getCargos();
    getProcessos();
    getSetoresProcessos();
    getProcessosRiscos();
    getRiscosMedidas();
    getRiscos();
    getMedidasAdm();
    getMedidasEpi();
    getMedidasEpc();
    handleSetProfile();
  }, [companyId]);

  const handleSetProfile = () => {
    try {
      const companyInfo = empresas.find((i) => i.id_empresa === companyId);
      if (companyInfo) {
        setCompanyName(companyInfo.nome_empresa);
        setRazaoSocial(companyInfo.razao_social);
        setCompanyCnpj(companyInfo.cnpj_empresa);

        const filteredContatos = contatos.find((i) => i.id_contato === companyInfo.fk_contato_id);

        if (filteredContatos) {
          setContato(filteredContatos.nome_contato);
          setContactMail(filteredContatos.email_contato);
        } else {
          console.error('Nenhum contato encontrado para a empresa: ', companyName);
        }

        const contatosUnidades = {};

        unidades.forEach((unidade) => {
          const filteredContatoUnidade = contatos.find((contato) => contato.id_contato === unidade.fk_contato_id);
          if (filteredContatoUnidade) {
            contatosUnidades[unidade.id_unidade] = filteredContatoUnidade.nome_contato;
          } else {
            console.error('Nenhum contato encontrado para a unidade: ', unidade.nome_unidade);
          }
        });

        setContatoUnidade(contatosUnidades);

      } else {
        console.error("Erro ao buscar os dados da empresa do id: ", companyId)
      }
    } catch (error) {
      console.log("Erro ao buscar dados do profile!", error)
    }
  };

  const handleSetSetores = (item) => {
    setShowSetores(true);
    const filteredSetores = setores.filter((i) => i.fk_unidade_id === item);

    if (filteredSetores) {
      setSetoresData(filteredSetores);
    } else {
      console.error("Nenhum setor encontrado para as unidades filtradas.");
    }
  }

  const handleSetSetoresData = (item) => {
    setShowSetorData(prevState => ({ ...prevState, [item]: !prevState[item] }));

    const filteredCargos = cargos.filter((i) => i.fk_setor_id === item);
    setCargosData(filteredCargos);

    const setfilter = setoresProcessos.find((i) => i.fk_setor_id === item);

    if (setfilter) {
      const filteredProcesso = processos.filter((i) => i.id_processo === setfilter.fk_processo_id);

      if (filteredProcesso) {
        setProcessosData(filteredProcesso);

        const riscFilter = processosRiscos.find((i) => i.fk_processo_id === filteredProcesso[0]?.id_processo);

        if (riscFilter) {
          const filteredRiscos = riscos.filter((i) => i.id_risco === riscFilter.fk_risco_id);
          setRiscosData(filteredRiscos);

          const medFilter = riscosMedidas.find((i) => i.fk_risco_id === riscFilter.fk_risco_id);
          
          if (medFilter) {
            const filteredMedidas = medidasAdm.filter((i) => i.id_medida_adm === medFilter.fk_medida_id);
            setMedidasData(filteredMedidas)
            console.log(filteredMedidas)
          }

        } else {
          console.error("Nenhum risco encontrado para o processo: ", filteredProcesso);
        }
      } else {
        console.error("Nenhum processo encontrado para o setor: ", item);
      }
    } else {
      console.error("Nenhum filtro de setor-processo encontrado para o setor: ", item);
    }
  }


  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl bg-white overflow-hidden">

          {/* Company Infos */}
          <div className='w-full bg-sky-600 shadow-md px-4 py-4 rounded-xl mb-4'>
            <div className='px-4 mt-2 grid grid-cols-3'>
              <div className='col-span-2'>
                <h2 className='text-white font-extrabold text-2xl truncate'>{companyName}</h2>
                <p className='text-white font-light text-sm truncate'>Razão Social: <span className="text-lg font-medium truncate">{razaoSocial}</span></p>
                <p className='text-white'>Contato:</p>
                <div className='bg-white w-2/4 rounded-sm px-2 py-1 text-center grid grid-cols-2 justify-center items-center gap-2'>
                  <p className='text-sky-600 font-semibold truncate text-right'>{contato}</p>
                  <p className='text-sm text-gray-700 font-light truncate text-left'>- {contactMail}</p>
                </div>
              </div>
              <div className='col-span-1 text-right'>
                <h2 className='text-white font-extrabold text-2xl truncate'>{companyCnpj}</h2>
              </div>
            </div>
          </div>

          {/* Company Data */}
          <div className='w-full px-8 py-4'>
            <div className='w-full grid grid-cols-3 gap-6'>

              {/* Unidades */}
              <div className='col-span-1'>
                <ul className='space-y-4'>
                  {unidades.map((item) => (
                    <li key={item.id_unidade} onClick={() => handleSetSetores(item.id_unidade)}>
                      <div className='bg-gray-50 rounded-md px-4 py-2 hover:bg-gray-100 shadow-sm cursor-pointer'>
                        <div className='grid grid-cols-2 '>
                          <div className='col-span-1'>
                            <h2 className='text-sky-600 font-extrabold text-lg truncate'>{item.nome_unidade}</h2>
                          </div>
                          <div className='col-span-1 text-right'>
                            <h2 className='text-sky-600 font-extrabold text-lg truncate'>{item.cnpj_unidade}</h2>
                          </div>
                        </div>
                        <div className='border-b border-gray-200 mb-2'></div>
                        <p className='truncate text-gray-700'>{item.endereco_unidade}</p>
                        <p className='truncate text-gray-600'>{item.cep_unidade} - {item.cidade_unidade}/{item.uf_unidade}</p>
                        {contatoUnidade[item.id_unidade] && (
                          <>
                            <p className='truncate text-gray-600 text-sm'>Contato: <span className='text-base font-bold text-gray-800'>{contatoUnidade[item.id_unidade]}</span></p>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Setores */}
              <div className='col-span-2 rounded-md px-4 py-2'>
                <div className='px-4 py-2'>
                  {showSetores ? (
                    <ul className='space-y-2'>
                      {setoresData.map((item) => (
                        <li key={item.id_setor} onClick={() => handleSetSetoresData(item.id_setor)}>
                          <div className='bg-gray-100 rounded-md px-4 py-2'>
                            <div>
                              <h2 className='text-sky-600 font-bold text-xl'>{item.nome_setor}</h2>
                              <p className='truncate font-light'>{item.ambiente_setor}</p>
                            </div>
                            {showSetorData[item.id_setor] ? (
                              <>
                                <div>
                                  <div className='border-b border-gray-200 mb-4'></div>
                                  <div className='grid grid-cols-4 gap-4'>
                                    <div className='col-span-1'>
                                      <p>Cargos</p>
                                      <ul className='space-y-2'>
                                        {cargosData.map((item) => (
                                          <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm truncate'>{item.nome_cargo}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className='col-span-1'>
                                      <p>Processos</p>
                                      <ul className='space-y-2'>
                                        {processosData.map((item) => (
                                          <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm truncate hover:whitespace-normal'>{item.nome_processo}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className='col-span-1'>
                                      <p>Riscos</p>
                                      <ul className='space-y-2'>
                                        {riscosData.map((item) => (
                                          <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm truncate hover:whitespace-normal'>{item.nome_risco}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className='col-span-1'>
                                      <p>Medidas</p>
                                      <ul className='space-y-2'>
                                        {medidasData.map((item) => (
                                          <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm truncate hover:whitespace-normal'>{item.descricao_medida_adm}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (null)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (null)}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCompany;