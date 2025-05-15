// src/pages/Contact.js
import React from "react";

const Contact = () => {
  const styles = {
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // full viewport height
      backgroundColor: "#eef2f5",
    },
    container: {
      padding: "2rem",
      width: "100%",
      maxWidth: "600px",
      backgroundColor: "#f7f7f7",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "1rem",
      color: "#0a5071",
    },
    list: {
      listStyleType: "none",
      paddingLeft: 0,
      fontSize: "1.1rem",
    },
    listItem: {
      margin: "1rem 0",
    },
    link: {
      color: "#0a5071",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Contact Me</h2>
        <p>Feel free to reach out through any of the following platforms:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            📧 Email:{" "}
            <a href="mailto:mayank.224ca031@nitk.edu.in" style={styles.link}>
              mayank.224ca031@nitk.edu.in
            </a>
          </li>
          <li style={styles.listItem}>
            📱 Phone:{" "}
            <a href="tel:+918808505427" style={styles.link}>
              +91-88085-05427
            </a>
          </li>
          <li style={styles.listItem}>
            💼 LinkedIn:{" "}
            <a
              href="https://linkedin.com/in/mayank-kumar-19a694250/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              linkedin.com/in/mayank-kumar-19a694250
            </a>
          </li>
          <li style={styles.listItem}>
            💻 GitHub:{" "}
            <a
              href="https://github.com/mayankkumar4x"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              github.com/mayankkumar4x
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
