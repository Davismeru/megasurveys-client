import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { base_api_url } from "../assets/constants";
import { useParams, useNavigate } from "react-router-dom";
import "../css/AnswerSurveyPage.css";
import { authedFreelancerContext } from "../utils/appContext";

function AnswerSurveyPage({ setRender, render }) {
  const params = useParams();
  const navigate = useNavigate();
  const surveyId = params.surveyId;
  const [survey, setSurvey] = useState([]);
  const surveyData = survey?.survey_data;
  const { authedUser } = useContext(authedFreelancerContext);

  // state to hold all the responses
  const [responses, setResponses] = useState([]);

  // input states
  const [textInput, setTextInput] = useState("");
  const [filesInput, setFilesInput] = useState(null);
  const [singleOptionInput, setSingleOptionInput] = useState("");
  const [noInputError, setNoInputError] = useState(false);

  const [counter, setCounter] = useState(0);

  // collect checboxes data
  const [checkBoxData, setCheckboxData] = useState([]);

  // form inputs
  const text_input = document.getElementById("text_input");
  const radio_input = document.getElementById("radio_input");
  const checkbox_input = document.getElementById("checkbox_input");

  const handleCheckbox = (e) => {
    setCheckboxData([...checkBoxData, e.target.value]);
  };

  // Previos question function
  const handlePrevios = (e) => {
    e.preventDefault();
    setCounter(counter - 1);
  };

  // Next question function
  const handleNext = (e) => {
    e.preventDefault();
    if (textInput || singleOptionInput || checkBoxData.length || filesInput) {
      setNoInputError(false);
      setCounter(counter + 1);
      console.log(responses);

      setResponses([
        ...responses,
        {
          question: surveyData[counter].question,
          surveyId: survey?.surveyId,
          questionId: counter + 1,
          textRespone: textInput,
          uploadResponse: filesInput,
          singleOptionResponse: singleOptionInput,
          multipleOptionsResponse: checkBoxData.toString(),
        },
      ]);
    } else {
      setNoInputError(true);
    }

    // reset form inputs

    if (text_input) {
      text_input.value = "";
    }

    if (radio_input) {
      radio_input.checked = false;
    }

    if (checkbox_input) {
      checkbox_input.checked = false;
    }

    setTextInput("");
    setSingleOptionInput("");
    setFilesInput("");
    setCheckboxData("");
  };

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(responses);
    const formData = new FormData();
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      formData.append("userId", authedUser.id);
      formData.append("question", response.question);
      formData.append("surveyId", response.surveyId);
      formData.append("questionId", response.questionId);
      formData.append("textResponse", response.textRespone);
      formData.append("singleOption", response.singleOptionResponse);
      formData.append("multipleOptions", response.multipleOptionsResponse);
      if (response.uploadResponse) {
        for (let i = 0; i < response.uploadResponse.length; i++) {
          formData.append("files", response.uploadResponse[i]);
        }
      }

      axios.post(`${base_api_url}/freelancer/post_response`, formData);
      formData.delete("userId");
      formData.delete("surveyId");
      formData.delete("questionId");
      formData.delete("textResponse");
      formData.delete("singleOption");
      formData.delete("multipleOptions");
      formData.delete("files");
      formData.delete("question");

      render ? setRender(false) : setRender(true);
      navigate("/freelancer");
    }
  };

  useEffect(() => {
    axios
      .get(`${base_api_url}/freelancer/get_survey/${surveyId}`)
      .then((res) => {
        setSurvey(res.data);
      });
  }, []);
  return (
    <div className="answering_page">
      {console.log(surveyData)}
      <h1 className="survey_title">{survey?.surveyTitle}</h1>
      {/* answer survey form component */}
      <form id="form">
        {surveyData && counter < surveyData.length && (
          <div className="questions_container red_gradient">
            {/* survey question */}
            <p className="question">{surveyData[counter].question}</p>

            {/* responses section */}
            <section className="responses_section">
              {/* if response == text */}
              {surveyData[counter].selectedOption == "text" && (
                <textarea
                  id="text_input"
                  onChange={(e) => setTextInput(e.target.value)}
                />
              )}

              {/* if response == multiple option and accepted options == 1 */}
              {surveyData[counter].selectedOption == "multiple_options" &&
                surveyData[counter].acceptedOptions == "select_one" && (
                  <div>
                    {surveyData[counter].optionsList
                      .split(",")
                      .map((option, index) => (
                        <section key={index}>
                          <input
                            type="radio"
                            id="radio_input"
                            value={option}
                            name={surveyData[counter].questionId}
                            onChange={(e) =>
                              setSingleOptionInput(e.target.value)
                            }
                          />
                          <label>{option}</label>
                        </section>
                      ))}
                  </div>
                )}

              {/* if response == multiple option and accepted options == multiple */}
              {surveyData[counter].selectedOption == "multiple_options" &&
                surveyData[counter].acceptedOptions == "select_multiple" && (
                  <div>
                    {surveyData[counter].optionsList
                      .split(",")
                      .map((option, index) => (
                        <section key={index}>
                          <input
                            type="checkbox"
                            id="checkbox_input"
                            value={option}
                            name={surveyData[counter].questionId}
                            onChange={handleCheckbox}
                          />
                          <label>{option}</label>
                        </section>
                      ))}
                  </div>
                )}

              {/* if response == upload */}
              {surveyData[counter].selectedOption == "file_upload" && (
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFilesInput(e.target.files)}
                  />
                </div>
              )}
            </section>

            {/* error message if no options input */}
            {noInputError && <p>Please input this field</p>}

            {/* form navigation and submit buttons */}
            <section className="buttons_container">
              {/* previous button */}
              <button disabled={counter == 0} onClick={handlePrevios}>
                Previos
              </button>

              {/* next button */}
              {counter < surveyData.length && (
                <button onClick={handleNext}>Next</button>
              )}
            </section>
          </div>
        )}

        {/* confirm survey responses section */}
        {surveyData && counter == surveyData.length && (
          <div className="w-1/2 p-5">
            <button onClick={handleSubmit} className="button_3">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default AnswerSurveyPage;
