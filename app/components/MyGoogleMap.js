import _ from 'lodash';
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';

// const lat = map.getBounds().getNorthEast().lat()
// const lng = map.getBounds().getNorthEast().lng()

const MyGoogleMap = compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidUpdate() {
      if (this.props.mustRequestDirections) {
        const { places } = this.props;
        const [origin, ...rest1] = places;
        const [destination, ...rest2] = _.reverse(rest1);
        const waypoints = _.reverse(rest2);
        if (places.length > 1) {
          const DirectionsService = new google.maps.DirectionsService(); // eslint-disable-line
          const waypts = waypoints.map(w => ({ location: w.formatted_address }));
          const orig = new google.maps.LatLng(origin.geometry.location.lat(), origin.geometry.location.lng()); // eslint-disable-line
          const dest = new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng()); // eslint-disable-line
          DirectionsService.route({
            origin: orig,
            destination: dest,
            waypoints: waypts,
            travelMode: google.maps.TravelMode.DRIVING, // eslint-disable-line
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) { // eslint-disable-line
              this.props.onDirectionAdded(result);
            } else {
              console.error(status); // eslint-disable-line
              console.error(result); // eslint-disable-line
            }
          });
        }
      }
    },
  }),
)(props => (
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={props.defaultCenter}
  >
    {props.directions.length === 0 ? null : <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default MyGoogleMap;
