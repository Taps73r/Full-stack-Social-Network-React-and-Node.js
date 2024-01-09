import React, { useState } from "react";
import "./Coments.css";

let Coments = () => {
  const [showOtherComents, showHideComents] = useState(false);
  const handleShowHideComents = () => {
    showHideComents(!showOtherComents);
  };
  return (
    <div>
      <button onClick={handleShowHideComents}>Show Comments</button>
      <div className="comments_block"></div>
    </div>
  );
};
