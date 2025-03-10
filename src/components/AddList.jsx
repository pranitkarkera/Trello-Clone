import React, { useState } from "react";
import { X, Plus } from "react-feather";

const AddList = ({ getlist }) => {
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddList = () => {
    if (title.trim()) {
      getlist(title);
      setTitle("");
      setShowInput(false);
    }
  };

  return (
    <div className="mr-3 w-60 h-fit rounded-md p-2 bg-gray-700 flex-shrink-0 shadow-md">
      {showInput ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title"
            className="mb-2 h-10 px-2 w-full bg-gray-600 rounded text-white"
          />
          <div className="flex items-center justify-start space-x-2">
            <button
              onClick={handleAddList}
              className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 flex items-center"
            >
              <X size={16} className="mr-1" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
        >
          Add List
        </button>
      )}
    </div>
  );
};

export default AddList;
