import react, { useState, useEffect } from "react";
import Map, { Popup, Marker } from "react-map-gl";

export default function StreetFoodLocations() {
  const [geopins, setGeopins] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const streetFoodMarkers = [];

  const fetchStreetFoodLocs = () => {
    fetch(
      "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=food-vendors&q=&rows=100&facet=vendor_type&facet=status&facet=geo_localarea"
    )
      .then((res) => res.json())
      .then((result) => {
        for (let key in result.records) {
          for (let internalKey in result.records[key]) {
            let objData = result.records[key][internalKey];
            if (objData.geom != undefined) {
              streetFoodMarkers.push({
                longitude: objData.geom.coordinates[0],
                latitude: objData.geom.coordinates[1],
                name: objData.description,
                id: objData.key,
              });
              break;
            }
          }
        }
        setGeopins(streetFoodMarkers);
      });
  };

  const addMarkers = () => {
    return geopins.map((ithMarker) => {
      return (
        <Marker
          key={ithMarker.id}
          id={ithMarker.name}
          latitude={ithMarker.latitude}
          longitude={ithMarker.longitude}
        >
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => {
              setSelectedFood(ithMarker);
            }}
          >
            <img
              style={{ height: "25px" }}
              src="./food.svg"
              alt={ithMarker.name}
            />
          </button>
        </Marker>
      );
    });
  };

  const addPopup = () => {
    return geopins.map((ithMarker) => {
      return selectedFood && selectedFood.id == ithMarker.id ? (
        <Popup
          id={ithMarker.id}
          latitude={ithMarker.latitude}
          longitude={ithMarker.longitude}
          offsetTop={-30}
        >
          <div>
            <p>{ithMarker.name}</p>
            <button>Add to favourites</button>
          </div>
        </Popup>
      ) : null;
    });
  };

  useEffect(() => {
    fetchStreetFoodLocs();
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: -123.19258095208848,
        latitude: 49.25901995475811,
        zoom: 11,
      }}
      style={{
        width: "100vw",
        height: "100vh",
        fog: {
          range: [-0.5, 3],
          color: "white",
          "horizon-blend": 0.1,
        },
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoiYmh1cGVzaGQiLCJhIjoiY2wxNXN1ZWVwMGoxNTNjcDhkZHh5Z2NsaCJ9.G67FI-pS8DZRWCX5Nt1vrA"
    >
      {addMarkers()}
      {addPopup()}
    </Map>
  );
}
