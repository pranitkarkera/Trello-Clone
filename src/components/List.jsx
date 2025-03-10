import React, { useContext, useState } from "react";
import { X } from "react-feather";
import Card from "./Card";
import { BoardContext } from "../context/BoardContext";

const List = ({ list, index, deleteList, addCard }) => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  const handleEditCard = (cardId, newTitle, newDescription, dueDate) => {
    let newList = [...allboard.boards[allboard.active].list];
    const listIndex = newList.findIndex((listItem) => listItem.id === list.id);
    if (listIndex !== -1) {
      const cardIndex = newList[listIndex].items.findIndex(
        (item) => item.id === cardId
      );
      if (cardIndex !== -1) {
        newList[listIndex].items[cardIndex].title = newTitle;
        newList[listIndex].items[cardIndex].description = newDescription;
        newList[listIndex].items[cardIndex].dueDate = dueDate;

        // Update the board state
        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
      }
    }
  };

  const handleDeleteCard = (cardId) => {
    let newList = [...allboard.boards[allboard.active].list];
    const listIndex = newList.findIndex((listItem) => listItem.id === list.id);
    if (listIndex !== -1) {
      newList[listIndex].items = newList[listIndex].items.filter(
        (item) => item.id !== cardId
      );

      // Update the board state
      let board_ = { ...allboard };
      board_.boards[board_.active].list = newList;
      setAllBoard(board_);
    }
  };

  const handleAddCard = () => {
    if (title.trim()) {
      let newList = [...allboard.boards[allboard.active].list];
      const listIndex = newList.findIndex(
        (listItem) => listItem.id === list.id
      );
      if (listIndex !== -1) {
        newList[listIndex].items.push({
          id: Math.random().toString(36).substr(2, 9),
          title,
          description: "",
          dueDate: "",
        });

        // Update the board state
        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        // Clear input field
        setTitle("");
        setShowInput(false); // Hide input fields after adding
      }
    }
  };

  return (
    <div className="mr-3 w-60 h-fit rounded-md p-2 bg-gray-700 flex-shrink-0 shadow-md">
      <div className="list-body">
        <div className="flex justify-between p-1">
          <span className="text-white font-semibold">{list.title}</span>
          <button
            onClick={() => deleteList(index)}
            className="hover:bg-gray-500 p-1 rounded-sm"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
        <div className="py-1">
          {list.items.map((item) => (
            <Card
              key={item.id}
              card={item}
              editCard={handleEditCard}
              deleteCard={handleDeleteCard}
            />
          ))}
        </div>
        {showInput ? (
          <div className="mt-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card Title"
              className="mb-1 h-10 px-2 w-full bg-gray-600 rounded text-white"
            />
            <button
              onClick={handleAddCard}
              className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
            >
              Add Card
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 mt-1"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600 mt-2"
          >
            Add Card
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
