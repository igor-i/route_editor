import url from 'url';
import React from 'react';
import MyGoogleMap from './MyGoogleMap';
import SearchBox from './SearchBox';

const googleApiKey = 'AIzaSyCK8-92X3r7Y_HeXNmSeTEX2BvL-0XETEs';
const googleURL = url.format({
  protocol: 'https:',
  hostname: 'maps.googleapis.com',
  pathname: '/maps/api/js',
  query: {
    key: googleApiKey,
    v: '3.exp',
    libraries: 'geometry,drawing,places',
  },
});

export default class App extends React.Component {
  state = {
    defaultCenter: { lat: 55.753215, lng: 37.622504 },
    defaultZoom: 13,
    places: [],
    valueAddress: '',
    directions: [],
    mustRequestDirections: false,
  };

  handleValueAddressChange = e => this.setState({ valueAddress: e.target.value });

  handlePlacesChange = (newPlace) => {
    const places = [...this.state.places, ...newPlace];
    this.setState({ places, valueAddress: '', mustRequestDirections: true });
  }

  handleDirectionsChange = directions =>
    this.setState({ directions, mustRequestDirections: false });

  render() {
    // const { text, data } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4" id="heading">Редактор маршрутов</h1>
          <p className="lead">Квалификационное задание для разработчиков JavaScript</p>
          <hr className="my-4" />
          <p>
            Редактор маршрутов — одностраничное приложение, в котором пользователь в интерактивном
            режиме может создавать на карте маршрут, указывая начальную, конечную и промежуточные
            точки движения. Для каждой точки маршрута можно посмотреть её адрес.
          </p>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <SearchBox
                googleMapURL={googleURL}
                onValueAddressChanged={this.handleValueAddressChange}
                onPlaceAdded={this.handlePlacesChange}
                places={this.state.places}
                valueAddress={this.state.valueAddress}
              />
            </div>
            <div className="col-8">
              <MyGoogleMap
                googleMapURL={googleURL}
                places={this.state.places}
                defaultCenter={this.state.defaultCenter}
                defaultZoom={this.state.defaultZoom}
                directions={this.state.directions}
                onDirectionAdded={this.handleDirectionsChange}
                mustRequestDirections={this.state.mustRequestDirections}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
