import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base_api_url } from "../../assets/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/AuthPage.css";

function FreelancerSignUp() {
  const navigate = useNavigate();
  // input states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");

  // input error states
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // handle username
  const handleUserName = async (e) => {
    // confirm if username is already taken
    const res = await axios.post(
      `${base_api_url}/freelancer/find/${e.target.value}`
    );
    !res.data.error ? setUserNameError("") : setUserNameError(res.data.error);

    setUserName(e.target.value);
  };

  // handle password
  const handleConfirmPassword = (e) => {
    password != e.target.value
      ? setPasswordError("password don't match")
      : setPasswordError("");
  };

  // submit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", file);
    await axios.post(`${base_api_url}/freelancer/signup`, formData);
    setLoading(false);
    navigate("/freelancer_signin");
  };
  return (
    <div className="auth_page purple_gradient">
      <form>
        <h1>Fill all the fiels correctly</h1>

        {/* username */}
        <section>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={handleUserName}
          />
          {userNameError && (
            <p className="error_message -mt-1">{userNameError}</p>
          )}
        </section>

        {/* email */}
        <section>
          <input
            type="text"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
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

        {/* confirm password */}
        <section>
          <input
            type="password"
            placeholder="Confirm your password"
            onChange={handleConfirmPassword}
          />
          {passwordError && (
            <p className="error_message -mt-1">{passwordError}</p>
          )}
        </section>

        {/* upload profile picture */}
        <section className="relative h-32">
          <label className="upload_label">Upload profile picture</label>
          <div className="upload_btn_container">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className="upload_btn"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="styled_btn button_2">Upload file</button>
          </div>
          <h4 className="absolute text-sm left-0 bottom-0">{file.name}</h4>
        </section>

        {/* submit button */}
        <div>
          <button
            className="button_3 disabled:bg-red-100"
            onClick={handleSubmit}
            disabled={
              !userName ||
              !email ||
              !password ||
              !file ||
              passwordError ||
              userNameError ||
              loading
            }
          >
            {loading ? "Just a sec..." : "Create Account"}
          </button>
        </div>

        <footer>
          Already have an account? <Link to="/freelancer_signin">Sign in</Link>
        </footer>
      </form>
    </div>
  );
}

export default FreelancerSignUp;
