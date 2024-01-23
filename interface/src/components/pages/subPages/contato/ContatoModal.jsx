import React from "react";
import Form from './frmCadastroContato'
import useAuth from '../../../../hooks/useAuth'

function ContatoModal({ isOpen, Oncancel }) {

  const { getContatos } = useAuth();

  if (!isOpen) {
    return null
  }

  return (
    <div>
      <Form
        getContato={getContatos}
      />
    </div>
  )
}

export default ContatoModal;
