import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import GerarLaudo from "./subPages/components/GerarLaudo";

function Laudos() {

  const {
    handleSetCompanyId, companyId, selectedCompany,
    getUnidades, unidades,
    getSetores, setores, setSetores,
    getCargos, cargos,
    getProcessos, processos,
    getRiscos, riscos,
    getMedidasAdm, medidasAdm, getMedidasEpi, medidasEpi, getMedidasEpc, medidasEpc,
    getSetoresProcessos, setSetoresProcessos, setoresProcessos,
    getProcessosRiscos, setProcessosRiscos, processosRiscos,
    getRiscosMedidas, setRiscosMedidas, riscosMedidas,
    getInventario, inventario,
    getGlobalSprm, setGlobalSprm, globalSprm, getGlobalSprmByRiscoId,
    getPlano, setPlano, plano
  } = useAuth(null);
  const [onEdit, setOnEdit] = useState(null);
  const [nameCompany, setNameCompany] = useState(null);

  useEffect(() => {
    handleSetCompanyId();
  }, []);

  useEffect(() => {
    setNameCompany(selectedCompany[0]?.nome_empresa)
    getUnidades();
    getCargos();
    getSetores();
    getProcessos();
    getRiscos();
    getSetoresProcessos();
    getProcessosRiscos();
    getInventario();
    getRiscosMedidas();
    getMedidasAdm();
    getMedidasEpi();
    getMedidasEpc();
    getPlano();
  }, [companyId]);


  return (
    <>
      <GerarLaudo
        inventario={inventario}
        processos={processos}
        riscos={riscos}
        empresa={nameCompany}
        unidades={unidades}
        setores={setores}
        empresaId={companyId}
        plano={plano}
        medidasAdm={medidasAdm}
        medidasEpi={medidasEpi}
        medidasEpc={medidasEpc}
      />
    </>
  )
}

export default Laudos;