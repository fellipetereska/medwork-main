import React from "react";



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
            Setores/Processos
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 text-base"
            onClick={() => select(2)}
          >
            Processos/Riscos
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 text-base"
            onClick={() => select(3)}
          >
            Riscos/Medidas
          </button>
        </div>
      </div>
    </>
  );
}

export default NavLinked;