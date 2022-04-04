import { useState, useEffect } from "react";
import Map, { Popup, Marker } from "react-map-gl";
import { Button } from "react-bootstrap";
import Axios from "axios";

export default function HeritageBuildings() {
  const [geopins, setGeopins] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const buildingMarkers = [];

  const fetchHeritageBuildings = () => {
    fetch(
      "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=heritage-sites&q=1"
    )
      .then((res) => res.json())
      .then((result) => {
        for (let key in result.records) {
          for (let internalKey in result.records[key]) {
            let objData = result.records[key][internalKey];
            if (objData.geo_point_2d != undefined) {
              buildingMarkers.push({
                longitude: objData.geo_point_2d[1],
                latitude: objData.geo_point_2d[0],
                name:
                  objData.buildingnamespecifics == "N/A"
                    ? objData.category
                    : objData.buildingnamespecifics,
                id: objData.id,
              });
              break;
            }
          }
        }
        setGeopins(buildingMarkers);
      });
  };

  const addMarkers = () => {
    return geopins.map((ithMarker) => {
      return (
        <Marker
          key={`marker-${ithMarker.id}`}
          id={ithMarker.name}
          latitude={ithMarker.latitude}
          longitude={ithMarker.longitude}
        >
          <button
            key={`markerButtonKey-${ithMarker.id}`}
            id={`markerButtonId-${ithMarker.id}`}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => {
              setSelectedBuilding(ithMarker);
            }}
          >
            <img
              style={{ height: "25px" }}
              src="./building.svg"
              alt={ithMarker.name}
            />
          </button>
        </Marker>
      );
    });
  };

  const addPopup = () => {
    return geopins.map((ithMarker) => {
      return selectedBuilding && selectedBuilding.id == ithMarker.id ? (
        <Popup
          key={`popup-${ithMarker.id}`}
          id={ithMarker.id}
          latitude={ithMarker.latitude}
          longitude={ithMarker.longitude}
          offsetTop={-30}
        >
          <div>
            <p>{ithMarker.name}</p>
            <Button
              variant="outline-secondary"
              onClick={() => {
                Axios.post("http://termproject.rshiratori.com/API/v1/AddFav", {
                  username: window.localStorage.getItem("username"),
                  favName: ithMarker.name,
                  favCat: "Heritage Buildings",
                  lat: ithMarker.latitude,
                  lng: ithMarker.longitude,
                });

                window.alert("Added");
              }}
            >
              Add to favourites
            </Button>
          </div>
        </Popup>
      ) : null;
    });
  };

  useEffect(() => {
    fetchHeritageBuildings();
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
