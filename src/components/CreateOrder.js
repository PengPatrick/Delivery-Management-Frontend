import {React, useEffect, useState} from 'react';
import OrderForm1 from "./OrderForm1";
import OrderMap from "./OrderMap";
import {Row, Col} from 'antd';
import {Switch, Route, Redirect} from "react-router-dom";
import OrderForm2 from './OrderForm2';
import OrderForm3 from './OrderForm3';
import OrderForm4 from './OrderForm4';

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
    const [highlightedStation, setHighlightedStation] = useState(-1)

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


    const showPageOne = () => {
        return (
            isLoggedIn?
                (<OrderForm1
                    onSelectedSenderPos={onSelectedSenderPos}
                    setHighlightedStation={setHighlightedStation}
                    info={info}
                    setInfo={setInfo}
                />)
                :
                (<Redirect to="/home"/>)
        )
    }

    const showPageTwo = () => {
        return (
            isLoggedIn?
                (<OrderForm2
                    info={info}
                    setInfo={setInfo}
                />)
                :
                (<Redirect to="/home"/>)
        )
    }

    const showPageThree = () => {
        return (
            isLoggedIn?
                (<OrderForm3
                    onSelectedReceiverPos={onSelectedReceiverPos()}
                    info={info}
                    setInfo={setInfo}
                />)
                :
                (<Redirect to="/home"/>)
        )
    }

    const showPageFour = () => {
        return (
            isLoggedIn?
                (<OrderForm4
                    info={info}
                    setInfo={setInfo}
                />)
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
        <Row gutter={16} justify={'start'}>
            <Col span={3}> </Col>
            <Col span={8}>
                <Switch>
                    <Route path='/create-order/page/1' render={showPageOne}/>
                    <Route path='/create-order/page/2' render={showPageTwo}/>
                    <Route path='/create-order/page/3' render={showPageThree}/>
                    <Route path='/create-order/page/4' render={showPageFour}/>
                </Switch>

            </Col>
            <Col span={1}></Col>
            <Col span={8}>
                <OrderMap
                    senderPos={senderPos}
                    center={center}
                    highlightedStation={highlightedStation}
                    receiverPos={receiverPos}
                />
            </Col>
            <Col span={3}> </Col>
        </Row>

    </div>


    );
}

export default CreateOrder;