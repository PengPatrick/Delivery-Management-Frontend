import {React,useState} from 'react';
import CustomerForm from "./CustomerForm";
import OrderMap from "./OrderMap";

import {Row, Col} from 'antd';

function CreateOrder(props) {

    const [senderPos, setSenderPos] = useState({})
    const [center, setCenter] = useState({
            lat: 37.72380320461962,
            lng: -122.45591064927576
    })

    const onSelectedNewPosition = (pos) => {
        setSenderPos(pos);
        setCenter(pos)
    }

    console.log(window.google)

    return (
    <div id='create-order'>
        <Row gutter={16} justify={'center'}>
            <Col span={10}>
                <CustomerForm onSelect={onSelectedNewPosition}/>
            </Col>

            <Col span={10}>
                <OrderMap senderPos={senderPos} center={center}/>
            </Col>
        </Row>

    </div>


    );
}

export default CreateOrder;