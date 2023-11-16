import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { Link } from "react-router-dom";

import Back from '../../../layout/Back'
import FrmCadastroContato from "./frmCadastroContato";
import GridCadastroContato from './gridCadastroContato'
import EditModal from "../ModalCadastro";

function CadastroSetor() {

    // Instanciando e Definindo como vazio
    const [data, setData] = useState(null);
    const [contato, setContato] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [formData, setFormData] = useState({
        nome_contato: '',
        telefone_contato: '',
        email_contato: '',
        email_secundario_contato: '',
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
    const getContato = async () => {
        try {
            const res = await axios.get("http://localhost:8800/contato");
            setContato(res.data.sort((a, b) => (a.id_contato > b.id_contato ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getContato();
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

                    <Link to="/cadastros">
                        <Back />
                    </Link>

                    <FrmCadastroContato onEdit={onEdit} setOnEdit={setOnEdit} getContato={getContato} />

                    <EditModal
                        data={editData}
                        onCancel={handleCancelEdit}
                        onSave={handleSave}
                        isOpen={isEditModalOpen}
                    />

                    <GridCadastroContato
                        contato={contato}
                        setContato={setContato}
                        setOnEdit={handleEdit}
                        handleEditModalOpen={() => handleEditModalOpen(data)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CadastroSetor;
