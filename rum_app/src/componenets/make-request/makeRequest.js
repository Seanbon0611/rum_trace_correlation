import React from "react";
import "./make-request.scss";
// import { getMessage } from "../../services/api";

const MakeRequest = ({ setMessage }) => {
  const handleButtonClick = (e) => {
    fetch('http://localhost:8080')
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