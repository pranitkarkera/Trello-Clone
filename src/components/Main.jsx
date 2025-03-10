import React, { useContext } from "react";
import Header from "./Header";
import List from "./List";
import AddList from "./AddList";
import { BoardContext } from "../context/BoardContext";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Check if the item is being dropped over another item
    if (active.id !== over.id) {
      // Check if the dragged item is a card
      const activeListIndex = bdata.list.findIndex((list) =>
        list.items.some((item) => item.id === active.id)
      );

      const overListIndex = bdata.list.findIndex((list) =>
        list.items.some((item) => item.id === over.id)
      );

      if (activeListIndex !== -1 && overListIndex !== -1) {
        // Rearranging cards within the same list
        const newList = [...bdata.list];
        const activeCardIndex = newList[activeListIndex].items.findIndex(
          (item) => item.id === active.id
        );
        const overCardIndex = newList[overListIndex].items.findIndex(
          (item) => item.id === over.id
        );

        // Move the card
        const [movedCard] = newList[activeListIndex].items.splice(
          activeCardIndex,
          1
        );
        newList[overListIndex].items.splice(overCardIndex, 0, movedCard);

        // Update the board state
        setAllBoard((prev) => ({
          ...prev,
          boards: prev.boards.map((board, index) =>
            index === prev.active ? { ...board, list: newList } : board
          ),
        }));
      } else if (activeListIndex === -1 && overListIndex === -1) {
        // Rearranging lists
        const newListOrder = [...bdata.list];
        const activeListIndex = newListOrder.findIndex(
          (list) => list.id === active.id
        );
        const overListIndex = newListOrder.findIndex(
          (list) => list.id === over.id
        );

        const [movedList] = newListOrder.splice(activeListIndex, 1);
        newListOrder.splice(overListIndex, 0, movedList);

        // Update the board state
        setAllBoard((prev) => ({
          ...prev,
          boards: prev.boards.map((board, index) =>
            index === prev.active ? { ...board, list: newListOrder } : board
          ),
        }));
      }
    }
  };

  const addCard = (title, listIndex) => {
    if (!title) return;
    const newList = [...bdata.list];
    newList[listIndex].items.push({
      id: Math.random().toString(36).substr(2, 9),
      title,
    });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  const deleteList = (index) => {
    let newList = [...bdata.list];
    newList.splice(index, 1);

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  const resetBoard = () => {
    const resetBoardData = {
      id: bdata.id, // Keep the same ID
      name: bdata.name, // Keep the same name
      bgcolor: bdata.bgcolor, // Keep the same background color
      list: [], // Reset the list to empty
    };

    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, index) =>
        index === prev.active ? resetBoardData : board
      ),
    }));
  };

  const deleteBoard = () => {
    const updatedBoards = allboard.boards.filter(
      (_, index) => index !== allboard.active
    );
    setAllBoard({
      ...allboard,
      boards: updatedBoards,
      active: Math.max(0, allboard.active - 1), // Set active to the previous board or the first one
    });
  };

  const addList = (title) => {
    if (!title) return;
    const newList = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      items: [],
    };
    const updatedBoard = {
      ...allboard,
      boards: allboard.boards.map((board, index) =>
        index === allboard.active
          ? { ...board, list: [...board.list, newList] }
          : board
      ),
    };
    setAllBoard(updatedBoard);
  };

  return (
    <main
      className="flex-1 overflow-y-auto flex flex-col"
      style={{ backgroundColor: bdata.bgcolor }}
    >
      <div className="p-4 bg-gray-800 flex justify-between items-center">
        <h2 className="text-lg text-white">{bdata.name}</h2>
        <div className="flex space-x-2">
          <button
            onClick={resetBoard}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset Board
          </button>
          <button
            onClick={deleteBoard}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Board
          </button>
        </div>
      </div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={bdata.list.flatMap((list) =>
            list.items.map((item) => item.id)
          )}
          strategy={rectSortingStrategy}
        >
          <div className="flex overflow-x-scroll p-4 space-x-4 flex-grow">
            {bdata.list.map((list, index) => (
              <List
                key={list.id}
                list={list}
                index={index}
                deleteList={deleteList}
                addCard={(title) => addCard(title, index)}
              />
            ))}
            <AddList getlist={(title) => addList(title)} />
          </div>
        </SortableContext>
      </DndContext>
    </main>
  );
};

export default Main;
