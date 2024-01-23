import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/ClientHomePage.css";
import { base_api_url } from "../assets/constants";
import { Route, Routes, useNavigate } from "react-router-dom";
import { authedClientContext } from "../utils/appContext";
import Nav from "../components/Nav";
import ClientHomeContent from "../components/ClientHomeContent";
import CreateSurvey from "../pages/CreateSurvey";
import SurveyResponsesPage from "./SurveyResponsesPage";
import ConfirmDeletePage from "./ConfirmDeletePage";

function ClientHomePage() {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    // confrim jwt token authenticity
    axios
      .post(`${base_api_url}/client/checkAuth`, null, {
        headers: {
          clientToken: localStorage.getItem("clientToken"),
        },
      })
      .then((res) => {
        res.data.error ? navigate("/client_signin") : setAuthedUser(res.data);
      });
  }, []);

  return (
    <authedClientContext.Provider value={{ authedUser, setAuthedUser }}>
      <div className="client_nav">
        <Nav profilePicture={authedUser?.profilePicture} />
      </div>

      <Routes>
        {/* homepage content  route*/}
        <Route
          path="/"
          element={<ClientHomeContent clientId={authedUser?.id} />}
        />

        {/* create survey route */}
        <Route
          path="/create_survey"
          element={<CreateSurvey clientId={authedUser?.id} />}
        />

        {/* survey responses route */}
        <Route
          path="/survey_responses/:surveyId"
          Component={SurveyResponsesPage}
        />

        {/* confirm delete survey route */}
        <Route path="confirm_delete/:surveyId" Component={ConfirmDeletePage} />
      </Routes>
    </authedClientContext.Provider>
  );
}

export default ClientHomePage;
