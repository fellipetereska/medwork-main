import React from "react";
import { Link } from "react-router-dom";

import Back from '../../../layout/Back'
import useAuth from '../../../../hooks/useAuth'
import LinkScreen from "./LinkScreen";

function Vinculos() {
  return (
    <>
      <div className="flex justify-center items-center mt-12 mb-10">
        {/* Botão para voltar */}
        <div className="absolute left-0">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>
        <h1 className="text-3xl font-extrabold text-sky-700">Vínculos</h1>
      </div>
      <LinkScreen />
    </>
  )
}

export default Vinculos;