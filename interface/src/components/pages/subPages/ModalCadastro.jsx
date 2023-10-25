import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import GridSetorEmpresa from './setor_empresa//gridSetorEmrpesa'
import axios from 'axios'
import { toast } from "react-toastify";

const EditModal = ({ data, onSave, onCancel, isOpen }) => {

    const ref = useRef(null);
    const [setorEmpresa, setSetorEmpresa] = useState([]);

    const getSetorEmpresa = async () => {
        try {
            const res = await axios.get("http://localhost:8800/setor_empresa");
            setSetorEmpresa(res.data.sort((a, b) => (a.nome_setor > b.nome_setor ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };
    useEffect(() => {
        getSetorEmpresa();
    }, []);

    if (!isOpen || !data) {
        return null;
    }

    const {
        nome_empresa = '',
        razao_social = '',
        cnpj_empresa = '',
        endereco_empresa = '',
        cidade = '',
        contato = '',
        telefone = '',
    } = data;

    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_empresa.value = "";
        user.razao_social.value = "";
        user.cnpj_empresa.value = "";
        user.endereco_empresa.value = "";
        user.cidade.value = "";
        user.contato.value = "";
        user.telefone.value = "";
      };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute inset-0 bg-black opacity-25"></div>
            <div className="modal-container bg-white w-4/5 h-4/5  mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="flex justify-end p-1">
                    <button
                        type="button"
                        className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                        onClick={onCancel}
                    >
                        <svg className="flex m-auto w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Fechar modal</span>
                    </button>
                </div>
                <div className="flex justify-center">
                    <form className="w-full max-w-5xl">
                        <div className="flex flex-wrap -mx-3 mb-6 p-3">
                            <div className="w-full md:w-1/3 px-3">
                                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                    Nome da Empresa:
                                </label>
                                <input
                                    type="text"
                                    name="nome_empresa"
                                    value={data.nome_empresa}  // Adicione o value correspondente
                                    onChange={e => onSave({ ...data, nome_empresa: e.target.value })}  // Adicione o onChange correspondente
                                    className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                                    placeholder='Nome da Empresa'
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                    Razão Social:
                                </label>
                                <input
                                    type="text"
                                    name="razao_social"
                                    value={data.razao_social}  // Adicione o value correspondente
                                    onChange={e => onSave({ ...data, razao_social: e.target.value })}  // Adicione o onChange correspondente
                                    className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                                    placeholder='Razao Social'
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                    CNPJ:
                                </label>
                                <input
                                    type="number"
                                    name="cnpj_empresa"
                                    value={data.cnpj_empresa}  // Adicione o value correspondente
                                    onChange={e => onSave({ ...data, cnpj_empresa: e.target.value })}  // Adicione o onChange correspondente
                                    className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                                    placeholder='00..000.000/0000-00'
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                    Endereço:
                                </label>
                                <input
                                    type="text"
                                    name="endereco_empresa"
                                    value={data.endereco_empresa}  // Adicione o value correspondente
                                    onChange={e => onSave({ ...data, endereco_empresa: e.target.value })}  // Adicione o onChange correspondente
                                    className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                                    placeholder='Endereço'
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                    Cidade:
                                </label>
                                <input
                                    type="text"
                                    name="cidade"
                                    value={data.cidade}  // Adicione o value correspondente
                                    onChange={e => onSave({ ...data, cidade: e.target.value })}  // Adicione o onChange correspondente
                                    className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                                    placeholder='Cidade'
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                    Responsável:
                                </label>
                                <input
                                    type="text"
                                    name="contato"
                                    value={data.contato}  // Adicione o value correspondente
                                    onChange={e => onSave({ ...data, contato: e.target.value })}  // Adicione o onChange correspondente
                                    className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                                    placeholder='Responsável pela empresa'
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                    Telefone:
                                </label>
                                <input
                                    type="number"
                                    name="telefone"
                                    value={data.telefone}  // Adicione o value correspondente
                                    onChange={e => onSave({ ...data, telefone: e.target.value })}  // Adicione o onChange correspondente
                                    className="appearance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                                    placeholder='(00) 00000-0000'
                                />
                            </div>
                            <div className="w-full px-3 pl-8 flex justify-end">
                                <div>
                                    <button onClick={handleClear} className="shadow  bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                        Limpar
                                    </button>
                                </div>
                                <div className="px-3 pl-8">
                                    <button className="shadow bg-green-600 hover-bg-green-700 focus-shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                        Atualizar
                                    </button>
                                </div>
                            </div>
                                <div class="w-full px-3 mb-10">
                                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                            Setor:
                                        </label>
                                    <div className='flex pr-8'>
                                        <select class="w-1/3 block appearance-none bg-gray-100 border-gray-200 mt-1 text-gray-400 py-3 px-4 rounded leading-tight focus:outline-none" id="grid-state">
                                            <option>Selecione uma Opção</option>
                                        </select>
                                        <div className="px-3 pl-8 flex items-center">
                                            <button className="shadow bg-green-600 hover-bg-green-700 focus-shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                Cadastrar Setor
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </form>
                </div>
                <div className='border-b border-gray-200'></div>
                <div className='mt-10'>
                    <GridSetorEmpresa setorEmpresa={setorEmpresa} setSetorEmpresa={setSetorEmpresa} />

                </div>
            </div>
        </div>
    );
};

export default EditModal;
