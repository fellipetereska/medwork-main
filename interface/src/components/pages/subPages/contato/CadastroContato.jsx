import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from '../../../../services/api'

import Back from '../../../layout/Back'
import FrmCadastroContato from "./frmCadastroContato";
import GridCadastroContato from './gridCadastroContato'
import SearchInput from '../components/SearchInput'

function CadastroContato() {

  // Instanciando e Definindo como vazio
  const [contato, setContato] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContato, setFilteredContato] = useState([]);


  // Pegando os dados do banco
  const getContato = async () => {
    try {
      const response = await fetch(`${connect}/contatos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Contatos. Status: ${response.status}`);
      }

      const data = await response.json();
      setContato(data)
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = (selectedContato) => {
    setOnEdit(selectedContato)
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = contato.filter((emp) => emp.nome_contato.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredContato(filtered);

    getContato();
  }, [searchTerm, contato]);

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
          <FrmCadastroContato onEdit={onEdit} setOnEdit={setOnEdit} getContato={getContato} />
        </div>

        < div className="flex justify-center w-full mb-3">
          <div className="w-3/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
          </div>
        </div>
        < GridCadastroContato
          contato={filteredContato}
          setContato={setContato}
          setOnEdit={handleEdit}
        />
      </div>
    </div >
  )
}

export default CadastroContato;
