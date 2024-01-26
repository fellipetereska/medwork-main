import React from "react";

import icon_setor from '../media/icon_setor.svg'
import icon_processo from '../media/icon_processos.svg'
import icon_riscos from '../media/icon_riscos.svg'
import icon_medida from '../media/icon_medidas.svg'
import icon_seta from '../media/icon_seta.png'

function NavLinked({ select }) {

  return (
    <>
      <div className="w-full h-16 max-w-2xl bg-gray-100 rounded-full">
        <div className="grid h-full grid-cols-3 mx-auto">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 text-base"
            onClick={() => select(1)}
          >
            <div className="flex gap-2 items-center flex-col md:flex-row">
              <img className="h-8" src={icon_processo} alt="" />
              <img className="h-4" src={icon_seta} />
              <img className="h-8" src={icon_setor} />
            </div>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 text-base"
            onClick={() => select(2)}
          >
            <div className="flex gap-2 items-center flex-col md:flex-row">
              <img className="h-8" src={icon_riscos} />
              <img className="h-4" src={icon_seta} />
              <img className="h-8" src={icon_processo} alt="" />
            </div>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 text-base"
            onClick={() => select(3)}
          >
            <div className="flex gap-2 items-center flex-col md:flex-row">
              <img className="h-8" src={icon_medida} />
              <img className="h-4" src={icon_seta} />
              <img className="h-8" src={icon_riscos} alt="" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default NavLinked;