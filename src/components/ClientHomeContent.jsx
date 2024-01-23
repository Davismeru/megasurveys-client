import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { base_api_url } from "../assets/constants";
import { cardColors } from "../assets/constants";

function ClientHomeContent({ clientId }) {
  const [render, setRender] = useState(false);
  const [surveys, setSurveys] = useState([]);

  // looading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // get clients posted surveys
    axios.get(`${base_api_url}/client/get_surveys/${clientId}`).then((res) => {
      setSurveys(res.data);
      setRender(true);
      setLoading(false);
    });
  }, [render]);
  return (
    <div className="client_home">
      {/* create new survey section */}
      <Link to="./create_survey">
        <div className="title_section cursor-pointer">
          <section className="title_icon">
            <IoMdAdd />
          </section>
          <p>New Survey</p>
        </div>
      </Link>

      {/* posted surveys */}
      <div className="posted_surveys">
        <h1>Running Surveys</h1>

        {/* no surveys posted message */}
        {surveys.length == 0 && !loading && (
          <p className="text-pale_red">You haven't posted any surveys yet</p>
        )}

        {/* loading gif */}
        {loading && (
          <div className="mt-20">
            <img
              src="/images/loading.gif"
              alt="loading..."
              className="w-20 mx-auto"
            />
          </div>
        )}

        {!loading && (
          <div className="surveys_container">
            {surveys.map((survey, index) => (
              <Link
                className="w-full"
                key={survey.surveyId}
                to={`./survey_responses/${survey.surveyId}`}
              >
                <section className={`${cardColors[index]}`}>
                  <p>{survey.surveyTitle}</p>
                  <p className="date">{survey.createdAt.substring(0, 10)}</p>

                  {/* delete survey button */}
                  <Link
                    to={`./confirm_delete/${survey.surveyId}`}
                    className="delete_btn"
                  >
                    <IoMdTrash />
                  </Link>
                </section>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientHomeContent;
