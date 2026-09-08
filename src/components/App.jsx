import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys when the app first loads.
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Add the newly created toy to the toys displayed on the page.
  function handleToyAdded(newToy) {
    setToys((currentToys) => [...currentToys, newToy]);
  }

  // Delete a toy from the backend and then remove it from the page.
  function handleDonate(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE",
    }).then(() => {
      setToys((currentToys) =>
        currentToys.filter((toy) => toy.id !== toyId)
      );
    });
  }

  // Increase a toy's likes in the backend and update it in the same position.
  function handleLike(toy) {
    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikes,
      }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((currentToy) =>
            currentToy.id === updatedToy.id ? updatedToy : currentToy
          )
        );
      });
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm onToyAdded={handleToyAdded} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        onDonate={handleDonate}
        onLike={handleLike}
      />
    </>
  );
}

export default App;