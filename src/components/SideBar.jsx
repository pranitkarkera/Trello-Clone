import React, { useContext, useState } from "react";
import { ChevronRight, ChevronLeft, Plus, X } from "react-feather";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../context/BoardContext";

const Sidebar = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const blankBoard = {
    name: "",
    bgcolor: "#f60000",
    list: [],
  };
  const [boardData, setBoarddata] = useState(blankBoard);
  const [collapsed, setCollapsed] = useState(false);
  const [showpop, setShowpop] = useState(false);

  const setActiveboard = (i) => {
    let newBoard = { ...allboard };
    newBoard.active = i;
    setAllBoard(newBoard);
  };

  const addBoard = () => {
    let newB = { ...allboard };
    newB.boards.push(boardData);
    setAllBoard(newB);
    setBoarddata(blankBoard);
    setShowpop(false);
  };

  return (
    <aside
      className={`bg-gray-900 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } h-full overflow-y-auto`}
    >
      <div className="p-2">
        {collapsed ? (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-gray-700 rounded p-1"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        ) : (
          <div>
            <div className="workspace p-3 flex justify-between border-b border-gray-700">
              <h4 className="text-white">Pranit's Workspace</h4>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hover:bg-gray-700 rounded p-1"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
            </div>
            <div className="boardlist">
              <div className="flex justify-between px-3 py-2">
                <h6 className="text-white">Your Boards</h6>
                <Popover
                  isOpen={showpop}
                  align="start"
                  positions={["right", "top", "bottom", "left"]}
                  content={
                    <div className="ml-2 p-2 w-60 flex flex-col justify-center items-center bg-gray-600 text-white rounded">
                      <button
                        onClick={() => setShowpop(false)}
                        className="absolute right-2 top-2 hover:bg-gray-500 p-1 rounded"
                      >
                        <X size={16} />
                      </button>
                      <h4 className="py-3">Create Board</h4>
                      <div className="mt-3 flex flex-col items-start w-full">
                        <label htmlFor="title" className="text-sm">
                          Board Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={boardData.name}
                          onChange={(e) =>
                            setBoarddata({ ...boardData, name: e.target.value })
                          }
                          type="text"
                          className="mb-2 h-8 px-2 w-full bg-gray-700 rounded"
                        />
                        <label htmlFor="Color" className="text-sm">
                          Board Color
                        </label>
                        <input
                          value={boardData.bgcolor}
                          onChange={(e) =>
                            setBoarddata({
                              ...boardData,
                              bgcolor: e.target.value,
                            })
                          }
                          type="color"
                          className="mb-2 h-8 px-2 w-full bg-gray-700 rounded"
                        />
                        <button
                          onClick={addBoard}
                          className="w-full rounded h-8 bg-gray-600 mt-2 hover:bg-gray-500"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  }
                >
                  <button
                    onClick={() => setShowpop(!showpop)}
                    className="hover:bg-gray-700 p-1 rounded-sm"
                  >
                    <Plus size={16} className="text-white" />
                  </button>
                </Popover>
              </div>
            </div>
            <ul>
              {allboard.boards &&
                allboard.boards.map((x, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setActiveboard(i)}
                      className="px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500 text-white"
                    >
                      <span
                        className="w-6 h-max rounded-sm mr-2"
                        style={{ backgroundColor: `${x.bgcolor}` }}
                      >
                        &nbsp;
                      </span>
                      <span className="text-white">{x.name}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
