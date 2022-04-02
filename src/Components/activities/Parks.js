import react, { useState, useEffect } from "react";
import Map, { Popup, Marker } from "react-map-gl";
import Axios from 'axios';
export default function Parks() {
  const [geopins, setGeopins] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const parkMarkers = [];

  const fetchParks = () => {
    fetch(
      "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parks&q=&facet=specialfeatures&facet=facilities&facet=washrooms&facet=neighbourhoodname"
    )
      .then((res) => res.json())
      .then((result) => {
        // setParks(result);
        for (let key in result.records) {
          for (let internalKey in result.records[key]) {
            let objData = result.records[key][internalKey];
            if (objData.googlemapdest != undefined) {
              parkMarkers.push({
                longitude: objData.googlemapdest[1],
                latitude: objData.googlemapdest[0],
                name: objData.name,
                id: objData.parkid,
              });
              break;
            }
          }
        }
        setGeopins(parkMarkers);
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
              setSelectedPark(ithMarker);
            }}
          >
            <img
              style={{ height: "25px" }}
              src="./parks.svg"
              alt={ithMarker.name}
            />
          </button>
        </Marker>
      );
    });
  };

  const addPopup = () => {
    return geopins.map((ithMarker) => {
      return selectedPark && selectedPark.id == ithMarker.id ? (
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

  const incrementRequest = async() => {
    Axios.get("http://localhost:3022/API/v1/Parks")
  }

  useEffect(() => {
    fetchParks();
    incrementRequest()
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
