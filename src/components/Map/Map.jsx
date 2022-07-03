import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './marker.scss';

const Marker = (props) => {
    const { color, name, id } = props;

    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        <div className="pulse" />
      </div>
    );
  };

const SimpleMap = ({coords}) => {

  return (
    <div style={{ height: '30vh', width: '30%' }}>
      <GoogleMapReact
        defaultCenter={coords}
        center={coords}
        defaultZoom={11}
      >
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );

}

export default SimpleMap;