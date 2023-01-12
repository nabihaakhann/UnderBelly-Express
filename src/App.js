
import './App.css';
import{
  Routes,
  Route,
} from "react-router-dom";

import Reg from "./components/Reg";
import LogInS from './components/LogInS';

function App() {
  return (
    <Routes>
      {/* this page will be displyed */}
      <Route path='/' element={<LogInS/>}/> 
      <Route path='/Reg' element={<Reg/>}/> 
    </Routes>
  );
}

export default App;
