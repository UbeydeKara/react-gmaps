import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

import { removeLocation, setLocations, updateLocation } from '../actions/locations';
import { insertPlace, setPlaces, updatePlace, removePlace } from '../actions/places';

const autocompleteService = { current: null };
const placeService = { current: null };

export default function PlaceBox(props) {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const { id, label } = props
    const dispatch = useDispatch()
    const places = useSelector((state) => state.places)

    const fetch = useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    const fetchPlaceDetail = useMemo(
        () =>
            throttle((request, callback) => {
                placeService.current.getDetails(request, callback);
            }, 200),
        [],
    );

    const handlePlaceChange = (place_id, address) => {
        fetchPlaceDetail({ placeId: place_id }, (results) => {
            dispatch(updatePlace(address, id))
            dispatch(updateLocation(results.geometry.location, id))
        });
    }

    const removeItem = () => {
        if (id == 0 || id == 1) {
            dispatch(updatePlace("", id))
            dispatch(updateLocation("", id))
        }
        else {
            dispatch(removePlace(id))
            dispatch(removeLocation(id))
        }
    };

    useEffect(() => {
        autocompleteService.current =
            new window.google.maps.places.AutocompleteService();

        placeService.current =
            new window.google.maps.places.PlacesService(document.getElementById('google-map-demo'));
    }, []);

    useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({
            input: inputValue, bounds: new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(40.1639758, 31.9186571),
                new window.google.maps.LatLng(40.1639758, 31.9186571)
            )
        }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    useEffect(() => {
        setValue(places[id])
    }, [places]);

    return (
        <Autocomplete
            id="google-map-demo"
            sx={{ width: 250 }}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            size='small'
            value={value}
            noOptionsText="Konum bulunamadı"
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);

                if (newValue)
                    handlePlaceChange(newValue.place_id, newValue.description)
                else
                    removeItem()
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label={label} fullWidth />
            )}
            renderOption={(props, option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Box
                                    component={LocationOnIcon}
                                    sx={{ color: 'text.secondary', mr: 2 }}
                                />
                            </Grid>
                            <Grid item xs>
                                {parts.map((part, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontWeight: part.highlight ? 700 : 400,
                                        }}
                                    >
                                        {part.text}
                                    </span>
                                ))}

                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}
