import React, {useEffect, useState} from 'react';
import {AutoComplete, Button, Col, Form, Input, Row, Select} from "antd";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {useHistory} from "react-router-dom";

const { Option } = Select;

function OrderForm3(props) {

    const {onSelectedDestPos} = props
    const [options, setOptions] = useState([])
    const history = useHistory()

    // note: autocomplete
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

    const handleSelect = ({ description }) =>
        () => {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions
            getGeocode({ address: description })
                .then( (results) => getLatLng(results[0])
                )
                .then(({ lat, lng }) => {
                    console.log("📍 Coordinates: ", { lat, lng });
                    onSelectedDestPos({
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

        // while(status !== 'OK') {}

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

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    );

    const onClickNext = () => {
        // upload the form data to CreateOrder
        history.push('/create-order/page/4','3')
    }

    const onClickPrevious = ()=> {

        history.goBack()
    }

    return (
        <div>

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
                    <Input/>
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
                    <Input/>
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
                    <Input/>
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
                    <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={
                        [{
                            required: true,
                            message: 'Please input your Address!'
                        }]
                    }
                >
                    {/*<div ref={ref}>*/}
                    {/*    <Input*/}
                    {/*        value={value}*/}
                    {/*        onChange={handleInput}*/}
                    {/*        disabled={!ready}*/}
                    {/*        placeholder="Please Input your Address"*/}
                    {/*    />*/}
                    {/*    {status === "OK" && <menu>{renderSuggestions()}</menu>}*/}
                    {/*</div>*/}
                    <div ref={ref}>

                        {/*{ status === 'OK' &&*/}
                        <AutoComplete
                            id={'autocomplete'}
                            value={value}
                            options={options}
                            disabled={!ready}
                            // onSelect={onSelect}
                            onSearch={onSearch}
                            onChange={onChange}
                        >

                        </AutoComplete>
                        {/*}*/}

                    </div>

                </Form.Item>

            </Form>


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

                <Col >
                    <Button
                        type={'primary'}
                        // href='/create-order/page/4'
                        onClick={onClickNext}
                        shape={'round'}
                    >
                        Next<RightCircleOutlined />
                    </Button>
                </Col>

            </Row>
        </div>


    );
}

export default OrderForm3;