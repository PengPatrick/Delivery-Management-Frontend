import {React, useEffect, useState, useRef} from 'react';
import {GoogleMap, Marker, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import {POSITIONS} from "../constants";


const containerStyle = {
    width: '500px',
    height: '500px'
};

const robotIcon = {
    path: 'M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z',
    fillColor: "blue",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.05,
    // anchor: new google.maps.Point(15, 30),
};

const robotHIcon = {
    path: 'M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z',
    fillColor: "purple",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.05,
    // anchor: new google.maps.Point(15, 30),
};

const userIcon = {
    path:'M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z',
    fillColor: "blue",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.05,
}

const userHIcon = {
    path:'M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z',
    fillColor: "purple",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.05,
}


function OrderMap(props) {

    // const { isLoaded, loadError } = useJsApiLoader({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    //     // ...otherOptions
    // })

    const {senderPos, center, station, receiverPos} = props

    const [response, setResponse] = useState(null)

    const travelMode = 'DRIVING'

    // // DidUpdate:
    // useEffect( () => {
    //
    //
    // }, [props.senderPos])

    const directionsCallback = (response) => {
        console.log(response)

        if (response !== null) {
            if (response.status === 'OK') {
                // this.setState(
                //     () => ({
                //         response
                //     })
                // )
                setResponse(response)
            } else {
                console.log('response: ', response)
            }
        }
    };

    return (

        <div>
            {/*<LoadScript*/}
            {/*    googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}*/}

            {/*>*/}

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
                        icon={station === 0? robotHIcon:robotIcon}
                        position={POSITIONS[0]}
                    />
                    <Marker
                        icon={station === 1? robotHIcon:robotIcon}
                        position={POSITIONS[1]}
                    />
                    <Marker
                        icon={station === 2? robotHIcon:robotIcon}
                        position={POSITIONS[2]}
                    />

                    {
                        Object.keys(senderPos).length === 0?
                            null
                            :
                            <Marker
                                icon={userIcon}
                                position={senderPos}
                            />
                    }

                    {
                        Object.keys(receiverPos).length === 0?
                            null
                            :
                            <Marker
                                icon={userHIcon}
                                position={receiverPos}
                            />
                    }
                    {
                        (
                            station !== -1 &&
                            Object.keys(receiverPos).length !== 0
                        ) && (
                            <DirectionsService
                                // required
                                options={{
                                    destination: receiverPos,
                                    origin: POSITIONS[station],
                                    travelMode: travelMode
                                }}
                                // required
                                callback={directionsCallback}
                            />
                        )
                    }
                    {
                        response !== null && (
                            <DirectionsRenderer
                                // required
                                options={{
                                    directions: response
                                }}
                            />
                        )
                    }
                </GoogleMap>
            {/*</LoadScript>*/}

        </div>

    );
}

export default OrderMap;