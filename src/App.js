import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Budgets from './pages/Budgets';
import History from './pages/History';
import Expenses from './pages/Expenses';
import './App.css';
import Navigation from './components/Navigation';
import DesktopNav from './components/DesktopNav';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <AnimatePresence>
      <main>
        <BrowserRouter>
          <Navigation />
          <DesktopNav />
          <div className='flex-col'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/budgets' element={<Budgets />} />
              <Route path='/expenses' element={<Expenses />} />
              <Route path='/history' element={<History />} />
            </Routes>
          </div>
        </BrowserRouter>
      </main>
    </AnimatePresence>
  );
}

export default App;
