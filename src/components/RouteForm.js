import React, { useState } from 'react';
import { StepLabel, Step, Paper, Button, Stepper, Box, Divider } from '@mui/material';
import { Add, DeleteOutline, LocationOn, MyLocation, WhereToVote } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { insertPlace, setPlaces } from '../actions/places';
import { insertLocation, setLocations } from '../actions/locations';
import PlaceBox from './PlaceBox';

export default function RouteForm() {
    const places = useSelector((state) => state.places)
    const dispatch = useDispatch()

    const addItem = () => {
        if (places[places.length - 1] != "") {
            dispatch(insertPlace("", places.length))
            dispatch(insertLocation("", places.length))
        }
    }

    const clearAll = () => {
        dispatch(setPlaces(["", ""]))
        dispatch(setLocations(["", ""]))
    }

    return (
        <Paper elevation={24} sx={{ p: 3 }}>
            <Stepper orientation="vertical" sx={{ overflowY: "auto", maxHeight: '80%', width: 320 }}>
                <Step>
                    <StepLabel sx={{ color: places[0].length != "" && "primary.dark" }} alternativeLabel StepIconComponent={LocationOn}>
                        <PlaceBox id={0} label="Başlangıç" />
                    </StepLabel>
                </Step>
                {places.slice(2, places.length).map((item, index) => (
                    <Step>
                        <StepLabel sx={{ color: places[index + 2].length != "" && "primary.dark" }} alternativeLabel StepIconComponent={MyLocation}>
                            <Box key={index}>
                                <PlaceBox id={index + 2} key={index} label="Hedef" />
                            </Box>
                        </StepLabel>
                    </Step>
                ))}
                <Step>
                    <StepLabel sx={{ color: places[1].length != "" && "primary.dark" }} alternativeLabel StepIconComponent={WhereToVote}>
                        <PlaceBox id={1} label="Varış" />
                    </StepLabel>
                </Step>
            </Stepper>
            <Divider sx={{ my: 2 }} />
            <Button fullWidth color="primary" variant="text" startIcon={<Add />} onClick={addItem}>
                Hedef Ekle
            </Button>
            <Button fullWidth color="error" variant="text" startIcon={<DeleteOutline />} onClick={clearAll} sx={{ mt: 2 }}>
                Tümünü Temizle
            </Button>
        </Paper>
    );
}