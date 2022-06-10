import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Budgets from './pages/Budgets';
import History from './pages/History';
import Expenses from './pages/Expenses';
import './App.css';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/budgets' element={<Budgets />} />
          <Route path='/history' element={<History />} />
          <Route path='/new-expenses' element={<Expenses />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
