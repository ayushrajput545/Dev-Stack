import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Editoor from './pages/Editoor';

function App() {
  return (
     <div>

     <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/editor' element={<Editoor/>}/>
      <Route path='*' element={<NoPage/>}/>

     </Routes>
     
     </div>
  );
}

export default App;
