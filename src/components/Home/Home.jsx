import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

import { getPlacesData } from '../../api';
import List from '../../components/List/List';
import Map from '../../components/Map/Map';


const Home = () => {

    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);

        setFilteredPlaces(filtered);
    }, [rating]);

    useEffect(() => {
        if(bounds.sw && bounds.ne) {
        setIsLoading(true);

        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([])
            setIsLoading(false);
        })
        }
    }, [type, bounds]);

  return (
    <>
        <Grid container spacing={3} >
            <Grid item xs={12} md={4}>
                <List
                 places={filteredPlaces.length ? filteredPlaces : places}
                 childClicked={childClicked}
                 isLoading={isLoading}
                 type={type}
                 setType={setType}
                 rating={rating}
                 setRating={setRating}
                  />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
    </>
  );
}

export default Home;

