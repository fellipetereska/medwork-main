import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/auth';
import { useState } from 'react';
import useAuth from './hooks/useAuth';
import axios from 'axios';

// Importante as Paginas
import Home from './components/pages/Home';
import Gestao from './components/pages/Gestao';
import Cadastros from './components/pages/Cadastros';
import Inventario from './components/pages/Inventario';
import Plano from './components/pages/Plano';
import Laudos from './components/pages/Laudos';
import Empresa from './components/pages/subPages/empresa/Empresa';
import Unidade from './components/pages/subPages/Unidade/CadastroUnidade'
import Setor from './components/pages/subPages/setor/CadastroSetor'
import Cargo from './components/pages/subPages/cargo/CadastroCargo'
import Contato from './components/pages/subPages/contato/CadastroContato'
import Usuario from './components/pages/subPages/usuarios/CadastroUsuario'
import Login from './components/pages/Login'

// Importando os Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';


//Função Principal
function App() {


  const Private = ({ Item }) => {
    const { user } = useAuth();
  
    return user ? <Item /> : <Login />;
  };

  const handleLogout = async () =>{
    try{
        const res = await axios.post("http://localhost:8800/logout");

    }catch (error) {
        console.log("Erro ao fazer logout:", error)
    }
};

  

  return (
    <>
      <AuthProvider>
    
        <Router>
          {/* Menu */}
          <Navbar handleLogout={handleLogout} />
          {/* Definindo quais serão as rotas */}
          <Routes>
            {/* Linkando as rotas as paginas */}
            {/* Menu */}
            <Route path='/' element={<Login />}/>
            <Route path='/home' element={<Private Item={Home}/>}/>
            <Route path='/gestao' element={<Private Item={Gestao} />}/>
            <Route path='/cadastros' element={<Private Item={Cadastros} />}/>
            <Route path='/inventario' element={<Private Item={Inventario} />}/>
            <Route path='/plano' element={<Private Item={Plano} />}/>
            <Route path='/laudos' element={<Private Item={Laudos} />}/>

            {/* Cadastros */}
            <Route path='/cadastro_empresa' element={<Private Item={Empresa} />}/>
            <Route path='/cadastro_unidade' element={<Private Item={Unidade} />}/>
            <Route path='/cadastro_setor' element={<Private Item={Setor} />}/>
            <Route path='/cadastro_cargo' element={<Private Item={Cargo} />}/>
            <Route path='/cadastro_contato' element={<Private Item={Contato} />}/>
            <Route path='/cadastro_usuario' element={<Private Item={Usuario} />}/>

          </Routes>
          {/* Rodapé */}
          <Footer />
        </Router>

        {/* Mensagem */}
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      </AuthProvider>
    </>
  );
}

export default App;
