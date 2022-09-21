import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { getPlacesData } from '../../api';
import List from '../List/List';
import Map from '../Map/Map';
import Search from '../Search/Search';


const Home: React.FC = () => {

    const [places, setPlaces] = useState<string[]>([]);
    const [filteredPlaces, setFilteredPlaces] = useState<string[]>([]);

    const [childClicked, setChildClicked] = useState<string | null>(null);

    const [coordinates, setCoordinates] = useState<{lat: number; lng: number}>({lat:0,lng:0});
    const [bounds, setBounds] = useState<{sw: number; ne: number}>({sw: 0,ne: 0});

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [type, setType] = useState<string>('restaurants');
    const [rating, setRating] = useState<number | string>('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filtered = places.filter((place: string | any) => Number(place.rating) > rating);

        setFilteredPlaces(filtered);
    }, [rating]);

    useEffect(() => {
        if(bounds.sw && bounds.ne) {
        setIsLoading(true);

        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            setPlaces(data.filter((place: string | any) => place.name && place.num_reviews > 0));
            setFilteredPlaces([])
            setIsLoading(false);
        })
        }
    }, [type, bounds]);

  return (
    <>
    <Search setCoordinates={setCoordinates} />
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

