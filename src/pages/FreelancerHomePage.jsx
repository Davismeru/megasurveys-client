import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_api_url } from "../assets/constants";
import { Route, Routes, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../css/FreelancerHomePage.css";
import FreelancerHomeContent from "../components/FreelancerHomeContent";
import { authedFreelancerContext } from "../utils/appContext";
import AnswerSurveyPage from "./AnswerSurveyPage";

function FreelancerHomePage() {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState(null);

  const [surveys, setSurveys] = useState([]);

  // loading state
  const [loading, setLoading] = useState(false);

  // force a re-render state when gettin back from the answer survey page
  const [render, setRender] = useState(false);
  useEffect(() => {
    setLoading(true);
    // confirm jwt token validity (confirm auth)
    axios
      .post(`${base_api_url}/freelancer/checkAuth`, null, {
        headers: {
          freelancerToken: localStorage.getItem("freelancerToken"),
        },
      })
      .then((res) => {
        res.data.error
          ? navigate("/freelancer_signin")
          : setAuthedUser(res.data);
      });

    // get all surveys
    axios
      .get(`${base_api_url}/freelancer/get_surveys/${authedUser?.id}`)
      .then((res) => {
        setSurveys(res.data);
      });

    setLoading(false);
  }, [render, authedUser?.id]);
  return (
    <authedFreelancerContext.Provider value={{ authedUser }}>
      <div className="freelancer_nav">
        <Nav
          profilePicture={authedUser?.profilePicture}
          userName={authedUser?.userName}
          userType="freelancer"
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <FreelancerHomeContent surveys={surveys} loading={loading} />
          }
        />
        <Route
          path="/answer_survey/:surveyId"
          element={<AnswerSurveyPage setRender={setRender} render={render} />}
        />
      </Routes>
    </authedFreelancerContext.Provider>
  );
}

export default FreelancerHomePage;
