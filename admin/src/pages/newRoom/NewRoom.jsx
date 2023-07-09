import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./newRoom.scss";
import { roomInputs } from "../../formsource";

const NewRoom = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>객실 추가하기</h1>
        </div>
        <form>
          {roomInputs.map((input) => {
            return (
              <div className="formInput" key={input.id}>
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
