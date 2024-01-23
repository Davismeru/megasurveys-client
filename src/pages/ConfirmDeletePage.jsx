import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_api_url } from "../assets/constants";

function ConfirmDeletePage() {
  const params = useParams();
  const navigate = useNavigate();
  const surveyId = params.surveyId;

  const handleDelete = async () => {
    const res = await axios.post(
      `${base_api_url}/client/delete_survey/${surveyId}`
    );
    navigate("/client");
  };

  return (
    <div className="p-5">
      <p className="text-pale_red text-xl font-semibold">
        Are you sure you want to delete this survey?
      </p>

      <div className="text-blue-600 mt-5">
        <Link to="/client">
          <button>Go back to surveys page</button>
        </Link>

        <button onClick={handleDelete}>Go ahead and delete This survey</button>
      </div>
    </div>
  );
}

export default ConfirmDeletePage;
