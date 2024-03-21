import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import FrmInventario from "./subPages/InventarioRisco/FrmInventario";
import GridInventario from "./subPages/InventarioRisco/GridInventario";

function Inventario() {

  const {
    loadSelectedCompanyFromLocalStorage, companyId, selectedCompany,
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
    getAparelhos, aparelhos,
    getConclusoes, conclusoes, getConclusaoInventario, conclusaoInventario,
  } = useAuth(null);

  const [onEdit, setOnEdit] = useState(null);
  const [nameCompany, setNameCompany] = useState(null);

  useEffect(() => {
    loadSelectedCompanyFromLocalStorage();
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
    getAparelhos();
    getConclusoes();
    getConclusaoInventario();
  }, [companyId]);


  return (
    <>
      <FrmInventario
        unidades={unidades}
        cargos={cargos}
        setores={setores}
        setSetores={setSetores}
        processos={processos}
        riscos={riscos}
        setoresProcessos={setoresProcessos}
        processosRiscos={processosRiscos}
        onEdit={onEdit}
        companyId={companyId}
        setOnEdit={setOnEdit}
        riscosMedidas={riscosMedidas}
        medidasAdm={medidasAdm}
        medidasEpi={medidasEpi}
        medidasEpc={medidasEpc}
        getGlobalSprm={getGlobalSprm}
        setGlobalSprm={setGlobalSprm}
        globalSprm={globalSprm}
        getGlobalSprmByRiscoId={getGlobalSprmByRiscoId}
        getInventario={getInventario}
        aparelhos={aparelhos}
        inventario={inventario}
        conclusoes={conclusoes}
        conclusaoInventario={conclusaoInventario}
      />

      <GridInventario
        setOnEdit={setOnEdit}
        inventario={inventario}
        unidade={unidades}
        setor={setores}
        processo={processos}
        risco={riscos}
        companyId={companyId}
        companyName={nameCompany}
        aparelhos={aparelhos}
      />
    </>
  )
}

export default Inventario;