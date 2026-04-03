import React from "react";
import { Link } from "react-router-dom";
import "@splinetool/viewer";

const Landing = () => {
  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", fontFamily: "Poppins, sans-serif", overflowX: "hidden" }}>
      <header style={styles.header}>
        <div style={styles.logo}>Captain Kruthin</div>
        <nav>
          <ul style={styles.navList}>
            <li><a href="#" className="active" style={styles.navLink}>Home</a></li>
            <li><a href="#" style={styles.navLink}>About us</a></li>
            <li><a href="#" style={styles.navLink}>Help</a></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer" style={styles.navLink}>View on GitHub</a></li>
          </ul>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700 }}>SafeStreet</h1>
          <h2 style={{ fontSize: "1.8rem", color: "#00B2FF", fontWeight: 600, marginBottom: 20 }}>
            Road Damage Detection and Alert System
          </h2>
          <p style={styles.paragraph}>
            SafeStreet's mobile app lets maintenance teams capture and upload road damage images. A ViT model analyzes the images,
            classifies damage, and generates severity-based summaries. These are emailed to authorities.
            A MERN web platform offers visual insights, historical data, and supports informed decision-making for road maintenance planning.
          </p>
          <p style={styles.paragraph}>
            Built with intelligence, not rules. Designed for the future of data automation.
          </p>
          <Link to="/login" style={styles.button}>Let's Start</Link>
        </div>

        <spline-viewer
          url="https://prod.spline.design/nu2eYHp5WzthhEUI/scene.splinecode"
          style={styles.splineViewer}
        ></spline-viewer>
      </section>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 10%",
  },
  logo: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#00B2FF",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "40px",
  },
  navLink: {
    textDecoration: "none",
    color: "#ccc",
    fontWeight: 500,
    position: "relative",
  },
  hero: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "80px 10%",
    minHeight: "90vh",
    flexWrap: "wrap",
  },
  heroText: {
    maxWidth: "600px",
    zIndex: 2,
  },
  paragraph: {
    fontSize: "1rem",
    color: "#BBBBBB",
    lineHeight: 1.7,
    marginBottom: "20px",
  },
  button: {
    display: "inline-block",
    marginTop: "40px",
    padding: "12px 30px",
    border: "2px solid #00B2FF",
    color: "#00B2FF",
    fontWeight: 600,
    borderRadius: "30px",
    textDecoration: "none",
    transition: "0.3s ease",
  },
  splineViewer: {
    width: "700px",
    height: "700px",
    pointerEvents: "none",
    zIndex: 0,
  },
};

export default Landing;
