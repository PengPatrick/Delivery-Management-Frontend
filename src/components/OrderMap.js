import React from 'react';
import {GoogleMap, LoadScript, Marker, useLoadScript, useJsApiLoader} from '@react-google-maps/api';
import {GOOGLE_API_KEY} from "../constants";
import {robot_icon} from '../assets/images/robot_icon.svg'
import { Loader } from '@googlemaps/js-api-loader';

const containerStyle = {
    width: '600px',
    height: '550px'
};

const center = {
    lat: 37.72380320461962,
    lng: -122.45591064927576
};

const position = [

    {
        lat: 37.72380320461962,
        lng: -122.45591064927576
    },
    {
        lat: 37.728,
        lng: -122.468
    },
    {
        lat: 37.73925631161515,
        lng: -122.44784779119395
    }
]

const robotIcon = {
    path: 'M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z',
    fillColor: "blue",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.05,
    // anchor: new google.maps.Point(15, 30),
};


const libraries = ['places']

function OrderMap(props) {

    // const {isLoaded, loadError} = useLoadScript({
    //     googleMapsApiKey: process.env.GOOGLE_API_KEY,
    //     libraries,
    // })

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
        // ...otherOptions
    })

    // const loader = new Loader({
    //     apiKey: "",
    //     version: "weekly",
    //     libraries: ["places"]
    // });


    return (

        <div>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}

            >

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                >
                    {/*<Marker*/}
                    {/*    // icon={svgMarker}*/}
                    {/*    position={position[0]}*/}
                    {/*/>*/}

                    {/*<Marker*/}
                    {/*    icon={{*/}
                    {/*        url:'/robot_icon.svg',*/}
                    {/*        // scaledSize: new window.google.maps.Size(30,30)*/}
                    {/*        // scaledSize: new window.google.maps.Size(30,30),*/}
                    {/*        // origin: new window.google.maps.Point(0,0);*/}
                    {/*    }}*/}
                    {/*    position={position[0]}*/}
                    {/*>*/}
                    {/*</Marker>*/}
                    <Marker
                        icon={robotIcon}
                        position={position[0]}
                    />
                    <Marker
                        icon={robotIcon}
                        position={position[1]}
                    />
                    <Marker
                        icon={robotIcon}
                        position={position[2]}
                    />


                </GoogleMap>
            </LoadScript>

        </div>

    );
}

export default OrderMap;