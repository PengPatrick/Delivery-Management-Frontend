import CreateOrder from "./CreateOrder";
import {Row, Col} from 'antd';
import { Loader } from '@googlemaps/js-api-loader';
import { useLoadScript} from '@react-google-maps/api';

const libraries = ['places']
function App() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env["REACT_APP_GOOGLE_API_KEY"],
        libraries: libraries
    })

    if(!isLoaded){
        return <div>Loading....</div>
    }

    return (
        <CreateOrder/>
    );
}

export default App;
