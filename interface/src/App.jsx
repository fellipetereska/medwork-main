import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/auth';
import useAuth from './hooks/useAuth';
import PrivateRoute from './components/pages/subPages/components/PrivateRoute';

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

// Importando os Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Função Principal
function App() {
  const { user } = useAuth;

  return (
    <AuthProvider>
      <Router>
        {/* Menu */}
        <Navbar />
        {/* Definindo quais serão as rotas */}
        <Routes>
          {/* Linkando as rotas as paginas */}
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/gestao' element={<Gestao />} />
          <Route path='/cadastros' element={<Cadastros />} />
          <Route path='/inventario' element={<Inventario />} />
          <Route path='/plano' element={<Plano />} />
          <Route path='/laudos' element={<Laudos />} />
          <Route path='/cadastro_empresa' element={<Empresa />} />
          <Route path='/cadastro_unidade' element={<Unidade />} />
          <Route path='/cadastro_setor' element={<Setor />} />
          <Route path='/cadastro_cargo' element={<Cargo />} />
          <Route path='/cadastro_contato' element={<Contato />} />
          <Route path='/cadastro_usuario' element={<Usuario />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        {/* Rodapé */}
        <Footer />
      </Router>

      {/* Mensagem */}
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
    </AuthProvider>
  );
}

export default App;
