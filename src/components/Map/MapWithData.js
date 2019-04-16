/*global google*/

import React, {PureComponent} from 'react';
import  { compose, withProps, lifecycle } from 'recompose';
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps';
import classes from './MapWithData.module.css';

class MapWithData extends PureComponent {

render() {

    const originStarter = this.props.location[0].value;
    var destinationPoint = this.props.location[this.props.location.length - 1].value;
    const wypt = this.props.waypoints;    

    const DirectionsComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKI87rlfOa_uqQKw2gNuf62bDkz_nlyAs",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{height: `90vh`, width: `100%` }}  />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() { 
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: originStarter,
            destination: destinationPoint,
            waypoints: wypt,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: {...result},
                markers: true
              })
            } else {
              alert("Одна из указанных вами точек не существует или находится за океаном, попробуйте ее изменить. Также попробуйте добавить уточняющее слово перед точкой (напр. город Пушкин вместо Пушкин)");
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )((props) => {

      const googleMap = (<GoogleMap defaultZoom={3}>
                              {props.directions && <DirectionsRenderer
                                                         directions={props.directions} 
                                                         suppressMarkers={props.markers}/>}
                          </GoogleMap>)

      if (props.directions !== undefined) {
        let sum = ((props.directions.routes[0].legs
          .reduce((accumulator, currentValue) => accumulator + currentValue.distance.value, 0)) / 1000)
          .toFixed();
      
          return (<div>
                    <p className={classes.DestLine}>Приблизительная дистанция пути: {sum} км</p>
                    {googleMap}
                  </div>)
      } else {  
          return googleMap 
        } 
    });
return (
        <DirectionsComponent
        />
        )
  }
}

export default MapWithData;