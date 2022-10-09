import * as React from "react";
import { useState, useEffect }  from 'react';
import { getAdminBoard } from "../services/user.service";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const API_URL = 'http://localhost:8080/api/test';

const BoardAdmin: React.FC = () => {

  const [content, setContent] = useState<string>("");
  const [pins, setPins] = useState<string[]>([]);
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [currentPlaceId, setCurrentPlaceId] = useState<any>(null);
  const [newPlace, setNewPlace] = useState<any>(null);
  const [title, setTitle] = useState<any>(null);
  const [desc, setDesc] = useState<any>(null);
  const [star, setStar] = useState<any>(0);
  const [viewport, setViewport] = useState<any>({
    latitude: 49.4295387,
    longitude: 2.0807123,
    zoom: 6,
  });
  
  useEffect(() => {
    getAdminBoard ().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(API_URL + "/pin");
        setPins(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id:any, lat:any, long:any) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e:any) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const newPin = {
      username: "guillaume",
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post(API_URL + "/pin", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <header className="jumbotron admin-card">
        <h3>{content}</h3>
      </header>
    
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport:any) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/healmasud/cl1lyr23z002s14qayhdct9wd"
        onDblClick={currentUsername && handleAddClick}
      >
        {Array.isArray(pins)
        ? pins.map((p:any) => (
          <>
           <Marker
              latitude={p.lat}
              longitude={p.long}
                // @ts-ignore
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="cards">
                  <label>Titre</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Description</label>
                  <p className="desc">{p.desc}</p>
                  <label>Note</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Crée par <b>{p.username}</b>
                  </span><br/>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        )) : null}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
                // @ts-ignore
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Titre</label>
                  <input
                    placeholder="Entrer votre titre"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Description du markeur"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Note</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Enregistrer
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
      </ReactMapGL>
    </div>
  );
};
export default BoardAdmin;