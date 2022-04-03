import { useState, useEffect } from "react";
import Map, { Popup, Marker } from "react-map-gl";
import Axios from "axios";

export default function Favourites() {
  const [geopins, setGeopins] = useState([]);
  const [selectedFavourites, setSelectedFavourites] = useState(null);
  const favouriteMarkers = [];

  const fetchFavourites = async () => {
    Axios.get("http://localhost:3022/API/v1/GetFav", {
      params: { username: window.localStorage.getItem("username") },
    })
      .then((res) => res)
      .then((result) => {
        console.log(result.data.rows);
        for (let key in result.data.rows) {
          for (let internalKey in result.data.rows[key]) {
            let objData = result.data.rows[key];
            favouriteMarkers.push({
              longitude: objData.fav_lng,
              latitude: objData.fav_lat,
              name: objData.fav_item_name,
              category: objData.fav_cat,
              image:
                objData.fav_cat == "Parks"
                  ? `./parks.svg`
                  : objData.fav_cat == "Heritage Buildings"
                  ? `./building.svg`
                  : `./food.svg`,
            });
            break;
          }
        }
        setGeopins(favouriteMarkers);
      });
  };

  const addMarkers = () => {
    return geopins.map((ithMarker) => {
      return (
        <Marker
          key={`marker-${ithMarker.latitude}`}
          id={ithMarker.name}
          latitude={ithMarker.latitude}
          longitude={ithMarker.longitude}
        >
          <button
            key={`markerButtonKey-${ithMarker.latitude}`}
            id={`markerButtonId-${ithMarker.id}`}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => {
              setSelectedFavourites(ithMarker);
            }}
          >
            <img
              style={{ height: "25px" }}
              src={ithMarker.image}
              alt={ithMarker.name}
            />
          </button>
        </Marker>
      );
    });
  };

  const addPopup = () => {
    return geopins.map((ithMarker) => {
      return selectedFavourites &&
        selectedFavourites.latitude == ithMarker.latitude ? (
        <Popup
          key={`popup-${ithMarker.latitude}`}
          id={`popup-${ithMarker.id}`}
          latitude={ithMarker.latitude}
          longitude={ithMarker.longitude}
          offsetTop={-30}
        >
          <div>
            <p>{ithMarker.name}</p>
            <p>{ithMarker.category}</p>
          </div>
        </Popup>
      ) : null;
    });
  };

  useEffect(() => {
    fetchFavourites();
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
