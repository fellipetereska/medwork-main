import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

import FrmCadastroUsuario from './frmCadastroUsuario'
import GridUsuarios from './gridUsuarios';
import EditModal from "../ModalCadastro";

function CadastroUsuario() {

    // Instanciando e Definindo como vazio
    const [data, setData] = useState(null);
    const [usuario, setUsuario] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [formData, setFormData] = useState({
        nome_usuario: '',
        cpf_usuario: '',
        email_usuario: '',
        usuario: '',
        senha: '',
        permissap_usuario: ''
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
    const getUsuario = async () => {
        try {
            const res = await axios.get("http://localhost:8800/usuarios");
            setUsuario(res.data.sort((a, b) => (a.id_usuario > b.id_usuario ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getUsuario();
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
                        <FrmCadastroUsuario onEdit={onEdit} setOnEdit={setOnEdit} getUsuario={getUsuario} />

                        <EditModal 
                            data={editData} 
                            onCancel={handleCancelEdit} 
                            onSave={handleSave} 
                            isOpen={isEditModalOpen}
                        />

                        <GridUsuarios 
                            usuario={usuario}
                            setOnEdit={handleEdit}
                            handleEditModalOpen={() => handleEditModalOpen(data)}
                        />
                    </div>
            </div>
        </div>
    )
}

export default CadastroUsuario;
