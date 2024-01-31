import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [selectedCompany, setSelectedCompany] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [contatos, setContatos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [riscos, setRiscos] = useState([]);
  const [medidasAdm, setMedidasAdm] = useState([]);
  const [medidasEpi, setMedidasEpi] = useState([]);
  const [medidasEpc, setMedidasEpc] = useState([]);
  const [setoresProcessos, setSetoresProcessos] = useState([]);
  const [processosRiscos, setProcessosRiscos] = useState([]);
  const [riscosMedidas, setRiscosMedidas] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [companyId, setCompanyId] = useState('');

  const handleSetCompanyId = () => {
    try {
      setCompanyId(selectedCompany[0]?.id_empresa)
    } catch (error) {
      console.log("Erro ao setar id da empresa.", error)
    }
  }

  const getEmpresas = async () => {
    try {
      const response = await fetch(`${connect}/empresas`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar empresas. Status: ${response.status}`)
      }

      const data = await response.json();
      data.sort((a, b) => {
        if (a.ativo < b.ativo) return 1;
        if (a.ativo > b.ativo) return -1;

        return a.nome_empresa.localeCompare(b.nome_empresa);
      });

      setEmpresas(data)
    } catch (error) {
      toast.warn("Erro ao buscar empresas");
      console.log(`Erro ao buscar empresas. ${error}`)
    }
  }

  const getContatos = async () => {
    try {
      const response = await fetch(`${connect}/contatos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar contatos. Status: ${response.status}`)
      }

      const data = await response.json();
      data.sort((a, b) => {
        if (a.ativo < b.ativo) return 1;
        if (a.ativo > b.ativo) return -1;

        return b.id_contato - a.id_contato;
      });

      setContatos(data)
    } catch (error) {
      toast.warn("Erro ao buscar contatos");
      console.log(`Erro ao buscar contatos. ${error}`)
    }
  }

  const handleSelectedCompany = async (id, nameCompany) => {
    try {
      if (!id) {
        toast.warn("Erro ao selecionar empresa!");
        throw new Error("Erro ao selecionar empresa!");
      }

      try {
        const response = await fetch(`${connect}/selectCompany/${id}`);

        if (!response.ok) {
          throw new Error(`Erro ao selecionar empresa! Status: ${response.status}`);
        }

        const empresa = await response.json();

        const newSelectedCompany = {
          id_empresa: id,
          nome_empresa: nameCompany,
        };

        // Define companyId no estado
        setCompanyId(newSelectedCompany.id_empresa);

        // Adiciona as informações da empresa ao localStorage
        localStorage.removeItem('selectedCompanyData');
        localStorage.setItem('selectedCompanyData', JSON.stringify(newSelectedCompany));

        setSelectedCompany([]);
        setSelectedCompany((prevCompanies) => [...prevCompanies, newSelectedCompany]);

        // Chama funções para carregar unidades, setores, cargos, etc.
        await getUnidades();
        await getSetores();
        await getCargos();

        toast.success(`Empresa ${nameCompany} selecionada!`);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log("Erro ao selecionar empresa", error)
    }
  };

  const getUnidades = async () => {
    try {
      const response = await fetch(`${connect}/unidades`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar unidades. Status: ${response.status}`);
      }

      const data = await response.json();
      const filteredUnidades = data.filter((unidade) => unidade.fk_empresa_id === companyId);

      filteredUnidades.sort((a, b) => {
        if (a.ativo < b.ativo) return 1;
        if (a.ativo > b.ativo) return -1;

        return a.nome_unidade.localeCompare(b.nome_unidade);
      });

      const unidadesInfo = filteredUnidades.map((unidade) => ({
        id: unidade.id_unidade,
        nome: unidade.nome_unidade
      }));

      // Adiciona as informações das unidades ao localStorage associado à empresa selecionada
      localStorage.setItem(`selectedCompany_${companyId}_unidadesInfo`, JSON.stringify(unidadesInfo));
      setUnidades(filteredUnidades);
    } catch (error) {
      console.log(`Erro ao buscar unidades. ${error}`);
    }
  };

  const getSetores = async () => {
    try {
      const unidadesInfoString = localStorage.getItem(`selectedCompany_${companyId}_unidadesInfo`);
      const unidadesInfo = unidadesInfoString ? JSON.parse(unidadesInfoString) : [];

      const unidadesIds = unidadesInfo.map((unidade) => unidade.id);

      const setoresResponse = await fetch(`${connect}/setores`);

      if (!setoresResponse.ok) {
        throw new Error(`Erro ao buscar setores. Status: ${setoresResponse.status}`);
      }

      const setoresData = await setoresResponse.json();

      if (!setoresData || setoresData.length === 0) {
        console.log("Nenhum setor encontrado");
        return;
      }

      const filteredSetores = setoresData.filter((setor) => unidadesIds.includes(setor.fk_unidade_id));
      const setoresIds = filteredSetores.map((setor) => setor.id_setor);

      // Adiciona as informações dos setores ao localStorage associado à empresa selecionada
      localStorage.setItem(`selectedCompany_${companyId}_setoresInfo`, JSON.stringify(filteredSetores));

      setSetores(filteredSetores);
    } catch (error) {
      console.log(`Erro ao buscar setores. ${error}`);
    }
  };

  const getCargos = async () => {
    try {
      const unidadesInfoString = localStorage.getItem(`selectedCompany_${companyId}_unidadesInfo`);
      const unidadesInfo = unidadesInfoString ? JSON.parse(unidadesInfoString) : [];

      const unidadesIds = unidadesInfo.map((unidade) => unidade.id);

      const setoresResponse = await fetch(`${connect}/setores`);

      if (!setoresResponse.ok) {
        throw new Error(`Erro ao buscar setores. Status: ${setoresResponse.status}`);
      }

      const setoresData = await setoresResponse.json();

      if (!setoresData || setoresData.length === 0) {
        console.log("Nenhum setor encontrado");
        return;
      }

      const filteredSetores = setoresData.filter((setor) => unidadesIds.includes(setor.fk_unidade_id));
      const setoresIds = filteredSetores.map((setor) => setor.id_setor);

      const cargosResponse = await fetch(`${connect}/cargos`);

      if (!cargosResponse.ok) {
        throw new Error(`Erro ao buscar cargos. Status: ${cargosResponse.status}`);
      }

      const cargosData = await cargosResponse.json();

      if (!cargosData || cargosData.length === 0) {
        console.log("Nenhum cargo encontrado");
        return;
      }

      const filteredCargos = cargosData.filter((cargo) => setoresIds.includes(cargo.fk_setor_id));

      filteredCargos.sort((a, b) => {
        if (a.ativo < b.ativo) return 1;
        if (a.ativo > b.ativo) return -1;

        return a.nome_cargo.localeCompare(b.nome_cargo);
      });

      // Adiciona as informações dos cargos ao localStorage associado à empresa selecionada
      localStorage.setItem(`selectedCompany_${companyId}_cargosInfo`, JSON.stringify(filteredCargos));

      setCargos(filteredCargos);
    } catch (error) {
      console.log(`Erro ao buscar cargos. ${error}`);
    }
  };

  const getProcessos = async () => {
    try {
      const response = await fetch(`${connect}/processos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar processos. Status: ${response.status}`)
      }

      const data = await response.json();
      data.sort((a, b) => {
        return a.nome_processo.localeCompare(b.nome_processo);
      });

      setProcessos(data)
    } catch (error) {
      toast.warn("Erro ao buscar processos");
      console.log(`Erro ao buscar processos. ${error}`)
    }
  };

  const getRiscos = async () => {
    try {
      const response = await fetch(`${connect}/riscos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar riscos. Status: ${response.status}`)
      }

      const data = await response.json();
      data.sort((a, b) => {
        return a.nome_risco.localeCompare(b.nome_risco);
      });

      setRiscos(data)
    } catch (error) {
      toast.warn("Erro ao buscar riscos");
      console.log(`Erro ao buscar riscos. ${error}`)
    }
  };

  const getMedidasAdm = async () => {
    try {
      const response = await fetch(`${connect}/medidas_adm`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar medidas adminitrativas. Status: ${response.status}`)
      }

      const data = await response.json();
      data.sort((a, b) => {
        return a.descricao_medida_adm.localeCompare(b.descricao_medida_adm);
      });

      setMedidasAdm(data)
    } catch (error) {
      toast.warn("Erro ao buscar medidas adminitrativas");
      console.log(`Erro ao buscar medidas adminitrativas. ${error}`)
    }
  }

  const getMedidasEpi = async () => {
    try {
      const response = await fetch(`${connect}/medidas_epi`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar epi's. Status: ${response.status}`)
      }

      const data = await response.json();
      data.sort((a, b) => {
        return a.nome_medida.localeCompare(b.nome_medida);
      });

      setMedidasEpi(data)
    } catch (error) {
      toast.warn("Erro ao buscar epi's");
      console.log(`Erro ao buscar epi's. ${error}`)
    }
  }

  const getMedidasEpc = async () => {
    try {
      const response = await fetch(`${connect}/medidas_epc`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar epc's. Status: ${response.status}`)
      }

      const data = await response.json();
      data.sort((a, b) => {
        return a.descricao_medida.localeCompare(b.descricao_medida);
      });

      setMedidasEpc(data)
    } catch (error) {
      toast.warn("Erro ao buscar epc's");
      console.log(`Erro ao buscar epc's. ${error}`)
    }
  }

  const getSetoresProcessos = async () => {
    try {
      const response = await fetch(`${connect}/setores_processos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Processos dos setores. Status: ${response.status}`)
      }

      const data = await response.json();
      setSetoresProcessos(data)
    } catch (error) {
      toast.warn("Erro ao buscar Setores Processos");
      console.log(`Erro ao buscar Setores Processos. ${error}`)
    }
  }

  const getProcessosRiscos = async () => {
    try {
      const response = await fetch(`${connect}/processos_riscos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Riscos dos processos. Status: ${response.status}`)
      }

      const data = await response.json();
      setProcessosRiscos(data)
    } catch (error) {
      toast.warn("Erro ao buscar Processos Riscos");
      console.log(`Erro ao buscar Processos Riscos. ${error}`)
    }
  }

  const getRiscosMedidas = async () => {
    try {
      const response = await fetch(`${connect}/riscos_medidas`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Medidas dos riscos. Status: ${response.status}`)
      }

      const data = await response.json();
      setRiscosMedidas(data)
    } catch (error) {
      toast.warn("Erro ao buscar Medidas dos riscos");
      console.log(`Erro ao buscar Medidas dos riscos. ${error}`)
    }
  }

  const getInventario = async () => {
    try {
      const response = await fetch(`${connect}/inventario`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Inventário. Status: ${response.status}`)
      }

      const data = await response.json();
      setInventario(data)
    } catch (error) {
      toast.warn("Erro ao buscar Inventário");
      console.log(`Erro ao buscar Inventário. ${error}`)
    }
  }

  const loadSelectedCompanyFromLocalStorage = () => {
    const selectedCompanyDataLocal = localStorage.getItem('selectedCompanyData');

    if (selectedCompanyDataLocal) {
      const selectedCompanyData = JSON.parse(selectedCompanyDataLocal);
      setSelectedCompany((prevCompanies) => [...prevCompanies, selectedCompanyData]);

      setCompanyId(selectedCompanyData.id_empresa);
    }
  };

  useEffect(() => {
    const loadFromLocalStorage = () => {
      loadSelectedCompanyFromLocalStorage();

      const unidadesInfoString = localStorage.getItem(`selectedCompany_${companyId}_unidadesInfo`);
      if (unidadesInfoString) {
        const unidadesInfo = JSON.parse(unidadesInfoString);
        setUnidades(unidadesInfo);
      }

      const setoresInfoString = localStorage.getItem(`selectedCompany_${companyId}_setoresInfo`);
      if (setoresInfoString) {
        const setoresInfo = JSON.parse(setoresInfoString);
        setSetores(setoresInfo);
      }

      const cargosInfoString = localStorage.getItem(`selectedCompany_${companyId}_cargosInfo`);
      if (cargosInfoString) {
        const cargosInfo = JSON.parse(cargosInfoString);
        setCargos(cargosInfo);
      }
    };

    const fetchData = async () => {
      try {
        await getUnidades();
        await getSetores();
        await getCargos();
      } catch (error) {
        console.error(error);
      }
    };

    loadFromLocalStorage();

    if (!unidades.length || !setores.length || !cargos.length) {
      fetchData();
    }

  }, [companyId]);

  const handleClearLocalStorage = () => {
    localStorage.removeItem('selectedCompanyData');
    localStorage.removeItem(`selectedCompany_${companyId}_unidadesInfo`);
    localStorage.removeItem(`selectedCompany_${companyId}_setoresInfo`);
    localStorage.removeItem(`selectedCompany_${companyId}_cargosInfo`);
  }

  return (
    <AuthContext.Provider
      value={{
        handleSelectedCompany,
        handleClearLocalStorage,
        selectedCompany,
        handleSetCompanyId,
        companyId,
        getEmpresas,
        setEmpresas,
        empresas,
        getUnidades,
        setUnidades,
        unidades,
        getContatos,
        setContatos,
        contatos,
        getSetores,
        setSetores,
        setores,
        getCargos,
        setCargos,
        cargos,
        getProcessos,
        setProcessos,
        processos,
        getRiscos,
        setRiscos,
        riscos,
        getMedidasAdm,
        setMedidasAdm,
        medidasAdm,
        getMedidasEpi,
        setMedidasEpi,
        medidasEpi,
        getMedidasEpc,
        setMedidasEpc,
        medidasEpc,
        getSetoresProcessos,
        setSetoresProcessos,
        setoresProcessos,
        getProcessosRiscos,
        setProcessosRiscos,
        processosRiscos,
        getRiscosMedidas, setRiscosMedidas,
        riscosMedidas,
        getInventario,
        setInventario,
        inventario,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
