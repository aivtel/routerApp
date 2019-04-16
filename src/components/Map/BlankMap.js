import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const BlankMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultCenter= {{ lat: 55.752121, lng: 37.617664 }}
    defaultZoom={10}
  />
));


export default BlankMap