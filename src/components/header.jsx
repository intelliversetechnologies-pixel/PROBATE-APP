import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleApplyNowClick = () => {
    window.open('/form', '_blank');
  };

  return (
    <>
    <header className="header">
      <div className='navigation'>
      <div className="logo"><img src="src/assets/logo.png.jpg" alt="ProbateEase" /></div>
        <div className='nav'>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        </div>
        <div className='btn'><button onClick={handleApplyNowClick}>Apply now</button></div>
        </div>
    </header>
   </>
  );
}
    
export default Header;