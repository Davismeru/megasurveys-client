import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base_api_url } from "../../assets/constants";
import { useNavigate } from "react-router-dom";

function FreelancerSignIn() {
  const navigate = useNavigate();
  // input states
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // sign in error message
  const [errorMessage, setErrorMessage] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // submit function
  const handleSUbmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(`${base_api_url}/freelancer/signin`, {
      userName: userName,
      password: password,
    });

    if (!res.data.error) {
      localStorage.setItem("freelancerToken", res.data);
      navigate("/freelancer");
    } else {
      setErrorMessage(res.data.error);
    }

    setLoading(false);
  };

  return (
    <div className="auth_page red_gradient">
      <form>
        <h1>Fill all the fiels correctly</h1>

        {/* username */}
        <section>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </section>

        {/* password */}
        <section>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>

        {errorMessage && <p className="error_message -my-3">{errorMessage}</p>}

        {/* submit button */}
        <div className="mt-16">
          <button className="button_3" onClick={handleSUbmit}>
            {loading ? "Just a sec..." : "Log in"}
          </button>
        </div>

        <footer>
          Don't have an account? <Link to="/freelancer_signup">Sign up</Link>
        </footer>
      </form>
    </div>
  );
}

export default FreelancerSignIn;
