import { useState, useEffect } from 'react';
import _ from 'lodash';
import './App.css';

const images = [
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
  "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
  "https://images.unsplash.com/photo-1520763185298-1b434c919102",
  "https://images.unsplash.com/photo-1442458017215-285b83f65851",
  "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
  "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
];

const getShuffledImages = () => {
  const doubleImages = [...images, ...images];
  return _.shuffle(doubleImages);
};

const App = () => {
  const [cards] = useState(getShuffledImages());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices, cards]); // Added cards to the dependency array

  const handleClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
      setFlippedIndices((prev) => [...prev, index]);
    }
  };

  const renderCard = (index) => {
    const isFlipped = flippedIndices.includes(index) || matchedIndices.includes(index);
    return (
      <div
        key={index}
        className={`card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => handleClick(index)}
      >
        {isFlipped ? (
          <img src={cards[index]} alt={`Card ${index}`} />
        ) : (
          <div className="card-back"></div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1 >Memory Game</h1>
      <div className="game-board">
        {cards.map((_, index) => renderCard(index))}
      </div>
    </div>
  );
};

export default App;