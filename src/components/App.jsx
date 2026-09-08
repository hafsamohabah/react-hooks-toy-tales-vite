import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys when the app first loads.
  useEffect(() => {
    fetch("http://localhost:6001/toys")
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
    fetch(`http://localhost:6001/toys/${toyId}`, {
      method: "DELETE",
    }).then(() => {
      setToys((currentToys) =>
        currentToys.filter((toy) => toy.id !== toyId)
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

      <ToyContainer toys={toys} onDonate={handleDonate} />
    </>
  );
}

export default App;