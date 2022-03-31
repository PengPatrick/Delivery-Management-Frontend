import React, {useEffect, useRef} from 'react';
import {Form, Select, Input, InputNumber, Button, Row, Col, Icon} from "antd";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {assignIn} from "lodash/object";

const { Option } = Select;
const { TextArea } = Input;

function OrderForm2(props) {

    const {info, setInfo} = props
    const history = useHistory()

    // console.log(shipMethod)
    const [form] = Form.useForm()

    // DidMount
    useEffect(() => {

        console.log('Form 2 did mount.')
        console.log(history)

        const {location: {state}} = history
        console.log(state)

        // note: go back
        if(state !== '1' && state !== '3') {
            history.goBack()
        }
    }, [])

    const onClickNext = (values) => {

        const newInfo = assignIn(info, values)
        setInfo(newInfo)

        console.log(newInfo)
        history.push('/create-order/page/3','2')
    }

    const onClickPrevious = ()=> {

        const values = form.getFieldsValue(true)
        console.log(values)

        // const newInfo = assignIn(info, values)
        // setInfo(newInfo)
        //
        history.goBack()
    }

    return (
        <div>
            <div className={'sub-title'}>
                Package Information
            </div>
            <Form
                colon={false}
                initialValues={info}
                onFinish={onClickNext}
                // layout={"vertical"}
                form={form}
            >
                <Form.Item
                    name='ship_method'
                    label='Ship Method'
                    // valuePropName={shipMethod}
                    // getValueProps={ ()=> {
                    //
                    // }}
                >
                    {/* att: how is fixed?*/}
                    <Select disabled>
                        <Option value={info['ship_method']}>{info['ship_method']}</Option>
                    </Select>

                </Form.Item>

                <Form.Item
                    label='Weight'
                    required
                >
                    <Form.Item
                        name='weight'
                        rules={[{
                            required: true,
                            message: 'Please input package weight!',
                            type: 'number',
                            whitespace: true,
                            validateTrigger:'onBlur'
                        }]}
                        noStyle
                    >
                        <InputNumber
                            // style={{
                            //     width:500
                            // }}
                            min={0}

                        />
                    </Form.Item>
                    <span> kg </span>

                </Form.Item>

                <Form.Item
                    label='Length'
                    required
                >
                    <Form.Item
                        name='length'
                        rules={[{
                            required: true,
                            message: 'Please input package length!',
                            type: 'number',
                            whitespace: true,
                            validateTrigger:'onBlur'
                        }]}
                        noStyle
                    >
                        <InputNumber
                            // style={{
                            //     width:500
                            // }}
                            min={0}

                        />
                    </Form.Item>
                    <span> cm</span>
                </Form.Item>

                <Form.Item
                    label='Width'
                    required
                >
                    <Form.Item
                        name='width'
                        rules={[{
                            required: true,
                            message: 'Please input package width!',
                            type: 'number',
                            whitespace: true,
                            validateTrigger:'onBlur'
                        }]}
                        noStyle
                    >
                        <InputNumber
                            // style={{
                            //     width:500
                            // }}
                            min={0}
                        />
                    </Form.Item>
                    <span> cm</span>
                </Form.Item>

                <Form.Item
                    label='Height'
                    required
                >
                    <Form.Item
                        name='height'
                        rules={[{
                            required: true,
                            message: 'Please input package height!',
                            // whitespace: true,
                            type: 'number',
                            validateTrigger:'onBlur'
                        }]}
                        noStyle
                    >
                        <InputNumber
                            // style={{
                            //     width:500
                            // }}
                            min={0}

                        />
                    </Form.Item>
                    <span> cm</span>
                </Form.Item>


                <Form.Item
                    name='note'
                    label='Note'
                >
                    <TextArea row={4}/>

                </Form.Item>

                <Form.Item>

                    <Row justify={'space-between'}>
                        <Col>
                            <Button
                                type={'default'}
                                shape={'round'}
                                onClick={onClickPrevious}
                            >
                                <LeftCircleOutlined />Previous
                            </Button>
                        </Col>

                        <Col >
                            <Button
                                type={'primary'}
                                htmlType={'submit'}
                                // onClick={onClickNext}  att: do not add this event when using as a submit button
                                shape={'round'}
                            >
                                Next<RightCircleOutlined />
                            </Button>
                        </Col>

                    </Row>
                </Form.Item>
            </Form>


        </div>
    );
}

export default OrderForm2;