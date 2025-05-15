import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About <span>NewsApp</span></h1>
        <p>Your one-stop platform for real-time news updates, note-taking, and seamless browsing.</p>
      </header>

      <section className="about-content">
        <h2>📌 What is NewsApp?</h2>
        <p>
          NewsApp is a dynamic platform designed to keep you updated with the latest headlines
          across various categories, including Business, Sports, Technology, and more. It allows
          users to take notes on articles and filter news based on language preferences.
        </p>

        <h2>🚀 Key Features</h2>
        <ul>
          <li><strong>📰 Real-Time News:</strong> Get instant updates from reliable sources.</li>
          <li><strong>📝 Smart Notes:</strong> Save important news snippets for later.</li>
          <li><strong>🌍 Multi-Language Support:</strong> Read news in your preferred language.</li>
          <li><strong>🔎 Category-Based Navigation:</strong> Explore news in different sectors effortlessly.</li>
        </ul>

        <h2>🔗 Stay Connected</h2>
        <p>We strive to deliver accurate and up-to-date news. Stay informed, stay ahead!</p>
      </section>

      {/* Inline CSS */}
      <style>
        {`
          .about-container {
            padding: 50px 20px;
            text-align: center;
          }

          .about-header {
            background: linear-gradient(135deg, #343a40, #1d1f23);
            color: white;
            padding: 50px;
            border-radius: 10px;
          }

          .about-header span {
            color: #f39c12;
          }

          .about-content {
            max-width: 800px;
            margin: 40px auto;
            text-align: left;
          }

          .about-content h2 {
            color: #f39c12;
            margin-top: 20px;
          }

          .about-content ul {
            list-style: none;
            padding: 0;
          }

          .about-content li {
            background: #222;
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
          }
        `}
      </style>
    </div>
  );
};

export default About;
