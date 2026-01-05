import './hero.css';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/form');
  };

  return (
    <section id="home" className="hero">
      <div className="heroContent">
        <h1>Simplifying Probate <br/><span>Made Easy</span></h1>
        <p>Navigate the complexities of probate law with confidence. Our experienced team provides comprehensive legal services to help you through every step of the process.</p>
        <button className="cta-button" onClick={handleApplyNow}>Apply Now</button>
      </div>
      <div className="heroImg"><img src='src/assets/image.png' alt="Probate" /></div>
    </section>
  );
}

export default Hero;
