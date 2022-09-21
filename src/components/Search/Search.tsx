import React,  {useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './style.js';

const Search = ({ setCoordinates }:number | any) => {

    const classes = useStyles();
    const [autocomplete, setAutcomplete] = useState<any>(null);

    const onLoad = (autoC:any) => setAutcomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({lat, lng})
    }

    return (
      
        <Box display="inline-flex">
        <Typography variant="h6" className={classes.title}>
            Recherche Villes
        </Typography>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase placeholder='Recherche...' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
            </Autocomplete>
        </Box>
    );
}

export default Search;