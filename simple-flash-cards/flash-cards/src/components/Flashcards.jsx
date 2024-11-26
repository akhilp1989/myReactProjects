/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./flashcards.css";

const cards = [
  { id: 1, front: "T1", back: "T11" },
  { id: 2, front: "T2", back: "T22" },
  { id: 4, front: "T4", back: "T44" },
  { id: 3, front: "T3", back: "T33" },
  { id: 5, front: "T5", back: "T55" },
];
const getClassName = (id, select) => {
  return id === select ? "selected" : "cards";
};
export const FlashCards = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const toggleSelectedCard = (id) => {
    if (id === selectedCard) return setSelectedCard(0);
    return setSelectedCard(id);
  };
  return (
    <div className="cards-wrapper">
      {cards?.map((c) => {
        return (
          <button
            className={getClassName(c?.id, selectedCard)}
            key={c?.id}
            onClick={() => toggleSelectedCard(c.id)}
          >
            {selectedCard === c.id ? c?.back : c?.front}
          </button>
        );
      })}
    </div>
  );
};
