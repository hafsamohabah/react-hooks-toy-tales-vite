import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer() {
  const [toys, setToys] = useState([]);

  // Fetch all toys when the component first loads.
  useEffect(() => {
    fetch("http://localhost:6001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  );
}

export default ToyContainer;