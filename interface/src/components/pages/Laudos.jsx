import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth'

import BotaoPgr from '../pages/subPages/buttons/Laudos/BotaoGerarPgr'
import BotaoLtcat from '../pages/subPages/buttons/Laudos/BotaoGerarLtcat'
import BotaoLip from '../pages/subPages/buttons/Laudos/BotaoGerarLip'

function Laudos() {

  const { loadSelectedCompanyFromLocalStorage, companyId } = useAuth(null);

  useEffect(() => {
    loadSelectedCompanyFromLocalStorage();
  }, [companyId])

  return (
    <>
      <div className="mt-16 md:px-28 px-12 mb-12 md:mb-32 lg:px-12">
        <div className="grid xl:grid-cols-5 lg:grid-cols-3 gap-6 bg-white">
          {companyId ? (
            <>
              <figure className="flex flex-col justify-center">
                <Link to="/gerar_pgr">
                  <BotaoPgr />
                </Link>
              </figure>
              <figure className="flex flex-col justify-center">
                <Link to="/gerar_ltcat">
                  <BotaoLtcat />
                </Link>
              </figure>
              <figure className="flex flex-col justify-center">
                <Link to="/gerar_lip">
                  <BotaoLip />
                </Link>
              </figure>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Laudos;