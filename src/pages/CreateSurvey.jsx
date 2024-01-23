import React, { useEffect, useState } from "react";
import "../css/CreateSurvey.css";
import { MdTextFields } from "react-icons/md";
import { FaListCheck, FaCircleCheck } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";
import { base_api_url } from "../assets/constants";
import { useNavigate } from "react-router-dom";

function CreateSurvey({ clientId }) {
  const navigate = useNavigate();

  const [selectedText, setSelectedText] = useState(false);
  const [selectedMultiple, setSelectedMultiple] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState(false);

  // survey details
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyId, setSurveyId] = useState("");

  // survey questions details
  const [question, setQuestion] = useState("");
  const [allQuestions, setAllQUestions] = useState([]); //hold all survey questions before submit
  const [questionId, setQuestionId] = useState(1);

  // selected options
  const [selectedOption, setSelectedOption] = useState("");
  const [uploadType, setUploadType] = useState("");
  const [acceptedOptions, setAcceptedOptions] = useState("");
  const [optionsList, setOptionsList] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  const handleSelected = (option) => {
    setSelectedText(false);
    setSelectedMultiple(false);
    setSelectedUpload(false);
    option(true);

    if (option == setSelectedText) {
      setSelectedOption("text");
      setUploadType("");
      setAcceptedOptions("");
      setOptionsList("");
    } else if (option == setSelectedMultiple) {
      setSelectedOption("multiple_options");
      setUploadType("");
    } else {
      setSelectedOption("file_upload");
      setAcceptedOptions("");
      setOptionsList("");
    }
  };

  // add new question function
  const handleAddQuestion = (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    form.reset();
    setSelectedText(false);
    setSelectedMultiple(false);
    setSelectedUpload(false);
    setQuestion("");
    setSelectedOption("");

    setAllQUestions([
      ...allQuestions,
      {
        question: question,
        questionId: questionId,
        selectedOption: selectedOption,
        uploadType: uploadType,
        acceptedOptions: acceptedOptions,
        optionsList: optionsList,
        surveyId: surveyId,
      },
    ]);

    setQuestionId(questionId + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(`${base_api_url}/client/create_survey`, [
      allQuestions,
      { surveyTitle, surveyId, clientId },
    ]);
    setLoading(false);

    navigate("/client");
  };

  useEffect(() => {
    setSurveyId("survey" + Math.floor(Math.random() * 10000));
  }, []);

  return (
    <div className="create_survey_page">
      {console.log(allQuestions)}
      {/* survey title section */}
      <div className="survey_title_section">
        <p className="heading">Survey's Title</p>
        <textarea
          rows="3"
          className="title_input"
          placeholder="Please write a descriptive title relating to the survey content."
          onChange={(e) => setSurveyTitle(e.target.value)}
        ></textarea>

        {surveyTitle && (
          <p className="survey_title">Survey Title: {surveyTitle}</p>
        )}
      </div>

      {/* Questions section */}
      <div className="survey_questions_section">
        <p className="heading">Add Survey Questions</p>

        <form id="form">
          <label>Question {questionId}</label>
          <textarea
            rows="3"
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          ></textarea>

          <div className="options_container">
            <h2>Choose Response Type</h2>

            <section className="options_select">
              {/* text option */}
              <section onClick={() => handleSelected(setSelectedText)}>
                <div className="text icon">
                  {!selectedText && <MdTextFields />}
                  {selectedText && <FaCircleCheck />}
                </div>
                <p>Text</p>
              </section>

              {/* file upload */}
              <section onClick={() => handleSelected(setSelectedUpload)}>
                <div className="upload icon">
                  {!selectedUpload && <FaFileUpload />}
                  {selectedUpload && <FaCircleCheck />}
                </div>

                <div>
                  <p>File Upload</p>

                  {selectedUpload && (
                    <ul>
                      <li>
                        <input
                          type="radio"
                          name="upload"
                          value="any"
                          onClick={(e) => setUploadType(e.target.value)}
                        />
                        <label>any</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="upload"
                          value="images"
                          onClick={(e) => setUploadType(e.target.value)}
                        />
                        <label>images</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="upload"
                          value="documents"
                          onClick={(e) => setUploadType(e.target.value)}
                        />
                        <label>documents</label>
                      </li>
                    </ul>
                  )}
                </div>
              </section>

              {/* multiple options */}
              <section onClick={() => handleSelected(setSelectedMultiple)}>
                <div className="multiple icon">
                  {!selectedMultiple && <FaListCheck />}
                  {selectedMultiple && <FaCircleCheck />}
                </div>

                <div>
                  <p>Multiple Options</p>

                  {selectedMultiple && (
                    <ul>
                      <li>
                        <input
                          type="radio"
                          name="options"
                          value="select_one"
                          onClick={(e) => setAcceptedOptions(e.target.value)}
                        />
                        <label>Allow select one option</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="options"
                          value="select_multiple"
                          onClick={(e) => setAcceptedOptions(e.target.value)}
                        />
                        <label>Allow select multiple options</label>
                      </li>
                    </ul>
                  )}

                  {/* select available options */}
                  {selectedMultiple && (
                    <textarea
                      rows="3"
                      placeholder="e.g, male, female, other. (separate the options with a coma)"
                      className="options_input"
                      onChange={(e) => setOptionsList(e.target.value)}
                    ></textarea>
                  )}
                </div>
              </section>
            </section>

            {/* add new question button */}
            <section className="w-1/2">
              {question && selectedOption && (
                <button className="button_2 mt-3" onClick={handleAddQuestion}>
                  Add question
                </button>
              )}
            </section>
          </div>

          {/* submit button */}
          <div>
            <button
              className="button_3 mt-3 disabled:bg-red-200"
              disabled={!allQuestions.length || !surveyTitle}
              onClick={handleSubmit}
            >
              {loading ? "Just a sec..." : "Create survey"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSurvey;
