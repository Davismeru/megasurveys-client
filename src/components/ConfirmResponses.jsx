import React from "react";
import "../css/ConfirmResponse.css";

function ConfirmResponses({ responses, handleSubmit }) {
  const handleFiles = (files) => {
    const arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push(files[i].name);
    }
    return arr.map((item) => <p>{item}</p>);
  };
  return (
    <div className="confirm_response">
      <div>
        {responses.map((response) => (
          <>
            <h1 className="question">{response.question}</h1>

            {/* response section */}
            <div className="response">
              {/* text response */}
              {response.textResponse && <p>{response.textResponse}</p>}

              {/* multiple options reponse(single option) */}
              {response.singleOptionResponse && (
                <p>{response.singleOptionResponse}</p>
              )}

              {/* multiple options response */}
              {response.multipleOptionsResponse && (
                <ul>
                  {response.multipleOptionsResponse
                    .split(",")
                    .map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                </ul>
              )}

              {/* upload response */}
              {response.uploadResponse && handleFiles(response.uploadResponse)}
            </div>
          </>
        ))}
      </div>
      <button onClick={handleSubmit} className="button_3">
        Submit
      </button>
    </div>
  );
}

export default ConfirmResponses;
