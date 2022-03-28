import React, {useState, useEffect}from 'react';
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';

const { Option } = Select;

function CustomerForm(props) {

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    );


    // // DidMount
    // useEffect( ()=> {
    //
    //     let autocomplete;
    //     function initAutocomplete() {
    //
    //         autocomplete = new google.maps.places.Autocomplete(
    //             document.getElementById('autocomplete'),
    //             {
    //                 types: ['establishment'],
    //                 componentRestrictions: {'country': ['US']},
    //                 fields: ['place_id', 'geometry', 'name']
    //             }
    //         )
    //     }
    //
    // }, [])


    return (

        <Form
            initialValues={{
                prefix: '1',
            }}
            scrollToFirstError
        >

            <Form.Item
                name="firstname"
                label="First Name"
                // tooltip="What do you want others to call you?"
                rules={
                    [{
                        required: true,
                        message: 'Please input your first name!',
                        whitespace: true
                    }]
                }
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="lastname"
                label="Last Name"
                // tooltip="What do you want others to call you?"
                rules={
                    [{
                        required: true,
                        message: 'Please input your last name!',
                        whitespace: true
                    }]
                }
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="middlename"
                label="Middle Name"
                // tooltip="What do you want others to call you?"
                rules={
                    [{
                        required: false,
                    }]
                }
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={
                    [{
                        required: true,
                        message: 'Please input your phone number!'
                    }]
                }
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                id='autocomplete'
                name="address"
                label="Address"
                rules={
                    [{
                        required: true,
                        message: 'Please input your Address!'
                    }]
                }
            >
                <Input />
            </Form.Item>



        </Form>


    );
}

export default CustomerForm;