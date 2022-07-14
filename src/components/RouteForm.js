import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Stack, TextField, Typography, StepLabel, Step, Paper, Button, Stepper, Box, Fade } from '@mui/material';
import { Clear, Add, LocationOn } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import PlacesWithStandaloneSearchBox from "./SearchBox";
import { insertPlace, setPlaces } from '../actions/places';
import { insertLocation, setLocations } from '../actions/locations';

export default function RouteForm(props) {
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
            dispatch(insertPlace("", places.length - 1))
            dispatch(insertLocation("", places.length - 1))
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
                    <PlacesWithStandaloneSearchBox id={0} placeholder="Başlangıç" />
                    {places.slice(2, places.length).map((item, index) => (
                        <Fade key={index} in={true}>
                            <Box key={index}>
                                <PlacesWithStandaloneSearchBox item id={index + 1} key={index} placeholder="Hedef" />
                            </Box>
                        </Fade>
                    ))}
                    <PlacesWithStandaloneSearchBox id={places.length - 1} placeholder="Varış" />
                    <Button variant="contained" size="small" sx={{ minWidth: 44 }} onClick={clearAll}>
                        <Clear />
                    </Button>
                </Stack>
                <Button fullWidth color="inherit" variant="text" sx={{ my: 2 }} onClick={addItem}>
                    <Add /> Hedef Ekle
                </Button>
                <Stepper xs={{ width: '100%' }}>

                    {places.map((e, i) => (
                        e == "" ? null :
                            <Fade key={i} in={true}>
                                <Step>
                                    <StepLabel>{e.length > 30 ? e.substr(0, 30) + '...' : e}</StepLabel>
                                </Step>
                            </Fade>
                    ))}
                </Stepper>
            </Paper>
        </ContentStyle>
    );
}