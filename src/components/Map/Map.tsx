import React, {useState, useEffect} from 'react';
import { Marker, Popup } from "react-map-gl/dist/esm/index";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js/lib/index";
import axios from 'axios';

import mapStyles from './mapStyles';
import useStyles from './style';

interface Type {
    places?: string[];
    setCoordinates: number | any;
    setBounds: number | any;
    coordinates: number | any;
    setChildClicked: number | any;
}

const Map = ({ setCoordinates, places, setBounds, coordinates, setChildClicked }:Type) => {

    const myStorage = window.localStorage;
    const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
    const [pins, setPins] = useState<any>([]);
    const [currentPlaceId, setCurrentPlaceId] = useState<any>(null);
    const [newPlace, setNewPlace] = useState<any>(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [star, setStar] = useState(0);
    const [viewport, setViewport] = useState<{latitude: number; longitude: number; zoom: number}>({
      latitude: 47.040182,
      longitude: 17.071727,
      zoom: 4,
    });

  const handleMarkerClick = (id:any, lat:any, long:any) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e: { lngLat: [any, any]; }) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const newPin:any = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY?process.env.REACT_APP_GOOGLE_MAPS_API_KEY:''}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.length && places?.map((place:any, i) => (
          <div
            className={classes.markerContainer}
               // @ts-ignore
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography  variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place?.photo ? place?.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
         {pins.map((p:any) => (
                    <>
                      <Marker
                        latitude={p.lat}
                        longitude={p.long}
                        //offsetLeft={-3.5 * viewport.zoom}
                       // offsetTop={-7 * viewport.zoom}
                      >
                        <Room
                          style={{
                            fontSize: 7 * viewport.zoom,
                            color:
                              currentUsername === p.username ? "tomato" : "slateblue",
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
                          <div className="card-marker">
                            <label className='label'>Place</label>
                            <h4 className="place">{p.title}</h4>
                            <label className='label'>Review</label>
                            <p className="desc">{p.desc}</p>
                            <label className='label'>Rating</label>
                            <div className="stars">
                              {Array(p.rating).fill(<Star className="star" />)}
                            </div>
                            <label className='label'>Information</label>
                            <span className="username">
                              Created by <b>{p.username}</b>
                            </span>
                            <span className="date">{format(p.createdAt)}</span>
                          </div>
                        </Popup>
                      )}
                    </>
                  ))}
                  {newPlace && (
                    <>
                      <Marker
                        latitude={newPlace.lat}
                        longitude={newPlace.long}
                        //offsetLeft={-3.5 * viewport.zoom}
                        //offsetTop={-7 * viewport.zoom}
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
                            <label className='label'>Title</label>
                            <input
                              placeholder="Enter a title"
                              autoFocus
                              onChange={(e:any) => setTitle(e.target.value)}
                            />
                            <label className='label'>Description</label>
                            <textarea
                              placeholder="Say us something about this place."
                              onChange={(e:any) => setDesc(e.target.value)}
                            />
                            <label className='label'>Rating</label>
                            <select onChange={(e:any) => setStar(e.target.value)}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            <button type="submit" className="submitButton">
                              Add Pin
                            </button>
                          </form>
                        </div>
                      </Popup>
                    </>
                  )}
      </GoogleMapReact>
    </div>
    
  );
};

export default Map;


