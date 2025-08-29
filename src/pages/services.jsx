import './services.css';
import { MdOutlineStickyNote2 } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";

function Services() {
  return (
    <section id="services" className="services">
      <h2>Our Probate Services</h2>
      <p>Comprehensive legal solutions tailored to your specific probate needs</p>
        <div className="services-grid">
         <div className="service-item">
          <MdOutlineStickyNote2 className="service-icon" />
          <h3>Estate Administration</h3>
          <p>Complete guidance through the estate administration process, from filing initial documents to final distribution of assets.</p>
        </div>
        <div className="service-item">
          <IoMdContacts className="service-icon" />
          <h3>Will Contests</h3>
          <p>Expert representation in will disputes and challenges, protecting your interests throughout the legal process.</p>
        </div>
         <div className="service-item">
          <FaRegClock className="service-icon" />
          <h3>Trust Administration</h3>
          <p>Professional trust administration services ensuring proper management and distribution according to trust terms.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;