import React from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home_container">
      {/* hero image */}
      <img src="/images/hero.jpg" className="hero_img" />
      {/* overlay */}
      <div className="overlay" />
      <section>
        <div>
          <h1>
            Welcome to <span>MegaSurveys</span>
          </h1>
          <p>Your number one survey patners</p>
        </div>

        <div>
          <Link to="/freelancer">
            <button className="button_1">Find Surveys</button>
          </Link>

          <Link to="/client">
            <button className="button_1">Post Survey</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
