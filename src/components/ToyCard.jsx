import React from "react";

function ToyCard({ toy, onDonate, onLike }) {
  // Tell App which toy was liked.
  function handleLike() {
    onLike(toy);
  }

  // Tell App which toy should be donated.
  function handleDonate() {
    onDonate(toy.id);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>

      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />

      <p>{toy.likes} Likes </p>

      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>

      <button className="del-btn" onClick={handleDonate}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;