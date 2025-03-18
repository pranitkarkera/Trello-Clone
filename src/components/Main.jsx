import React, { useContext } from "react";
import List from "./List";
import AddList from "./AddList";
import { BoardContext } from "../context/BoardContext";

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);

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

    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, i) =>
        i === prev.active ? { ...board, list: newList } : board
      ),
    }));
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

  const handleCardDrop = (e, targetListId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    const sourceListId = e.dataTransfer.getData("sourceListId");

    if (sourceListId === targetListId) {
      // Handle card reordering within the same list
      handleCardReorder(e, targetListId);
      return;
    }

    // Handle card drop between lists
    const newList = [...allboard.boards[allboard.active].list];

    // Find the source and target lists
    const sourceListIndex = newList.findIndex(
      (list) => list.id === sourceListId
    );
    const targetListIndex = newList.findIndex(
      (list) => list.id === targetListId
    );

    if (sourceListIndex === -1 || targetListIndex === -1) return;

    // Find the dragged card
    const draggedCardIndex = newList[sourceListIndex].items.findIndex(
      (item) => item.id === cardId
    );
    if (draggedCardIndex === -1) return;

    const draggedCard = newList[sourceListIndex].items[draggedCardIndex];

    // Remove the card from the source list
    newList[sourceListIndex].items.splice(draggedCardIndex, 1);

    // Add the card to the target list
    newList[targetListIndex].items.push(draggedCard);

    // Update the board state
    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, i) =>
        i === prev.active ? { ...board, list: newList } : board
      ),
    }));
  };

  const handleCardReorder = (e, targetListId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");

    const newList = [...allboard.boards[allboard.active].list];
    const listIndex = newList.findIndex((list) => list.id === targetListId);

    if (listIndex === -1) return;

    // Find the dragged card
    const draggedCardIndex = newList[listIndex].items.findIndex(
      (item) => item.id === cardId
    );
    if (draggedCardIndex === -1) return;

    // Calculate the new index based on the drop position
    const targetCardId = e.target.closest(".item")?.dataset?.cardId;
    if (!targetCardId) return;

    const targetCardIndex = newList[listIndex].items.findIndex(
      (item) => item.id === targetCardId
    );
    if (targetCardIndex === -1) return;

    // Reorder the cards
    const [draggedCard] = newList[listIndex].items.splice(draggedCardIndex, 1);
    newList[listIndex].items.splice(targetCardIndex, 0, draggedCard);

    // Update the board state
    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, i) =>
        i === prev.active ? { ...board, list: newList } : board
      ),
    }));
  };

  return (
    <div className="flex overflow-x-scroll p-4 space-x-4 flex-grow">
      {allboard.boards[allboard.active].list.map((list, index) => (
        <List
          key={list.id}
          list={list}
          index={index}
          deleteList={() => deleteList(index)}
          editCard={editCard}
          deleteCard={deleteCard}
          onCardDrop={(e) => handleCardDrop(e, list.id)}
        />
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
