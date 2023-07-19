import './App.css';
import NavBar from './components/NavBar/NavBar';
import  Landing  from './views/Landing/Landing'
import  Home  from './views/Home/Home'
import  Form  from './views/Form/Form';
import  Detail  from './views/Detail/Detail'
import { Routes,Route, useLocation } from 'react-router-dom';  


function App() {
  const location = useLocation();
  return (
    <div className="App">
    {location.pathname !== "/" && <NavBar />}
      <Routes> 
      <Route path='/' element={ <Landing />} />
      <Route path='/home' element={ <Home />} />
      <Route path='/create' element={ <Form />} />
      <Route path='/detail/:id' element={ <Detail />} />
      </Routes>
    </div> 
  );
}

export default App;
