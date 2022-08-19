import React from "react";
import "../components/styles/AdminDashboard.css";
import { Card } from "./Card";
import update from "immutability-helper";
import { useCallback, useState } from "react";
import Example from "./example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/admin/login");
  };
  return (
    <div className="adminDashboard" style={{ backgroundColor: "black" }}>
      <DndProvider backend={HTML5Backend}>
        <div>
          <header>
            <h1>APP</h1>
            <button onClick={handleLogout}>
              <span className="logoutBtn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 20C5 17.544 6.991 15.553 9.447 15.553H14.553C17.009 15.553 19 17.544 19 20"
                    stroke="#696969"
                    stroke-width="1.4824"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.0052 5.2448C16.6649 6.90453 16.6649 9.59548 15.0052 11.2552C13.3455 12.9149 10.6545 12.9149 8.9948 11.2552C7.33507 9.59548 7.33507 6.90453 8.9948 5.2448C10.6545 3.58507 13.3455 3.58507 15.0052 5.2448"
                    stroke="#696969"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Logout</span>
              </span>
            </button>
          </header>
          <div className="main">
            <div className="heading">
              <h1>Today's Leaderboard</h1>
              <div className="leaderInfo">
                <p>30 May 2022</p>
                <span className="dotLeft">.</span>
                <span className="submissions">SUBMISSION OPEN</span>
                <span className="dotRight">.</span>
                <p>11:34</p>
              </div>
            </div>
            <div className="tags">
              <p>#</p>
              <p>Title</p>
              <p>Author</p>
              <p>Most Liked</p>
            </div>
            <div style={{ backgroundColor: "black", color: "white" }}>
              <Example />
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default AdminDashboardPage;
