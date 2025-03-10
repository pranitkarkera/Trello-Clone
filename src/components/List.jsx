import React, { useContext, useState } from "react";
import { X, Plus } from "react-feather";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { BoardContext } from "../context/BoardContext";
import SortableCard from "./SortableCard";

const List = ({ list, index, deleteList, deleteCard , editCard}) => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const { setNodeRef } = useDroppable({ id: list.id });

  const handleAddCard = () => {
    const newList = [...allboard.boards[allboard.active].list];
    newList[index].items.push({
      id: Math.random().toString(36).substr(2, 9),
      title,
    });
    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, i) =>
        i === prev.active ? { ...board, list: newList } : board
      ),
    }));
    setTitle("");
    setShowInput(false);
  };

  return (
    <div
      ref={setNodeRef}
      className="mr-3 w-60 h-fit rounded-md p-2 bg-gray-700 flex-shrink-0 shadow-md"
    >
      <div className="flex justify-between p-1">
        <span className="text-white font-semibold">{list.title}</span>
        <button
          onClick={() => deleteList(index)}
          className="hover:bg-gray-500 p-1 rounded-sm"
        >
          <X size={16} className="text-white" />
        </button>
      </div>
      <SortableContext items={list.items.map((item) => item.id)}>
        <div className="py-1">
          {list.items.map((item) => (
            <SortableCard
              key={item.id}
              item={item}
              editCard={(id, title, description, dueDate) =>
                editCard(id, title, description, dueDate)
              }
              deleteCard={(id) => deleteCard(id)}
            />
          ))}
        </div>
      </SortableContext>
      {showInput ? (
        <div className="mt-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card Title"
            className="mb-1 h-10 px-2 w-full bg-gray-600 rounded text-white"
          />
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddCard}
              className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
            >
              Add Card
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="w-full text-white py-1 rounded mt-1"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="w-full flex text-left py-1 mt-2 gap-1"
        >
          <Plus size={16} className="text-white mt-1" />{" "}
          <span className="text-white">Add Card</span>
        </button>
      )}
    </div>
  );
};

export default List;
