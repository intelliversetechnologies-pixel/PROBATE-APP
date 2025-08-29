import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
      <div className="footer-item1">       
          <><img src="src/assets/logo.png" alt="logo" /></> <h3> AA&CO Probate Ease </h3>
          <p>Providing expert probate legal services with compassion and professionalism. Your trusted partner in navigating complex legal matters.</p>
        </div>
        <div className="footer-item">
          <h3>Quick Links</h3>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#review">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
         <div className="footer-item">
          <h3>Contact Info</h3>
          <p>+(234) 806 374 5524</p>
          <p> info@aacoprobaateease.com</p>
          <p> 44, Durojaiye street, lawanson, Surulere, Lagos</p>
          </div>
      </div>
      <div className='footer-rights'>
      <p>&copy; {new Date().getFullYear()} ProbateEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;