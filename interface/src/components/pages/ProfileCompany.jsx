import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import { IoCloseCircleOutline } from "react-icons/io5";

function ProfileCompany({ isOpen, onCancel, companyName, companyCnpj, razaoSocial, contato, contactMail, contatoUnidade }) {

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
  const [setoresData, setSetoresData] = useState([]);
  const [cargosData, setCargosData] = useState([]);
  const [processosData, setProcessosData] = useState([]);
  const [riscosData, setRiscosData] = useState([]);
  const [medidasData, setMedidasData] = useState([]);

  useEffect(() => {
    loadSelectedCompanyFromLocalStorage();
  }, []);

  if (isOpen) {
    getUnidades();
  }

  const handleSetSetores = (item) => {
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
    setShowSetores(true);
    const filteredSetores = setores.filter((i) => i.fk_unidade_id === item);

    if (filteredSetores) {
      setSetoresData(filteredSetores);
    } else {
      console.error("Nenhum setor encontrado para as unidades filtradas.");
    }
  }

  const handleSetSetoresData = async (item) => {
    setShowSetorData(prevState => ({ ...prevState, [item]: !prevState[item] }));

    const filteredSetores = setoresData.map((i) => i.id_setor);

    const filteredCargos = cargos.filter((cargo) =>
      filteredSetores.includes(cargo.fk_setor_id)
    );

    const cargosFilter = filteredCargos.filter((i) => i.fk_setor_id === item);

    setCargosData(cargosFilter);

    const setfilter = setoresProcessos.filter((i) => i.fk_setor_id === item);
    const setMap = setfilter.map((i) => i.fk_processo_id);

    if (setMap) {
      const filteredProcesso = processos.filter((i) =>
        setMap.includes(i.id_processo)
      );

      if (filteredProcesso) {
        setProcessosData(filteredProcesso);

        const procMap = filteredProcesso.map((i) => i.id_processo);

        const riscFilter = processosRiscos.filter((i) =>
          procMap.includes(i.fk_processo_id)
        );

        const filterRisc = riscFilter.map((i) => i.fk_risco_id);

        if (filterRisc) {
          const filteredRiscos = riscos.filter((i) =>
            filterRisc.includes(i.id_risco)
          );
          setRiscosData(filteredRiscos);

          const medFilter = riscosMedidas.filter((i) =>
            filterRisc.includes(i.fk_risco_id)
          );

          const medData = medFilter.map(({ fk_medida_id, tipo }) => ({
            fk_medida_id,
            tipo
          }));

          const medidasFiltradas = await handleSetMedida(medData);

          setMedidasData(medidasFiltradas)
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

  const handleSetMedida = async (data) => {
    const medidasFiltradas = [];

    data.forEach((item) => {
      const { fk_medida_id, tipo } = item;

      let medidaFiltrada;

      switch (tipo) {
        case 1:
          medidaFiltrada = medidasAdm.find((medida) => medida.id_medida_adm === fk_medida_id);
          if (medidaFiltrada) medidasFiltradas.push(medidaFiltrada);
          break;
        case 2:
          medidaFiltrada = medidasEpi.find((medida) => medida.id_medida === fk_medida_id);
          if (medidaFiltrada) medidasFiltradas.push(medidaFiltrada);
          break;
        case 3:
          medidaFiltrada = medidasEpc.find((medida) => medida.id_medida === fk_medida_id);
          if (medidaFiltrada) medidasFiltradas.push(medidaFiltrada);
          break;
        default:
          break;
      }
    })

    return medidasFiltradas;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
        <div className="modal-container w-5/6 mx-auto rounded-xl z-50 bg-white overflow-y-auto max-h-[90vh]">

          {/* Company Infos */}
          <div className='w-full bg-sky-600 shadow-md px-4 py-4 rounded-xl mb-4'>
            <div className="flex justify-end text-gray-200 w-full">
              <div className=" rounded-full hover:text-white cursor-pointer hover:scale-110">
                <IoCloseCircleOutline
                  onClick={onCancel}
                />
              </div>
            </div>
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
              <div className='col-span-1 text-right px-2'>
                <h2 className='text-white font-extrabold text-2xl truncate'>{companyCnpj}</h2>
              </div>
            </div>
          </div>

          {/* Company Data */}
          <div className='w-full py-4 px-8 mb-4'>
            <div className='w-full grid grid-cols-3 gap-6'>

              {/* Unidades */}
              <div className='col-span-1'>
                <ul className='space-y-4'>
                  {unidades.map((item) => (
                    <li key={item.id_unidade} onClick={() => handleSetSetores(item.id_unidade)}>
                      <div className='bg-gray-50 rounded-md px-4 py-2 hover:bg-gray-100 shadow-sm cursor-pointer'>
                        <div className='grid grid-cols-2 items-center'>
                          <div className='col-span-1'>
                            <h2 className='text-sky-600 font-extrabold text-lg truncate'>{item.nome_unidade}</h2>
                          </div>
                          <div className='col-span-1 text-right'>
                            <h2 className='text-sky-600 font-extrabold truncate'>{item.cnpj_unidade}</h2>
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
              <div className='col-span-2 rounded-md'>
                <div className=''>
                  {showSetores ? (
                    <ul className='space-y-2'>
                      {setoresData.map((item) => (
                        <li key={item.id_setor} onClick={() => handleSetSetoresData(item.id_setor)}>
                          <div className='bg-gray-100 hover:bg-gray-50 rounded-md px-4 py-2'>
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
                                          <li key={item.id_cargo} className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm truncate hover:whitespace-normal'>
                                            {item.nome_cargo}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className='col-span-1'>
                                      <p>Processos</p>
                                      <ul className='space-y-2'>
                                        {processosData.map((item) => (
                                          <li key={item.id_processo} className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm truncate hover:whitespace-normal'>
                                            {item.nome_processo}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className='col-span-1'>
                                      <p>Riscos</p>
                                      <ul className='space-y-2'>
                                        {riscosData.map((item) => (
                                          <li key={item.id_risco} className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm truncate hover:whitespace-normal'>
                                            {item.nome_risco}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className='col-span-1'>
                                      <p>Medidas</p>
                                      <ul className='space-y-2'>
                                        {medidasData.map((item, index) => {
                                          const key = item.id_medida_adm !== undefined
                                            ? `${item.id_medida_adm}_${index}`
                                            : `${item.id_medida}_${index}`;

                                          return (
                                            <li key={key} className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm truncate hover:whitespace-normal'>
                                              {item.descricao_medida_adm || item.nome_medida || item.descricao_medida}
                                            </li>
                                          );
                                        })}
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