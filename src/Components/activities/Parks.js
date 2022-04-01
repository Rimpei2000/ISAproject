import React, { useState } from "react";

function Parks() {
  const [parks, setParks] = useState("");

  const search = () => {
    fetch(
      "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parks&q=&facet=specialfeatures&facet=facilities&facet=washrooms&facet=neighbourhoodname"
    )
      .then((res) => res.json())
      .then((result) => {
        setParks(result);
        console.log(result);
      });
  };

  return (
    <div style={{ backgroundColor: "green", width: "100%", height: "80%" }}>
      <button onClick={{ search }}>Click me</button>
    </div>
  );
}

export default Parks;
