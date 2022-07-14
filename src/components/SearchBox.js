/* global google */
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from 'react';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { removeLocation, setLocations, updateLocation } from '../actions/locations';
import { insertPlace, setPlaces, updatePlace, removePlace } from '../actions/places';
import { ClearRounded } from '@mui/icons-material';

export default function PlacesWithStandaloneSearchBox(props) {
    const dispatch = useDispatch()
    const inputElement = useRef()
    const [value, setValue] = useState("")
    const places = useSelector((state) => state.places)
    const { id, item } = props

    const handlePlaceChange = () => {
        const getPlaces = inputElement.current.getPlaces()[0]
        dispatch(updatePlace(getPlaces.formatted_address, id))
        dispatch(updateLocation(getPlaces.geometry.location, id))
    }

    const removeItem = () => {
        if (id == 0 || id == places.length - 1) {
            dispatch(updatePlace("", id))
            dispatch(updateLocation("", id))
        }
        else {
            dispatch(removePlace(id))
            dispatch(removeLocation(id))
        }
    };

    useEffect(() => {
        if (!item || id != places.length - 1)
            setValue(places[id])
    }, [places]);

    return (
        <StandaloneSearchBox
            ref={inputElement}
            onPlacesChanged={handlePlaceChange}>
            <TextField value={value} onChange={e => setValue(e.target.value)} size='small' variant="outlined" placeholder={props.placeholder}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton edge="end" onClick={removeItem}><ClearRounded /></IconButton>
                    </InputAdornment>
                }}>
            </TextField>
        </StandaloneSearchBox>
    )
}