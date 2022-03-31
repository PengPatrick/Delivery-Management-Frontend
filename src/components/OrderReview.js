import React from 'react';
import {Button, Col} from "antd";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import {assignIn} from "lodash/object";
import {useHistory} from "react-router-dom";


function OrderReview(props) {

    const {info, setInfo} = props

    const history = useHistory()

    // const info = {
    //     height: 43,
    //     length: 12,
    //     note: "This is a note ",
    //     receiver_address: "255w West 94th Street, New York, NY, USA",
    //     receiver_first_name: "Yang",
    //     receiver_last_name: "Yu",
    //     receiver_middle_name: undefined,
    //     receiver_phone_number: 9178036252,
    //     receiver_phone_prefix: 1,
    //     sender_address: "Times Square, Manhattan, NY, USA",
    //     sender_first_name: "Yang",
    //     sender_last_name: "Yu",
    //     sender_middle_name: undefined,
    //     sender_phone_number: 9178036252,
    //     sender_phone_prefix: 1,
    //     ship_method: "Robot",
    //     station: "place2",
    //     weight: 1.2,
    //     width: 45,
    //     delivery_fee: 10.99
    // }


    const onClickNext = (values) => {

        // todo:
        //  1. send post request to backend


        //  2. redirect to order history page
        history.push('/order-history','review')
    }

    const onClickPrevious = ()=> {

        history.goBack()
    }

    return (
        <div>
            <div className={'page-title'}>
                Order Review
            </div>

            <div className={'main-div'}>

                <div>

                    <div className={'page-sub-title'}>
                        Sender Information
                    </div>

                    <div>
                        {
                            info['sender_middle_name'] === null ?

                                (<span> {info['sender_first_name']} {info['sender_last_name']}</span>)
                                :
                                (<span> {info['sender_first_name']} {info['sender_middle_name']} {info['sender_last_name']}</span>)
                        }

                        <br/>
                        <span> +{info['sender_phone_prefix']} {info['sender_phone_number']}</span>
                        <br/>

                        <span> {info['sender_address']}</span>
                    </div>

                </div>

                <div>

                    <div className={'page-sub-title'}>
                        Receipt Information
                    </div>

                    <div>
                        {
                            info['receiver_middle_name'] === null ?

                                (<span> {info['receiver_first_name']} {info['receiver_last_name']}</span>)
                                :
                                (<span> {info['receiver_first_name']} {info['receiver_middle_name']} {info['receiver_last_name']}</span>)
                        }

                        <br/>

                        <span> +{info['receiver_phone_prefix']} {info['receiver_phone_number']}</span>

                        <br/>

                        <span> {info['receiver_address']}</span>
                    </div>

                </div>


                <div>

                    <div className={'page-sub-title'}>
                        Shipping Information
                    </div>

                    <div className={'unit-div'}>
                        <span> Method </span> <span> {info['ship_method']}</span>
                    </div>

                    <div className={'unit-div'}>
                        <span> Weight </span> <span> {info['weight']}Kg</span>
                    </div>

                    <div className={'unit-div'}>
                        <span> Length </span> <span> {info['length']}cm</span>
                    </div>

                    <div className={'unit-div'}>
                        <span> Width </span> <span> {info['width']}cm</span>
                    </div>

                    <div className={'unit-div'}>
                        <span> Height </span> <span> {info['height']}cm</span>
                    </div>
                </div>


            </div>

            <div className={'main-div'}>

                <div className={'page-sub-title'}>
                    Note
                </div>

                <div>
                    {info['note']}
                </div>
            </div>

            <div className={'main-div'}>

                <div className={'page-sub-title'}>
                    Order Summary
                </div>

                <div className={'unit-div'}>
                    <span> Delivery Fee </span> <span> {Number(info['delivery_fee']).toFixed(2)}$</span>
                </div>

                <div className={'unit-div'}>
                    <span> Estimated Tax Collected </span> <span> {Number(info['delivery_fee'] * 0.0875).toFixed(2)}$</span>
                </div>

                <div className={'unit-div'}>
                    <span> Order Total </span> <span> {Number(info['delivery_fee'] * (1 + 0.0875)).toFixed(2) }$</span>
                </div>
            </div>

            <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >

                <Button
                    type={'default'}
                    shape={'round'}
                    onClick={onClickPrevious}
                >
                    <LeftCircleOutlined />Previous
                </Button>



                <Button
                    type={'primary'}
                    shape={'round'}
                    htmlType={'submit'}
                >
                    Order<RightCircleOutlined />
                </Button>

            </div>

        </div>
    );
}

export default OrderReview;