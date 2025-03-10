import React, { useContext } from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  closestCorners
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { BoardContext } from "../context/BoardContext";
import List from "./List";
import AddList from "./AddList";

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    // Handle list sorting
    if (active.type === "list" && over.type === "list") {
      const newList = [...bdata.list];
      const activeListIndex = newList.findIndex(
        (list) => list.id === active.id
      );
      const overListIndex = newList.findIndex((list) => list.id === over.id);

      if (activeListIndex !== -1 && overListIndex !== -1) {
        const [movedList] = newList.splice(activeListIndex, 1);
        newList.splice(overListIndex, 0, movedList);

        setAllBoard((prev) => ({
          ...prev,
          boards: prev.boards.map((board, index) =>
            index === prev.active ? { ...board, list: newList } : board
          ),
        }));
      }
    }

    // Handle card sorting within or between lists
    if (active.type === "card" && over.type === "card") {
      const newList = [...bdata.list];
      let activeListIndex, overListIndex, activeCardIndex, overCardIndex;

      for (let i = 0; i < newList.length; i++) {
        let cardIndex = newList[i].items.findIndex(
          (item) => item.id === active.id
        );
        if (cardIndex !== -1) {
          activeListIndex = i;
          activeCardIndex = cardIndex;
          break;
        }
      }

      for (let i = 0; i < newList.length; i++) {
        let cardIndex = newList[i].items.findIndex(
          (item) => item.id === over.id
        );
        if (cardIndex !== -1) {
          overListIndex = i;
          overCardIndex = cardIndex;
          break;
        }
      }

      if (activeListIndex === undefined || activeCardIndex === undefined)
        return;

      // Moving card within the same list
      if (activeListIndex === overListIndex) {
        const [movedCard] = newList[activeListIndex].items.splice(
          activeCardIndex,
          1
        );
        newList[activeListIndex].items.splice(overCardIndex, 0, movedCard);
      }
      // Moving card between lists
      else {
        const [movedCard] = newList[activeListIndex].items.splice(
          activeCardIndex,
          1
        );
        newList[overListIndex].items.splice(overCardIndex, 0, movedCard);
      }

      setAllBoard((prev) => ({
        ...prev,
        boards: prev.boards.map((board, index) =>
          index === prev.active ? { ...board, list: newList } : board
        ),
      }));
    }
  };

  const editCard = (id, title, description, dueDate) => {
    const newList = [...bdata.list];
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
      boards: prev.boards.map((board, index) =>
        index === prev.active ? { ...board, list: newList } : board
      ),
    }));
  };

  const deleteCard = (id) => {
    console.log("Deleting card with ID:", id);
    const newList = [...bdata.list];
    for (let i = 0; i < newList.length; i++) {
      newList[i].items = newList[i].items.filter((item) => item.id !== id);
    }

    console.log("Updated list after deletion:", newList);
    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, index) =>
        index === prev.active ? { ...board, list: newList } : board
      ),
    }));
  };

  const deleteList = (index) => {
    const newList = [...bdata.list];
    newList.splice(index, 1);

    setAllBoard((prev) => ({
      ...prev,
      boards: prev.boards.map((board, i) =>
        i === prev.active ? { ...board, list: newList } : board
      ),
    }));
  };


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={bdata.list.map((list) => list.id)}
        strategy={rectSortingStrategy}
      >
        <div className="flex overflow-x-scroll p-4 space-x-4 flex-grow">
          {bdata.list.map((list, index) => (
            <SortableContext
              key={list.id}
              items={list.items.map((item) => item.id)}
            >
              <List
                list={list}
                index={index}
                deleteList={() => deleteList(index)}
                addCard={() => {}}
                deleteCard={deleteCard}
                editCard={editCard}
              />
            </SortableContext>
          ))}
          <AddList
            getlist={(title) => {
              const newList = [...bdata.list];
              newList.push({
                id: Math.random().toString(36).substr(2, 9),
                title,
                items: [],
              });
              setAllBoard((prev) => ({
                ...prev,
                boards: prev.boards.map((board, index) =>
                  index === prev.active ? { ...board, list: newList } : board
                ),
              }));
            }}
          />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Main;
