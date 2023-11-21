import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { Link } from "react-router-dom";
import { supabase } from "../../../../services/api";

import Back from '../../../layout/Back'
import FrmCadastroUnidade from "./frmCadastroUnidade";
import GridCadastroUnidade from './gridCadastroUnidade';
import EditModal from "../ModalCadastro";

function CadastroUnidade() {

    // Instanciando e Definindo como vazio
    const [data, setData] = useState(null);
    const [unidade, setUnidade] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [formData, setFormData] = useState({
        nome_unidade: '',
        cnpj_unidade: '',
        cep_unidade: '',
        endereco_unidade: '',
        bairro_unidade: '',
        cidade_unidade: '',
        uf_unidade: ''
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
    const getUnidade = async () => {
        try {
            const { data } = await supabase.from("unidade").select();
            setUnidade(data)
            // const res = await axios.get("http://localhost:8800/unidade");
            // setUnidade(res.data.sort((a, b) => (a.nome_unidade > b.nome_unidade ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getUnidade();
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

                    <FrmCadastroUnidade onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUnidade} />

                    <EditModal
                        data={editData}
                        onCancel={handleCancelEdit}
                        onSave={handleSave}
                        isOpen={isEditModalOpen}
                    />

                    <GridCadastroUnidade
                        unidade={unidade}
                        setEmpresa={setUnidade}
                        setOnEdit={handleEdit}
                        handleEditModalOpen={() => handleEditModalOpen(data)} // Chamando a função para abrir o modal
                    />
                </div>
            </div>
        </div>
    )
}

export default CadastroUnidade;
