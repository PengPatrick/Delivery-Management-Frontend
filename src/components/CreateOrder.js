import {React, useEffect, useState} from 'react';
import OrderForm1 from "./OrderForm1";
import OrderMap from "./OrderMap";
import {Row, Col} from 'antd';
import {Switch, Route, Redirect} from "react-router-dom";
import OrderForm2 from './OrderForm2';
import OrderForm3 from './OrderForm3';
import OrderForm4 from './OrderForm4';
import {POSITIONS} from "../constants";
import OrderReview from "./OrderReview";

function CreateOrder(props) {

    // todo: login status from main
    // const {isLoggedIn} = props
    // todo: fake loggedIn Status
    const isLoggedIn = true

    // todo: default method selected
    // const {shipMethod} = props
    const shipMethod = 'Robot'


    const [senderPos, setSenderPos] = useState({})
    const [center, setCenter] = useState({
            lat: 37.72380320461962,
            lng: -122.45591064927576
    })
    const [station, setStation] = useState(-1)

    const [receiverPos, setReceiverPos] = useState({})

    const [info, setInfo] = useState({
        'sender_phone_prefix': 1,
        'ship_method': shipMethod,
        'weight':0,
        'length':0,
        'width':0,
        'height':0,
        'receiver_phone_prefix':1
    })


    const onSelectedSenderPos = (pos) => {
        setSenderPos(pos);
        setCenter(pos)
    }

    const onSelectedReceiverPos = (pos) => {
        setReceiverPos(pos);
        setCenter(pos)
    }

    const onSelectedStation = (key) => {
        setStation(key)
        setCenter(POSITIONS[key])
    }

    const showPageOne = () => {
        return (
            isLoggedIn?
                (
                    <Row gutter={16} justify={'start'}>
                        <Col span={2}> </Col>
                        <Col span={10}>

                            <OrderForm1
                                onSelectedSenderPos={onSelectedSenderPos}
                                onSelectedStation={onSelectedStation}
                                info={info}
                                setInfo={setInfo}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <OrderMap
                                senderPos={senderPos}
                                center={center}
                                station={station}
                                receiverPos={receiverPos}
                            />
                        </Col>
                        {/*<Col span={3}> </Col>*/}
                    </Row>
               )
                :
                (<Redirect to="/home"/>)
        )
    }

    const showPageTwo = () => {
        return (
            isLoggedIn?
                (
                    <Row gutter={16} justify={'start'}>
                        <Col span={3}> </Col>
                        <Col span={8}>

                            <OrderForm2
                                info={info}
                                setInfo={setInfo}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <OrderMap
                                senderPos={senderPos}
                                center={center}
                                station={station}
                                receiverPos={receiverPos}
                            />
                        </Col>
                        <Col span={3}> </Col>
                    </Row>
                )
                :
                (<Redirect to="/home"/>)
        )
    }

    const showPageThree = () => {
        return (
            isLoggedIn?
                (
                    <Row gutter={16} justify={'start'}>
                        <Col span={3}> </Col>
                        <Col span={8}>

                            <OrderForm3
                                onSelectedReceiverPos={onSelectedReceiverPos}
                                info={info}
                                setInfo={setInfo}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <OrderMap
                                senderPos={senderPos}
                                center={center}
                                station={station}
                                receiverPos={receiverPos}
                            />
                        </Col>
                        <Col span={3}> </Col>
                    </Row>
                )
                :
                (<Redirect to="/home"/>)
        )
    }


    const showPageFour = () => {
        return (
            isLoggedIn?
                (
                    <Row gutter={16} justify={'start'}>
                        <Col span={3}> </Col>
                        <Col span={8}>

                            <OrderForm4
                                info={info}
                                setInfo={setInfo}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <OrderMap
                                senderPos={senderPos}
                                center={center}
                                station={station}
                                receiverPos={receiverPos}
                            />
                        </Col>
                        <Col span={3}> </Col>
                    </Row>
                )
                :
                (<Redirect to="/home"/>)
        )
    }

    const showReview = () => {
        return (
            isLoggedIn?
                (
                    <Row justify={'center'}>
                        <Col span={20}>
                            <OrderReview
                                info={info}
                                setInfo={setInfo}
                            />
                        </Col>
                    </Row>
                    )
                :
                (<Redirect to="/home"/>)
        )
    }

    // note: Did Mount
    useEffect( ()=> {
        console.log('CreateOrder Did Mount.')
    }, [])

    // note: Did Update
    useEffect( () => {
        console.log('CreateOrder Did Update.')
    }, [props])

    return (
    <div id='create-order'>

        <Switch>
            <Route path='/create-order/page/1' render={showPageOne}/>
            <Route path='/create-order/page/2' render={showPageTwo}/>
            <Route path='/create-order/page/3' render={showPageThree}/>
            <Route path='/create-order/page/4' render={showPageFour}/>
            <Route path='/create-order/review' render={showReview}/>
        </Switch>

    </div>


    );
}

export default CreateOrder;