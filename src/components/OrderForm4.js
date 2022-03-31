import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Col, Row} from "antd";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import {assignIn} from "lodash/object";

function OrderForm4(props) {

    const {info, setInfo} = props

    const history = useHistory()


    // todo: get real price from backend
    const price = 10.99

    // DidMount
    useEffect(() => {

        console.log('Form 4 did mount.')
        console.log(history)

        const {location: {state}} = history
        console.log(state)

        // note: go back
        if(state !== '3' && state !== 'review') {
            history.goBack()
        }

    }, [])

    const onClickPrevious = ()=> {
        // const values = form.getFieldsValue(true)
        // console.log(values)

        history.goBack()
    }


    const onClickNext = () => {

        const delivery_fee = {
            delivery_fee: price
        }

        const newInfo = assignIn(info, delivery_fee)
        setInfo(newInfo)
        console.log(newInfo)

        history.push('/create-order/review','4')

    }

    // const info = {
    //     station: 'place1',
    //     receiver_address: 'place2',
    //     weight: 1.2,
    //     height: 45,
    //     width: 12,
    //     length: 34,
    //     ship_method: 'Robot'
    // }
    return (
        <div>

            <div className={'sub-title'}>
                Order Information
            </div>

            <div>

                <div>From</div>

                <div className={'high-bold'}>{info['station']}</div>

                <div>To </div>

                <div className={'high-bold'}>{info['receiver_address']} </div>

                <div> With Package </div>

                <div className={'high-bold'}> ({info['weight']}Kg, {info['length']}cm * {info['width']}cm * {info['height']}cm) </div>

                <div> By </div>

                <div className={'high-bold'}>{info['ship_method']} </div>

                <br/>
                <br/>

                <div> Total express fee is <span className={'high-bold'} >  {price}$ </span></div>

                {/*<div className={'high-bold'}>{price}$ </div>*/}

            </div>
            <div>
                <Row justify={'space-between'}>
                    <Col>
                        <Button
                            type={'default'}
                            onClick={onClickPrevious}
                            shape={'round'}
                        >
                            <LeftCircleOutlined />Previous
                        </Button>
                    </Col>

                    <Col >
                        <Button
                            type={'primary'}
                            onClick={onClickNext}
                            shape={'round'}
                        >
                            Review<RightCircleOutlined />
                        </Button>
                    </Col>

                </Row>

            </div>

        </div>
    );
}

export default OrderForm4;