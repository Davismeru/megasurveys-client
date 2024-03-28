import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_api_url } from "../assets/constants";
import "../css/SurveyResponsesPage.css";
import ResponsesContainer from "../components/ResponsesContainer";

function SurveyResponsesPage() {
  const params = useParams();
  const surveyId = params.surveyId;
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_api_url}/client/get_responses/${surveyId}`)
      .then((res) => {
        setResponses(res.data);
      });
  }, []);
  return (
    <div className="responses_page">
      {/* no surveys posted yet message */}
      {responses?.length == 0 && (
        <p className="text-pale_red">This survey is yet to get any responses</p>
      )}

      {responses &&
        responses?.map((response, index) => (
          <section key={index}>
            <ResponsesContainer response={response} />
          </section>
        ))}
    </div>
  );
}

export default SurveyResponsesPage;
