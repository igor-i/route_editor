import React from 'react';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { compose, withProps, lifecycle } from 'recompose';

const SearchBox = compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const newPlace = refs.searchBox.getPlaces();
          this.props.onPlaceAdded(newPlace);
        },
      });
    },
  }),
  withScriptjs,
)(props => (
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="Введите адрес"
          value={props.valueAddress}
          onChange={props.onValueAddressChanged}
        />
      </div>
    </StandaloneSearchBox>
    <div className="list-group">
      {props.places.map(({ place_id: placeId, formatted_address: formattedAddress, geometry: { location } }) => ( // eslint-disable-line
        <div className="list-group-item list-group-item-action flex-column align-items-start" key={placeId}>
          <p className="mb-1">{formattedAddress}</p>
          <small>{location.lat()}, {location.lng()}</small>
        </div>
      ))}
    </div>
  </div>
));

export default SearchBox;
