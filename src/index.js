import React, { Suspense, useState } from 'react';
import { render } from 'react-dom';
import Map from './Map';
import { googleMapURL } from './actions/types';
import { useDispatch, Provider } from "react-redux";
import store from "./store";
import { Stack } from '@mui/material';
import RouteForm from "./components/RouteForm";
import './index.css'

function App() {
  const dispatch = useDispatch()
  const [markerLoc, setMarker] = useState({})

  const drawMarker = (e) => {
    setMarker(e.latLng)
  }

  return (
    <Stack sx={{ height: '100vh' }} direction="row">
      <RouteForm />
      <Map
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: '100%', width: '100%' }} />}
        containerElement={<div style={{ height: '100%', width: '100%' }} />}
        mapElement={<div style={{ height: '100%', width: '100%' }} />}
        defaultCenter={{ lat: 40.1639758, lng: 31.9186571 }}
        defaultZoom={14}
        markerLoc={markerLoc}
        drawMarker={drawMarker}
      />
    </Stack>
  );
};

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
export default App