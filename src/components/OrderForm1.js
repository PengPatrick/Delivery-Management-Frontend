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
import usePlacesAutocomplete, {getGeocode, getLatLng,} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {POSITIONS} from "../constants";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";


const { Option } = Select;

function OrderForm1(props) {

    const {onSelectedSenderPos, setHighlightedStation} = props
    const [options, setOptions] = useState([])

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

    const handleInput = (e) => {
        // Update the keyword of the input element
        console.log('handleInput: ' + e)
        setValue(e.target.value);
    };

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
                    onSelectedSenderPos({
                        lat: lat,
                        lng: lng
                    })
                })
                .catch((error) => {
                    console.log("😱 Error: ", error);
                });
        };

    // const renderSuggestions = () =>
    //     data.map((suggestion) => {
    //         const {
    //             place_id,
    //             structured_formatting: { main_text, secondary_text },
    //         } = suggestion;
    //
    //         console.log(suggestion)
    //
    //         return (
    //             <li key={place_id} onClick={handleSelect(suggestion)}>
    //                 <strong>{main_text}</strong> <small>{secondary_text}</small>
    //             </li>
    //         );
    //     });

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




    // DidUpdate
    useEffect(() => {
        if(status === 'OK') {
            onSearch(document.getElementById('autocomplete').value)
        }
    }, [status])


    const clickNext = () => {

        // upload the form data to CreateOrder

    }


    const onSelectStation = (value, instance) => {

        // console.log(value,instance)

        let {key} = instance

        // console.log(typeof key)

        key = parseInt(key)

        // console.log(typeof key)
        setHighlightedStation(key)

    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    );

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

                <Form.Item
                    name="src_address"
                    label="Station"
                    rules={
                        [{
                            required: true,
                            message: 'Please Select a Station from the list!'
                        }]
                    }

                >

                    <Select
                        showSearch
                        placeholder="Select a Delivery Station"
                        optionFilterProp="children"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        onSelect={onSelectStation}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option key='0' value="place1">Place1</Option>
                        <Option key='1' value="place2">Place2</Option>
                        <Option key='2' value="place3">Place3</Option>
                    </Select>

                </Form.Item>
            </Form>
            <Row justify={'space-between'}>
                <Col>
                    <Button
                        type={'default'}
                        href='/home'
                        shape={'round'}
                    >
                        <LeftCircleOutlined />Return
                    </Button>
                </Col>

                <Col >
                    <Button
                        type={'primary'}
                        href='/create-order/page/2'
                        shape={'round'}
                    >
                        Next<RightCircleOutlined />
                    </Button>
                </Col>

            </Row>
        </div>


    );

}

export default OrderForm1;