import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'red',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );
 
class SimpleMap extends Component {
  static defaultProps = {
    zoom: 18
  };
 
  render() {

    // console.log("eval this.props.lng && this.props.lat")
    // console.log(this.props.lng && this.props.lat)
    //   console.log("this.props.lat simple")
    //   console.log(this.props.lat)
    //   console.log("this.props.lng simple")
    //   console.log(this.props.lng)

let comp;

if(this.props.lng && this.props.lat){

  comp =  <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA" }}
          defaultCenter={{'lat' : this.props.lat, 'lng' : this.props.lng}}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.lng}
            text={this.props.name}
          />
        </GoogleMapReact>
      
      }else {
      comp =   <div>loading</div>
      }

    return (
      <div style={{ height: '50vh', width: '100%' }}>
      {comp}
      </div>
      
      
    );
  }
}
 
export default SimpleMap;