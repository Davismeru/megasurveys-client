import React from "react";
import { Link } from "react-router-dom";
import SurveyCard from "./SurveyCard";

function FreelancerHomeContent({ surveys, loading }) {
  return (
    <div className="freelancer_home">
      <h1 className="title_section">Available surveys</h1>

      {/* no surveys message */}
      {surveys.length == 0 && !loading && (
        <p>No surveys new surveys at the moment</p>
      )}

      {/* loading gif */}
      {loading && (
        <div>
          <img
            src="./images/loading.gif"
            alt="loading..."
            className="w-14 mx-auto mt-20"
          />
        </div>
      )}

      {!loading && (
        <div className="survey_cards_container">
          {surveys.map((survey, index) => (
            <Link
              to={`./answer_survey/${survey.surveyId}`}
              key={survey.surveyId}
            >
              <SurveyCard survey={survey} index={index} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default FreelancerHomeContent;
