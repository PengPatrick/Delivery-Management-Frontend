import React, {useEffect, useState} from 'react';
import {AutoComplete, Button, Col, Form, Input, InputNumber, Row, Select} from "antd";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {useHistory} from "react-router-dom";
import {assignIn} from "lodash/object";

const { Option } = Select;

function OrderForm3(props) {

    const {onSelectedReceiverPos, info, setInfo} = props
    const [options, setOptions] = useState([])

    const history = useHistory()
    const [form] = Form.useForm()

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleSelect = ({ description}) =>
        () => {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            // console.log('des:', description)
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions
            getGeocode({ address: description })
                .then( (results) => getLatLng(results[0])
                )
                .then(({ lat, lng }) => {
                    console.log("📍 Coordinates: ", { lat, lng });
                    onSelectedReceiverPos({
                        lat: lat,
                        lng: lng
                    })
                })
                .catch((error) => {
                    console.log("😱 Error: ", error);
                });
        };

    const onChange = (data) => {
        console.log('on change:' + data)
        setValue(data)
    }

    const onSearch = (searchText) => {
        console.log('on search: ' + searchText)

        console.log('data:' + data)
        const list = data.map(
            (suggestion) => {
                const {
                    place_id,
                    structured_formatting: { main_text, secondary_text },
                } = suggestion;

                console.log(suggestion)

                return {
                    value: main_text + ', ' + secondary_text,
                    label: (
                        <li key={place_id} onClick={handleSelect(suggestion)}>
                            <strong>{main_text}</strong> <small>{secondary_text}</small>
                        </li>)
                };
            }
        )

        console.log(list)

        setOptions(!searchText? []: list)
    }



    // DidMount
    useEffect(() => {

        console.log('Form 3 did mount.')
        console.log(history)

        const {location: {state}} = history
        console.log(state)

        // note: go back
        if(state !== '2' && state !== '4') {
            history.goBack()
        }

    }, [])


    // DidUpdate
    useEffect(() => {
        if(status === 'OK') {
            onSearch(document.getElementById('receiver-autocomplete').value)
        }
    }, [status])


    const prefixSelector = (
        <Form.Item name="receiver_phone_prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    );


    const onClickNext = (values) => {

        const newInfo = assignIn(info, values)
        setInfo(newInfo)

        console.log(newInfo)
        history.push('/create-order/page/4','3')
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
                Receipt Information
            </div>

            <Form
                initialValues={info}
                onFinish={onClickNext}
                scrollToFirstError
                form={form}
            >

                <Form.Item
                    name="receiver_first_name"
                    label="First Name"
                    rules={
                        [{
                            required: true,
                            message: "Receipt's first name cannot be empty!",
                            whitespace: true,
                            validateTrigger: 'onBlur'
                        }]
                    }
                >
                    <Input/>
                </Form.Item>


                <Form.Item
                    name="receiver_last_name"
                    label="Last Name"
                    rules={
                        [{
                            required: true,
                            message: "Receipt's last name cannot be empty!",
                            whitespace: true,
                            validateTrigger: 'onBlur'
                        }]
                    }
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="receiver_middle_name"
                    label="Middle Name"
                    rules={
                        [{
                            required: false,
                        }]
                    }
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="receiver_phone_number"
                    label="Phone Number"
                    rules={
                        [{
                            required: true,
                            message: "Receipt's phone number cannot be empty!",
                            type:'integer',
                            validateTrigger: 'onBlur'
                        }]
                    }
                >
                    <InputNumber addonBefore={prefixSelector} style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="receiver_address"
                    label="Address"
                    rules={
                        [{
                            required: true,
                            message: "Receipt's address cannot be empty!",
                            whitespace: true,
                            validateTrigger: 'onBlur'
                        }]
                    }
                >
                    <AutoComplete
                        id='receiver-autocomplete'
                        options={options}
                        disabled={!ready}
                        onSearch={onSearch}
                        onChange={onChange}
                    >
                        {value}
                    </AutoComplete>

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

                        <Col>
                            <Button
                                type={'primary'}
                                shape={'round'}
                                htmlType={'submit'}
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

export default OrderForm3;