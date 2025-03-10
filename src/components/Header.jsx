import React from "react";
import { X } from "react-feather";
import TrelloLogo from "../assets/trello.svg";

const Header = ({ resetBoard }) => {
  return (
    <div className="bg-gray-800 h-16 shrink-0">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <img src={TrelloLogo} alt="Trello Logo" className="h-8" />
          <h3 className="text-white text-lg font-semibold">Trello</h3>
        </div>
        <div className="right flex items-center space-x-4">
          <span className="text-white">Pranit Karkera</span>
          <img
            className="rounded-full"
            src="https://placehold.co/28x28/png"
            alt="pranit karker profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
