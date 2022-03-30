import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Col, Row} from "antd";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";

function OrderForm4(props) {

    const history = useHistory()

    // DidMount
    useEffect(() => {

        console.log('Form 4 did mount.')
        console.log(history)
    }, [])

    const onClickPrevious = ()=> {

        history.goBack()
    }

    return (
        <div>
            <Row justify={'space-between'}>
                <Col>
                    <Button
                        type={'default'}
                        // href='/create-order/page/2'
                        onClick={onClickPrevious}
                        shape={'round'}
                    >
                        <LeftCircleOutlined />Return
                    </Button>
                </Col>

                {/*<Col >*/}
                {/*    <Button*/}
                {/*        type={'primary'}*/}
                {/*        // href='/create-order/page/4'*/}
                {/*        onClick={onClickNext}*/}
                {/*        shape={'round'}*/}
                {/*    >*/}
                {/*        Next<RightCircleOutlined />*/}
                {/*    </Button>*/}
                {/*</Col>*/}

            </Row>
        </div>
    );
}

export default OrderForm4;