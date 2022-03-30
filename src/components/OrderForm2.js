import React, {useEffect, useRef} from 'react';
import {Form, Select, Input, InputNumber, Button, Row, Col, Icon} from "antd";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {assignIn} from "lodash/object";

const { Option } = Select;
const { TextArea } = Input;

function OrderForm2(props) {

    const {shipMethod, info, setInfo} = props
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

        history.push('/create-order/page/3','2')
    }

    const onClickPrevious = ()=> {

        const values = form.getFieldsValue(true)
        console.log(values)

        // const newInfo = assignIn(info, values)
        // setInfo(newInfo)
        //
        // history.goBack()
    }

    return (
        <div>

            <Form
                colon={false}
                initialValues={info}
                onFinish={onClickNext}
                layout={"vertical"}
                form={form}
            >
                <Form.Item
                    name='method'
                    label='Ship Method'
                    // valuePropName={shipMethod}
                    // getValueProps={ ()=> {
                    //
                    // }}
                >
                    <Select disabled defaultValue={shipMethod}>
                        <Option value={shipMethod}>{shipMethod}</Option>
                    </Select>

                </Form.Item>

                <Form.Item
                    name='weight'
                    label='Weight'
                    rules={[{
                        required: true,
                        message: 'Please input package weight!',
                        whitespace: true,
                        validateTrigger:'onBlur'
                    }]}

                >
                    <InputNumber
                        // style={{
                        //     width:500
                        // }}
                        min={0}
                        defaultValue={0}

                    />
                </Form.Item>

                <Form.Item
                    name='length'
                    label='Length'
                    rules={[{
                        required: true,
                        message: 'Please input package length!',
                        whitespace: true,
                        validateTrigger:'onBlur'
                    }]}
                >
                    <InputNumber
                        // style={{
                        //     width:500
                        // }}
                        min={0}
                        defaultValue={0}

                    />
                </Form.Item>

                <Form.Item
                    name='width'
                    label='Width'
                    rules={[{
                        required: true,
                        message: 'Please input package width!',
                        whitespace: true,
                        validateTrigger:'onBlur'
                    }]}
                >
                    <InputNumber
                        // style={{
                        //     width:500
                        // }}
                        min={0}
                        defaultValue={0}

                    />
                </Form.Item>

                <Form.Item
                    name='height'
                    label='Height'
                    rules={[{
                        required: true,
                        message: 'Please input package height!',
                        // whitespace: true,
                        type: 'number',
                        validateTrigger:'onBlur'
                    }]}
                >
                    <InputNumber
                        // style={{
                        //     width:500
                        // }}
                        min={0}
                        defaultValue={0}

                    />
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
                                onClick={onClickPrevious}
                                shape={'round'}
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