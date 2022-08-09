import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Stack, TextField, Typography, StepLabel, Step, Paper, Button, Stepper, Box, Fade } from '@mui/material';
import { Clear, Add, LocationOn } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { insertPlace, setPlaces } from '../actions/places';
import { insertLocation, setLocations } from '../actions/locations';
import PlaceBox from './PlaceBox';

export default function RouteForm() {
    const places = useSelector((state) => state.places)
    const dispatch = useDispatch()

    const ContentStyle = styled('div')(({ theme }) => ({
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(6, 0),
    }));

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
        <ContentStyle>
            <Paper elevation={4} sx={{ p: 3, borderCollapse: 'separate', borderSpacing: '0 15px' }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ color: 'e8f2f5', borderColor: 'e8f2f5' }}>
                    <PlaceBox id={0} label="Başlangıç" />
                    {places.slice(2, places.length).map((item, index) => (
                        <Fade key={index} in={true}>
                            <Box key={index}>
                                <PlaceBox id={index + 2} key={index} label="Hedef" />
                            </Box>
                        </Fade>
                    ))}
                    <PlaceBox id={1} label="Varış" />
                    <Button variant="contained" size="small" sx={{ minWidth: 44 }} onClick={clearAll}>
                        <Clear />
                    </Button>
                </Stack>
                <Button fullWidth color="inherit" variant="text" sx={{ my: 2 }} onClick={addItem}>
                    <Add /> Hedef Ekle
                </Button>
                <Stepper xs={{ width: '100%' }}>
                    {places[0] != "" ?
                        <Fade in={true}>
                            <Step>
                                <StepLabel>{places[0].length > 25 ? places[0].substr(0, 25) + '...' : places[0]}</StepLabel>
                            </Step>
                        </Fade> : null}
                    {places.length > 2 ? places.slice(2, places.length).filter(x => x != "")
                        .map((e, i) => (
                            <Fade key={i} in={true}>
                                <Step>
                                    <StepLabel>{e.length > 25 ? e.substr(0, 25) + '...' : e}</StepLabel>
                                </Step>
                            </Fade>
                        )) : null}
                    {places[1] != "" ?
                        <Fade in={true}>
                            <Step>
                                <StepLabel>{places[1].length > 25 ? places[1].substr(0, 25) + '...' : places[1]}</StepLabel>
                            </Step>
                        </Fade> : null}
                </Stepper>
            </Paper>
        </ContentStyle>
    );
}