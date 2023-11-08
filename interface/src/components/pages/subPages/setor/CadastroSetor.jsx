import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

import FrmCadastroSetor from "./frmCadastroSetor";
import GridCadastroSetor from "./gridCadastroSetor";
import EditModal from "../ModalCadastro";

function CadastroSetor() {

    // Instanciando e Definindo como vazio
    const [data, setData] = useState(null);
    const [empresa, setEmpresa] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [formData, setFormData] = useState({
        nome_empresa: '',
        razao_social: '',
        cnpj: '',
        endereco: '',
        cidade: '',
        contato: '',
        telefone: ''
    });

    //Instanciando Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const openModal = (data) => {
        setIsEditModalOpen(true);
        setEditData(data)
    };
    

    const handleSave = () => {
        console.log("Dados Salvos", formData);
    };

    // Pegando os dados do banco
    const getEmpresa = async () => {
        try {
            const res = await axios.get("http://localhost:8800/empresa");
            setEmpresa(res.data.sort((a, b) => (a.nome_empresa > b.nome_empresa ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getEmpresa();
    }, []); // Chama apenas uma vez quando o componente é montado

    //Funções do Modal
    const handleEditModalOpen = (data) => {
            setIsEditModalOpen(true);
            setEditData(data);
    };

    const handleCancelEdit = () => {
        setEditData(null);
        setIsEditModalOpen(false);
    }

    const handleEdit = (selectedEmpresa) => {
        setOnEdit(selectedEmpresa)
    };


    return (
        <div>
            <div className="tab-content mt-14 mb-32">
                    <div>
                        <FrmCadastroSetor onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getEmpresa} />

                        <EditModal 
                            data={editData} 
                            onCancel={handleCancelEdit} 
                            onSave={handleSave} 
                            isOpen={isEditModalOpen}
                        />

                        <GridCadastroSetor
                            empresa={empresa} 
                            setEmpresa={setEmpresa} 
                            setOnEdit={handleEdit} 
                            handleEditModalOpen={() => handleEditModalOpen(data)} // Chamando a função para abrir o modal
                        />
                    </div>
            </div>
        </div>
    )
}

export default CadastroSetor;
