import React, { useState } from "react";
import { Link } from "react-router-dom";

import Back from '../../../layout/Back'
import LinkScreen from "./LinkScreen";
import NavLinked from "../../../layout/NavLinked";

function Vinculos() {

  const [navValue, setNavValue] = useState(0);

  const handleSelectedLinked = (item) => {
    setNavValue(item)
  }

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
      <div className="flex justify-center px-12">
        <NavLinked 
          select={handleSelectedLinked}
        />
      </div>
      <LinkScreen 
        selected={navValue}
        setNavValue={setNavValue}
      />
    </>
  )
}

export default Vinculos;