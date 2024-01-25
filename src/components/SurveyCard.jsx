import React, { useEffect, useState } from "react";
import { base_api_url, cardColors } from "../assets/constants";
import axios from "axios";
import "../css/SurveyCard.css";
import { FaIndustry } from "react-icons/fa6";

function SurveyCard({ survey, index }) {
  const [client, setClient] = useState([]);
  useEffect(() => {
    axios
      .get(`${base_api_url}/freelancer/get_client/${survey?.clientId}`)
      .then((res) => {
        setClient(res.data);
      });
  }, []);
  return (
    <div className={`${cardColors[index]} card_container`}>
      <div>
        <p className="card_survey_title">{survey.surveyTitle}</p>
        <p className="card_date">{client?.createdAt?.substring(0, 10)}</p>
      </div>

      <div className="card_profile_details">
        <div className="card_profile_img">
          <img src={`${base_api_url}/${client.profilePicture}`} alt="img" />
        </div>

        <p className="card_username">{client.userName}</p>
        <p className="card_affiliate">
          <span>
            <FaIndustry />
          </span>
          {client.affiliate}
        </p>
      </div>
    </div>
  );
}

export default SurveyCard;
