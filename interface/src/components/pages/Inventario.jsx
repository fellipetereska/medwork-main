import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import FrmInventario from "./subPages/InventarioRisco/FrmInventario";
import GridInventario from "./subPages/InventarioRisco/GridInventario";

function Inventario() {

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
  }, [companyId]);

  const handleEdit = (selectedInventario) => {
    setOnEdit(selectedInventario);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-12 mb-10">
        <h1 className="text-3xl font-extrabold text-sky-700">Inventário de Riscos</h1>
      </div>

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
      />
    </>
  )
}

export default Inventario;