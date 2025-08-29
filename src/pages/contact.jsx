import { useState } from 'react';
import './Contact.css';
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Get In Touch</h2>
      <p>Ready to discuss your probate needs?</p>
        <div className="contact-grid">
         <div className="contact-item">
          <IoCallOutline className="contact-icon" />
          <h4>Call Us</h4>
          <p>+(234) 806 374 5524</p>
        </div>
        <div className="contact-item">
          <MdEmail className="contact-icon" />
          <h4>Email Us</h4>
          <p>info@aacoprobatesease.com</p>
        </div>
         <div className="contact-item">
          <CiLocationOn className="contact-icon" />
          <h4>Visit Us</h4>
          <p>44, Durojaiye street, lawanson, Surulere, Lagos</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;