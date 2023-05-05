import React from "react";
import "./make-request.scss";
import { datadogRum } from "@datadog/browser-rum";
// import { getMessage } from "../../services/api";


const sessionId = datadogRum.getInternalContext().session_id

const MakeRequest = ({ setMessage }) => {
  const handleButtonClick = (e) => {
    const request = {
      method: "GET",
      headers: {
        'x-session-id': sessionId
      }

    }
    fetch('http://localhost:8080', request)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error(error));
  }
  return (
    <button className="clickme" onClick={handleButtonClick}>
      "Click Me!"
    </button>
  );
}

export default MakeRequest