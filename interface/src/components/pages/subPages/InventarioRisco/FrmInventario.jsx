import React from "react";

function FrmInventario({ nameCompany }) {
  return (
    <>
      <div className="flex w-full">
        <div className="max-w-xl">
          <h1>{nameCompany}</h1>
        </div>
      </div>
    </>
  );
}

export default FrmInventario;