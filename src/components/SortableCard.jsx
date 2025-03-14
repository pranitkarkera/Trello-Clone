import React, { useState } from "react";
import { Edit2, X } from "react-feather";
import CardModal from "./CardModal";
import ViewCardDetails from "./ViewCardDetails";

const SortableCard = ({ item, editCard, deleteCard }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("type", "card");
    e.dataTransfer.setData("text/plain", item.id);
  };

  return (
    <>
      <div
        className="item flex justify-between text-white items-center bg-zinc-500 p-1 cursor-pointer rounded-md border-2 border-gray-700 hover:border-gray-500"
        onClick={() => setShowViewModal(true)} // Open view modal on click
        draggable
        onDragStart={handleDragStart}
      >
        <span>{item.title}</span>
        <div className="flex">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening view modal
              setShowEditModal(true);
            }}
            className="hover p-1 rounded-sm"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening view modal
              deleteCard(item.id);
            }}
            className="hover p-1 rounded-sm"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      {showEditModal && (
        <CardModal
          onClose={() => setShowEditModal(false)}
          onSave={(newTitle, newDescription, newDueDate) =>
            editCard(item.id, newTitle, newDescription, newDueDate)
          }
          card={item}
        />
      )}
      {showViewModal && (
        <ViewCardDetails card={item} onClose={() => setShowViewModal(false)} />
      )}
    </>
  );
};

export default SortableCard;
