import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Importante as Paginas
import Home from './components/pages/Home';
import Gestao from './components/pages/Gestao';
import Cadastros from './components/pages/Cadastros';
import Inventario from './components/pages/Inventario';
import Plano from './components/pages/Plano';
import Laudos from './components/pages/Laudos';

// Importando os Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

//Função Principal
function App() {
  return (
    <Router>
      {/* Menu */}
      <Navbar />
      {/* Definindo quais serão as rotas */}
      <Routes>
        {/* Linkando as rotas as paginas */}
        <Route path='/' element={<Home />}/>
        <Route path='/gestao' element={<Gestao />}/>
        <Route path='/cadastros' element={<Cadastros />}/>
        <Route path='/inventario' element={<Inventario />}/>
        <Route path='/plano' element={<Plano />}/>
        <Route path='/laudos' element={<Laudos />}/>
      </Routes>
      {/* Rodapé */}
      <Footer />
    </Router>
  );
}

export default App;
