import './App.css';
import { Routes, Route} from "react-router-dom";

import Dashboard from './view/Dashboard';
import Register from './view/Register';
import Login from './view/Login';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route  path="user/register" element={<Register/>}/>
            <Route path="/" element={<Login/>} />
            <Route path="user/dashboard" element={<Dashboard/>} />
            <Route  path="*" element={<h1>404- Not found!</h1>}/>         
        </Routes>
    </div>
);
}

export default App;
