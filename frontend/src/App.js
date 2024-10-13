import './App.css';
import { Route, Routes,useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Editoor from './pages/Editoor';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './components/redux/auth';

function App() {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(()=>{

    if(localStorage.getItem('id') && localStorage.getItem('token')){
      dispatch(authActions.login());
    }
   else if(!isLoggedIn){
      navigate('/signup');
    }
  },[])

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
