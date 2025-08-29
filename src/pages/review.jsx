import './review.css';

function review() {
  return (
    <section id="review" className="review">
      <h2>What Our Clients Say</h2>
      <p>Trusted by families across the state</p>
        <div className="review-grid">
         <div className="review-item">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>"AA&CO made an incredibly difficult time much easier. Their expertise and compassionate approach helped us navigate probate without stress."</p><br/>
          <h5>— Sarah Johnson</h5>
        </div>
        <div className="review-item">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>"Professional, efficient, and thorough. They handled everything while keeping us informed every step of the way. Highly recommended."</p><br/>
          <h5>— Michael Chen</h5>
        </div>
         <div className="review-item">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>"Outstanding service from start to finish. Their knowledge of probate law saved us time and money. Thank you for everything!"</p><br/>
          <h5>— Lisa Rodriguez</h5>
        </div>  
      </div>
    </section>
  );
}

export default review;