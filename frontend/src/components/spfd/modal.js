import React from "react";

export function Modal() {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Please Select a Product</h1>
        </div>
        <div className="body">
          <p>Mother Fucking</p>
        </div>
        <div className="footer">
          <button>Cancel</button>
          <button>Select</button>
        </div>
      </div>
    </div>
  );
}