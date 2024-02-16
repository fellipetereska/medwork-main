import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/auth';
import useAuth from './hooks/useAuth';
// import PrivateRoute from './components/pages/subPages/components/PrivateRoute';
import "react-toastify/dist/ReactToastify.css";

// Importante as Paginas
import Home from './components/pages/Home';
import Gestao from './components/pages/Gestao';
import Cadastros from './components/pages/Cadastros';
import Inventario from './components/pages/Inventario';
import Plano from './components/pages/Plano';
import Laudos from './components/pages/Laudos';
import Empresa from './components/pages/subPages/empresa/Empresa';
import Unidade from './components/pages/subPages/Unidade/CadastroUnidade';
import Setor from './components/pages/subPages/setor/CadastroSetor';
import Cargo from './components/pages/subPages/cargo/CadastroCargo';
import Contato from './components/pages/subPages/contato/CadastroContato';
import Usuario from './components/pages/subPages/usuarios/CadastroUsuario';
import Login from './components/pages/Login';
import Processos from './components/pages/subPages/Processos/Processos';
import Riscos from './components/pages/subPages/Riscos/Riscos';
import Medidas from './components/pages/subPages/CadastroMedidas'
import Aparelhos from './components/pages/subPages/aparelhos/Aparelhos'
import ImportXlsx from './components/pages/subPages/components/ImportXlsx';
import Vinculos from './components/pages/subPages/vinculos/Vinculos';

// Importando os Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/pages/subPages/components/LoadingScreen';
import PrivateRoute from './components/pages/subPages/components/PrivateRoute';

// Função Principal
function App() {
  const { user } = useAuth;

  return (
    <AuthProvider>
      <Router>
        {/* Menu */}
        {user ? (
          <Navbar />
        ) : (
          null
        )}

        {/* Loading */}
        <LoadingScreen />
        {/* Definindo quais serão as rotas */}
        <Routes>
          {/* Linkando as rotas as paginas */}
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<PrivateRoute element={<Home />} />} />
          <Route path='/gestao' element={<PrivateRoute element={<Gestao />} />} />
          <Route path='/cadastros' element={<PrivateRoute element={<Cadastros />} />} />
          <Route path='/inventario' element={<PrivateRoute element={<Inventario />} />} />
          <Route path='/plano' element={<PrivateRoute element={<Plano />} />} />
          <Route path='/laudos' element={<PrivateRoute element={<Laudos />} />} />
          <Route path='/cadastro_empresa' element={<PrivateRoute element={<Empresa />} />} />
          <Route path='/cadastro_unidade' element={<PrivateRoute element={<Unidade />} />} />
          <Route path='/cadastro_setor' element={<PrivateRoute element={<Setor />} />} />
          <Route path='/cadastro_cargo' element={<PrivateRoute element={<Cargo />} />} />
          <Route path='/cadastro_contato' element={<PrivateRoute element={<Contato />} />} />
          <Route path='/cadastro_usuario' element={<PrivateRoute element={<Usuario />} />} />
          <Route path='/cadastro_processo' element={<PrivateRoute element={<Processos />} />} />
          <Route path='/cadastro_risco' element={<PrivateRoute element={<Riscos />} />} />
          <Route path='/cadastro_medida' element={<PrivateRoute element={<Medidas />} />} />
          <Route path='/cadastro_aparelhos' element={<PrivateRoute element={<Aparelhos />} />} />
          <Route path='/importxlsx' element={<PrivateRoute element={<ImportXlsx />} />} />
          <Route path='/vinculos' element={<PrivateRoute element={<Vinculos />} />} />
          <Route path='/*' element={<PrivateRoute element={<Navigate to='/' />} />} />
        </Routes>

        {/* Rodapé */}
        {user ? (
          <Footer />
        ) : (
          null
        )}

      </Router>

      {/* Mensagem */}
      <ToastContainer
        autoClose={3000}
        position={toast.POSITION.TOP_RIGHT}
      />
    </AuthProvider>
  );
}

export default App;
