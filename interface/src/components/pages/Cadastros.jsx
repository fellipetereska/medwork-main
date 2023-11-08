// import CadastroEmpresa from "./subPages/empresa/frmCadastroEmpresas";
// import GridCadastroEmpresa from "./subPages/empresa/gridCadastroEmpresa";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import TabCadastroEmpresa from './subPages/tbCadastros';

function Cadastros () {

  // //Instanciando e Definindo como vazio
  // const [users, setUsers] = useState([]);
  // const [onEdit, setOnEdit] = useState(null);

  // //Pegando os dados do banco
  // const getUsers = async () => {
  //   try{
  //     const res = await axios.get("http://localhost:8800");
  //     setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
  //   } catch (error){
  //     toast.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getUsers();
  // }, [setUsers]);


    return (
        <div>
          {/* <CadastroEmpresa onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
          <GridCadastroEmpresa users={users} setUsers={setUsers} setOnEdit={setOnEdit}/> */}
          <TabCadastroEmpresa />
        </div>
    )
}

export default Cadastros;