import React from 'react';
import CustomerForm from "./CustomerForm";
import OrderMap from "./OrderMap";

import {Row, Col} from 'antd';

function CreateOrder(props) {


    return (
    <div id='create-order'>
        <Row gutter={16} justify={'center'}>
            <Col span={10}>
                <CustomerForm/>
            </Col>

            <Col span={10}>
                <OrderMap/>
            </Col>
        </Row>

    </div>


    );
}

export default CreateOrder;