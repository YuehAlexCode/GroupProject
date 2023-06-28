import './App.css';
import { Routes, Route} from "react-router-dom";

import Dashboard from './view/Dashboard';
import Register from './view/Register';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route  path="users/register" element={<Register/>}/>
            <Route path="/" element={<Dashboard/>} />
            
            <Route  path="*" element={<h1>404- Not found!</h1>}/>         
        </Routes>
    </div>
);
}

export default App;
