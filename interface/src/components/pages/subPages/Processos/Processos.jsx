import { useEffect, useState } from 'react';
import { supabase } from '../../../../services/api';
import { Link } from 'react-router-dom';

import Back from '../../../layout/Back';
import SearchInput from '../components/SearchInput';
import FrmProcessos from './frmProcessos'
import GridProcesso from './GridProcessos'

function Processos() {

  const [processo, setProcesso] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [setor, setSetor] = useState(null);
  const [setorName, setSetorName] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [cargoName, setCargoName] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProcessos, setFilteredProcessos] = useState([]);

  const getProcesso = async () => {
    try {
      const { data } = await supabase.from("processo").select();
      const sortData = data.sort((a, b) => {

        //Ordenar por ordem alfabética
        return a.nome_processo.localeCompare(b.nome_processo);
      })

      setProcesso(sortData)
    } catch (error) {
      console.log("Erro ao buscar processo: ", error);
    }
  }

  const getSetor = async () => {
    const { data } = await supabase.from("setor").select();
    setSetor(data);
  }

  const getCargo = async () => {
    const { data } = await supabase.from("cargo").select();
    setCargo(data);
  }

  useEffect(() => {
    getProcesso();
    getSetor();
    getCargo();
  },[])

  const handleEdit = (selectedProcesso) => {
    setOnEdit(selectedProcesso);

    if (selectedProcesso.fk_setor_id) {
      const setorInfo = setor.find((c) => c.id_setor === selectedProcesso.fk_setor_id)

      if(setorInfo) {
        setSetorName(setorInfo.nome_setor)
      }
    }

    if (selectedProcesso.fk_cargo_id) {
      const cargoInfo = cargo.find((c) => c.id_cargo === selectedProcesso.fk_cargo_id)

      if(cargoInfo) {
        setCargoName(cargoInfo.nome_cargo)
      }
    }
  }

  // Função para pesquisa
  useEffect(() => {
    const filtered = processo.filter((proc) => proc.nome_processo.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProcessos(filtered);
  }, [searchTerm, processo]);


  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <div className="tab-content mt-14 mb-32">
      <div className="flex justify-center items-center">
        {/* Botão para voltar */}
        <div className="absolute left-0">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Processos</h1>
      </div>

      {/* Formulário de cadastro */}
      <FrmProcessos
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getProcessos={getProcesso}
        nomeSetor={setorName}
        nomeCargo={cargoName}
      />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Processo..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridProcesso
        processos={processo}
        empresa={filteredProcessos}
        setEmpresa={setProcesso}
        setOnEdit={handleEdit}
        setor={setor}
        cargo={cargo}
      />
    </div>
  )
}

export default Processos;