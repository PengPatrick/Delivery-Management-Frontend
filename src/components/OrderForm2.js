import React from 'react';
import {Form, Select, Input, InputNumber, Button, Row, Col, Icon} from "antd";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

function OrderForm2(props) {

    const {shipMethod} = props

    // console.log(shipMethod)
    return (
        <div>

            <Form
                colon={false}
                initialValues={{
                    method: {shipMethod}
                }}
                layout={"vertical"}
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
                        whitespace: true
                    }]}
                >
                    <InputNumber
                        // style={{
                        //     width:500
                        // }}
                        min={0}
                        defaultValue={0}

                    /> KG
                </Form.Item>

                <Form.Item
                    name='length'
                    label='Length'
                    rules={[{
                        required: true,
                        message: 'Please input package length!',
                        whitespace: true
                    }]}
                >
                    <InputNumber
                        // style={{
                        //     width:500
                        // }}
                        min={0}
                        defaultValue={0}

                    /> cm
                </Form.Item>

                <Form.Item
                    name='width'
                    label='Width'
                    rules={[{
                        required: true,
                        message: 'Please input package width!',
                        whitespace: true
                    }]}
                >
                    <InputNumber
                        // style={{
                        //     width:500
                        // }}
                        min={0}
                        defaultValue={0}

                    /> cm
                </Form.Item>

                <Form.Item
                    name='height'
                    label='Height'
                    rules={[{
                        required: true,
                        message: 'Please input package height!',
                        whitespace: true
                    }]}
                >
                    <InputNumber
                        // style={{
                        //     width:500
                        // }}
                        min={0}
                        defaultValue={0}

                    /> cm
                </Form.Item>

                <Form.Item
                    name='note'
                    label='Note'
                >
                    <TextArea row={4}/>

                </Form.Item>

            </Form>

            <Row justify={'space-between'}>
                <Col>
                    <Button
                        type={'default'}
                        href='/create-order/page/1'
                        shape={'round'}
                    >
                        <LeftCircleOutlined />Previous
                    </Button>
                </Col>

                <Col >
                    <Button
                        type={'primary'}
                        href='/create-order/page/3'
                        shape={'round'}
                    >
                        Next<RightCircleOutlined />
                    </Button>
                </Col>

            </Row>

        </div>
    );
}

export default OrderForm2;