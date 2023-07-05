import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./newRoom.scss";

const NewRoom = ({ inputs, title }) => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <form>
          {inputs.map((input) => {
            return (
              <div className="formInput" key={inputs.id}>
                <label>{input.label}</label>
                <input type={input.type} placeholder={input.placeholder} />
              </div>
            );
          })}
          <button>저장</button>
        </form>
      </div>
    </div>
  );
};

export default NewRoom;
