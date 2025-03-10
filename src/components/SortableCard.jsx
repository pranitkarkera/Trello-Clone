import React, { useState } from "react";
import { Edit2 } from "react-feather";
import { X} from "react-feather";
import CardModal from "./CardModal";
import ViewCardDetails from "./ViewCardDetails";
import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

const SortableCard = ({ item, editCard, deleteCard }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleEdit = (newTitle, newDescription, newDueDate) => {
    editCard(item.id, newTitle, newDescription, newDueDate);
    setShowEditModal(false); // Close the edit modal after editing
  };

  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: item.id,
  });

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`item flex justify-between text-white items-center bg-zinc-500 p-1 cursor-pointer rounded-md border-2 border-gray-700 hover:border-gray-500 ${
          isDragging ? "opacity-50" : ""
        }`}
        onClick={() => setShowViewModal(true)} // Open view modal on card click
      >
        <span>{item.title}</span>
        <div className="flex">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click event
              setShowEditModal(true);
            }}
            className="hover p-1 rounded-sm"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click event
              console.log("Delete button clicked for card ID:", item.id);
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
          onSave={handleEdit}
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
