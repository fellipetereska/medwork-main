import CadastroEmpresa from './frmCadastroEmpresas'
import GridCadastroSetor from './gridCadastroSetor';
import GridCadastroEmpresa from "./gridCadastroEmpresa";
import CadastroSetor from './frmCadastroSetor';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

function TabCadastroEmpresa (){

    //Instanciando e Definindo como vazio
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState ({
                                                nome_empresa: '', 
                                                razao_social: '', 
                                                cnpj_empresa: '', 
                                                endereco_empresa: '', 
                                                cidade: '', 
                                                contato: '', 
                                                telefone: ''
                                            })

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    const handleInputChange = (e) => {
        e.preventDefault();

        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        console.log("Dados Salvos", formData);
    };

    //Pegando os dados do banco
     const getUsers = async () => {
        try{
        const res = await axios.get("http://localhost:8800/empresa");
        setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error){
        toast.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [setUsers]);


    return(
        <div>
            <div className="m-2 text-sm font-medium text-start text-gray-500 border-b border-gray-200">
                <button
                    className={`ml-1 inline-block p-4 rounded-t-lg bg-gray-100 text-gray-900 hover:text-gray-600 hover:bg-gray-200 ${activeTab === 0 ? 'active' : ''}`}
                    onClick={() => handleTabChange(0)} 
                >
                    Cadastrar Empresa
                </button>
                <button 
                    className={`ml-1 inline-block p-4 rounded-t-lg bg-gray-100 text-gray-900 hover:text-gray-600 hover:bg-gray-200 ${activeTab === 1 ? 'active' : ''}`}
                    onClick={() => handleTabChange(1)} 
                    >
                    Cadastrar Setor
                </button>

            </div>
                <div className="tab-content">
                {activeTab === 0 && (
                    <div>
                        <div className="border-b border-gray-200 mb-10">
                            <CadastroEmpresa onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
                        </div>
                        <GridCadastroEmpresa users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
                    </div>
                )}
                </div>
                <div className="tab-content">
                {activeTab === 1 && (
                    <div>
                        <div className="border-b border-gray-200 mb-10">
                            <CadastroSetor onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
                        </div>
                        <GridCadastroSetor users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
                    </div>
                )}
                </div>
        </div>
    )
}

export default TabCadastroEmpresa;