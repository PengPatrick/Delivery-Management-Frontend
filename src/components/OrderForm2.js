import React from 'react';
import {Form, Select, Input, InputNumber} from "antd";

const { Option } = Select;
const { TextArea } = Input;

function OrderForm2(props) {

    const {shipMethod} = props

    // console.log(shipMethod)
    return (
        <div>

            <Form
                initialValues={{
                    method: {shipMethod}
                }}
            >
                <Form.Item
                    name='method'
                    label='Ship Method'
                    // valuePropName={shipMethod}
                    getValueProps={ ()=> {

                    }}
                >
                    <Select disabled defaultValue={shipMethod}>
                        <Option value={shipMethod}>{shipMethod}</Option>
                    </Select>

                </Form.Item>

                <Form.Item
                    name='weight'
                    label='Weight'

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


        </div>
    );
}

export default OrderForm2;