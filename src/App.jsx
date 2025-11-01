
import Form from './pages/form';
import Home from './pages/Home';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<RoleSelection />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </BrowserRouter>
    </>
  );
};
export default App;
