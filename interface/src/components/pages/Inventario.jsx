import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import FrmInventario from "./subPages/InventarioRisco/FrmInventario";
import GridInventario from "./subPages/InventarioRisco/GridInventario";

function Inventario() {

    const {
        handleSetCompanyId, companyId, selectedCompany,
        getUnidades, unidades,
        getSetores, setores,
        getCargos, cargos,
        getProcessos, processos,
        getRiscos, riscos,
        getMedidasAdm, medidasAdm, getMedidasEpi, medidasEpi, getMedidasEpc, medidasEpc,
    } = useAuth(null);

    const [nameCompany, setNameCompany] = useState(null);


    useEffect(() => {
        handleSetCompanyId();
    }, [])

    useEffect(() => {
        setNameCompany(selectedCompany[0]?.nome_empresa)
    }, [companyId])

    return (
        <>
            <div className="flex justify-center items-center mt-12 mb-10">
                <h1 className="text-3xl font-extrabold text-sky-700">Inventário de Riscos</h1>
            </div>

            {/* <FrmInventario
                nameCompany={nameCompany}
            /> */}

            <GridInventario />
        </>
    )
}

export default Inventario;