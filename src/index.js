import React, { Suspense, useState } from 'react';
import { render } from 'react-dom';
import Map from './Map';
import { googleMapURL } from './actions/types';
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { setLocations } from './actions/locations';
const RouteForm = React.lazy(() => import("./components/RouteForm"));

function App() {
  const dispatch = useDispatch()
  const [markerLoc, setMarker] = useState({})

  const drawMarker = (e) => {
    setMarker(e.latLng)
  }

  return (
    <>
      <Suspense>
        <RouteForm />
      </Suspense>
      <Map
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
        defaultCenter={{ lat: 38.7450771, lng: 35.420061 }}
        defaultZoom={14}
        markerLoc={markerLoc}
        drawMarker={drawMarker}
      />
    </>
  );
};

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
export default App