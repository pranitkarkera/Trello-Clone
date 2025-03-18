import React, { useState, useEffect } from "react";

const CardModal = ({ onClose, onSave, card }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description || "");
      setDueDate(card.dueDate || "");
    }
  }, [card]);

  const handleSave = () => {
    onSave(title, description, dueDate); // Pass updated details to the parent
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white rounded-md p-4 w-80 border-2 border-black-100">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Card Title"
          className="p-1 w-full rounded-md border-2 bg-white border-zinc-900 mb-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Card Description"
          className="p-1 w-full rounded-md border-2 bg-white border-zinc-900 mb-2"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-1 w-full rounded-md border-2 bg-white border-zinc-900 mb-2"
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={handleSave}
            className="p-1 rounded bg-sky-600 text-white mr-2"
          >
            Update
          </button>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
