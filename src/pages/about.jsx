import './About.css';
import Header from '../components/header';

function About() {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <h2>Why Choose AA&CO Probate Ease?</h2>
        <p>
          With over two decades of experience in probate law, our team has successfully guided thousands of families through complex legal processes. We understand that dealing with probate matters during difficult times requires both legal expertise and compassionate support.
        </p><br />
        <h4>Expert Legal Knowledge</h4>
        <p>20+ years of specialized probate law experience</p><br/>
        <h4>Personalized Service</h4>
        <p>Tailor solution for your unique situation</p><br/>
        <h4>Efficient Process</h4>
        <p>Streamlined approach to probate matters</p>
      </div>
      <div className="about-content1">
        <h2>Ready to Get Started?</h2>
        <p>Schedule a free consultation to discuss your probate needs.</p>
        <button>Apply For Our Service</button>
        </div>
    </section>
  );
}

export default About;