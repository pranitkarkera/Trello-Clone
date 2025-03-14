import React, { useContext, useState } from "react";
import List from "./List";
import AddList from "./AddList";
import { BoardContext } from "../context/BoardContext";

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const [draggedListIndex, setDraggedListIndex] = useState(null);

  const deleteList = (index) => {
    const newList = [...allboard.boards[allboard.active].list];
    newList.splice(index, 1);
    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, i) =>
        i === prev.active ? { ...board, list: newList } : board
      ),
    }));
  };

  const editCard = (id, title, description, dueDate) => {
    const newList = [...allboard.boards[allboard.active].list];
    for (let i = 0; i < newList.length; i++) {
      const cardIndex = newList[i].items.findIndex((item) => item.id === id);
      if (cardIndex !== -1) {
        newList[i].items[cardIndex].title = title;
        newList[i].items[cardIndex].description = description;
        newList[i].items[cardIndex].dueDate = dueDate;
        break;
      }
    }

    setAllBoard((prev) => {
      const updatedBoard = {
        ...prev,
        boards: prev.boards.map((board, index) =>
          index === prev.active ? { ...board, list: newList } : board
        ),
      };
      console.log("Updated Board:", updatedBoard); // Log the updated board
      return updatedBoard;
    });
  };

  const deleteCard = (id) => {
    const newList = allboard.boards[allboard.active].list.map((list) => ({
      ...list,
      items: list.items.filter((item) => item.id !== id),
    }));

    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, i) =>
        i === prev.active ? { ...board, list: newList } : board
      ),
    }));
  };

  // List drag handlers
  const handleListDragStart = (e, index) => {
    setDraggedListIndex(index);
    e.dataTransfer.setData("listIndex", index);
  };

  const handleListDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleListDrop = (e, targetIndex) => {
    if (draggedListIndex === null) return;

    const newListOrder = [...allboard.boards[allboard.active].list];
    const [removed] = newListOrder.splice(draggedListIndex, 1);
    newListOrder.splice(targetIndex, 0, removed);

    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, i) =>
        i === prev.active ? { ...board, list: newListOrder } : board
      ),
    }));
    setDraggedListIndex(null);
  };

  return (
    <div className="flex overflow-x-scroll p-4 space-x-4 flex-grow">
      {allboard.boards[allboard.active].list.map((list, index) => (
        <div
          key={list.id}
          draggable
          onDragStart={(e) => handleListDragStart(e, index)}
          onDragOver={(e) => handleListDragOver(e, index)}
          onDrop={(e) => handleListDrop(e, index)}
          className="draggable-list"
        >
          <List
            list={list}
            index={index}
            deleteList={() => deleteList(index)}
            editCard={editCard}
            deleteCard={deleteCard}
          />
        </div>
      ))}
      <AddList
        getlist={(title) => {
          const newList = [...allboard.boards[allboard.active].list];
          newList.push({
            id: Math.random().toString(36).substr(2, 9),
            title,
            items: [],
          });
          setAllBoard((prev) => ({
            ...prev,
            boards: prev.boards.map((board, i) =>
              i === prev.active ? { ...board, list: newList } : board
            ),
          }));
        }}
      />
    </div>
  );
};

export default Main;
