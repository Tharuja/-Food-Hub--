import React from 'react';
import SimpleMap from "./SimpleMap"


export class Map1 extends React.Component  {

    render() {
    
        return (<div style={{"width":"30%", "height" : "30%"}}>
            <SimpleMap lat={6.935741} lng={79.844721} name={'KFC'} />
        </div>)
    }
}