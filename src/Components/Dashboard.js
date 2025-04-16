import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Stay Updated with <span>NewsApp</span></h1>
        <p className="hero-subtitle">Get real-time news updates, take notes, and explore multiple categories in your preferred language.</p>
        <Link to="/" className="btn btn-primary explore-btn">Explore News</Link>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>📰 Real-Time News</h3>
          <p>Get the latest news from multiple categories like Business, Sports, Technology, and more.</p>
        </div>
        <div className="feature-card">
          <h3>📝 Smart Note-Taking</h3>
          <p>Save and manage important news articles by taking notes directly within the app.</p>
        </div>
        <div className="feature-card">
          <h3>🌎 Multiple Languages</h3>
          <p>Read news in your preferred language, including English, Hindi, Tamil, and more.</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-links">
          <Link to="/business" className="category-card">Business</Link>
          <Link to="/entertainment" className="category-card">Entertainment</Link>
          <Link to="/health" className="category-card">Health</Link>
          <Link to="/science" className="category-card">Science</Link>
          <Link to="/sports" className="category-card">Sports</Link>
          <Link to="/technology" className="category-card">Technology</Link>
        </div>
      </section>

      {/* Inline CSS */}
      <style>
        {`
          .home-container {
            text-align: center;
            padding: 50px 20px;
          }

          .hero-section {
            background: linear-gradient(135deg, #343a40, #1d1f23);
            color: white;
            padding: 60px 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
          }

          .hero-title {
            font-size: 2.5rem;
            font-weight: bold;
          }

          .hero-title span {
            color: #f39c12;
          }

          .hero-subtitle {
            font-size: 1.2rem;
            margin: 10px 0 20px;
          }

          .explore-btn {
            padding: 10px 20px;
            font-size: 1.2rem;
            border-radius: 20px;
            transition: all 0.3s;
          }

          .explore-btn:hover {
            transform: scale(1.05);
          }

          .features {
            display: flex;
            justify-content: space-around;
            margin: 50px 0;
            flex-wrap: wrap;
          }

          .feature-card {
            width: 30%;
            padding: 20px;
            background: #222;
            color: white;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
          }

          .feature-card:hover {
            transform: translateY(-5px);
          }

          .categories {
            margin-top: 40px;
          }

          .category-links {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          .category-card {
            margin: 10px;
            padding: 15px 30px;
            background: #f39c12;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            font-size: 1.2rem;
            transition: all 0.3s;
          }

          .category-card:hover {
            background: #e67e22;
          }

          @media (max-width: 768px) {
            .feature-card {
              width: 100%;
              margin-bottom: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
