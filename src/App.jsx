import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Main from "./components/Main";
import { BoardContext } from "./context/BoardContext";

function App() {
  const [allboard, setAllBoard] = useState(() => {
    const storedBoard = localStorage.getItem("board");
    return storedBoard ? JSON.parse(storedBoard) : {
      active: 0,
      boards: [
        {
          name: "My Trello Board",
          bgcolor: "#069",
          list: [],
        },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(allboard));
  }, [allboard]);

  return (
    <BoardContext.Provider value={{ allboard, setAllBoard }}>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-row h-[calc(100vh-4rem)]">
          <Sidebar />
          <Main />
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default App;
