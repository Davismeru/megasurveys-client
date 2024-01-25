import React, { useEffect, useState } from "react";
import { base_api_url } from "../assets/constants";
import axios from "axios";

function ResponsesContainer({ response }) {
  const [freelancer, setFreelancer] = useState([]);
  useEffect(() => {
    // get freelnacer responsible for the reponse
    axios
      .get(`${base_api_url}/client/get_freelancer/${response[0]?.freelancerId}`)
      .then((res) => {
        setFreelancer(res.data);
      });
  }, []);
  return (
    <div className="response_container">
      {/* freelncer details */}
      <div className="freelancer_details">
        <section>
          <img src={`${base_api_url}/${freelancer.profilePicture}`} alt="" />
        </section>
        <p>{freelancer.userName}</p>
      </div>

      {response.map((item) => (
        <div key={item.id} className="question_answer">
          <h1 className="response_question">{item.question}</h1>

          {/* responses to the question */}
          <section className="response_section">
            {/* text response */}
            {item.textResponse && <p>{item.textResponse}</p>}

            {/* multiple options reponse(single option) */}
            {item.singleOption && <p>{item.singleOption}</p>}

            {/* multiple options response */}
            {item.multipleOptions && (
              <ul>
                {item.multipleOptions.split(",").map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
            )}

            {/* upload response} */}
            {item.surveyUploads && (
              <ul>
                {item.surveyUploads.split(",").map((item, i) => (
                  <li key={i}>
                    <a
                      href={`${base_api_url}/${item}`}
                      target="_blank"
                      className="upload_link"
                    >
                      {item.substring(37)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ))}
    </div>
  );
}

export default ResponsesContainer;
