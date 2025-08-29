
import Form from './pages/form';
import Home from './pages/Home';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </BrowserRouter>
    </>
  );
};
export default App;
