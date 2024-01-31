import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Back from '../../../layout/Back'
import FrmCadastroContato from "./frmCadastroContato";
import GridCadastroContato from './gridCadastroContato'
import SearchInput from '../components/SearchInput'
import useAuth from '../../../../hooks/useAuth'

function CadastroContato() {

  const {contatos, setContatos, getContatos} = useAuth(null);

  // Instanciando e Definindo como vazio
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContato, setFilteredContato] = useState([]);

  const handleEdit = (selectedContato) => {
    setOnEdit(selectedContato)
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = contatos.filter((emp) => emp.nome_contato.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredContato(filtered);

    getContatos();
  }, [searchTerm, contatos]);

  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <div>
      <div className="tab-content mt-14">
        <div className="flex justify-center items-center">
          {/* Botão para voltar */}
          <div className="absolute left-0">
            <Link to="/cadastros">
              <Back />
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Contato</h1>
        </div>

        {/* Formulário */}
        <div className="mb-3">
          <FrmCadastroContato onEdit={onEdit} setOnEdit={setOnEdit} getContato={getContatos} />
        </div>

        < div className="flex justify-center w-full mb-3">
          <div className="w-3/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
          </div>
        </div>
        < GridCadastroContato
          contato={filteredContato}
          setContato={setContatos}
          setOnEdit={handleEdit}
          getContato={getContatos}
        />
      </div>
    </div >
  )
}

export default CadastroContato;
