import React from "react";

const ViewCardDetails = ({ card, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-zinc-700 rounded-md p-4 w-80">
        <h2 className="text-white font-semibold mb-2">{card.title}</h2>
        <p className="text-white mb-2">{card.description}</p>
        <p className="text-white">
          Due Date: {card.dueDate || "No due date set"}
        </p>
        <button
          onClick={onClose}
          className="mt-4 p-1 rounded bg-red-500 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewCardDetails;
