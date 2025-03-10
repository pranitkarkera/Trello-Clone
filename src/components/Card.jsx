import React, { useState } from "react";
import { Edit2 } from "react-feather";
import CardModal from "./CardModal";

const Card = ({ card, editCard, deleteCard }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id, newTitle, newDescription, dueDate) => {
    editCard(id, newTitle, newDescription, dueDate);
    setShowModal(false); // Close the modal after editing
  };

  return (
    <div
      className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500"
      onClick={() => setShowModal(true)} // Open modal on card click
    >
      <span>{card.title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the card click event
          setShowModal(true);
        }}
        className="hover:bg-gray-600 p-1 rounded-sm"
      >
        <Edit2 size={16} />
      </button>
      {showModal && (
        <CardModal
          onClose={() => setShowModal(false)}
          onEdit={handleEdit}
          card={card} // Pass the card details to the modal
        />
      )}
    </div>
  );
};

export default Card;
