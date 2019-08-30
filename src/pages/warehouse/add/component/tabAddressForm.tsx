import React from 'react';
import { Form } from 'antd';

class TabAddress extends React.Component<any,any> {
    render(){
        return(
            <p>TabAddressForm</p>
        )
    }
}
export const TabAddressForm = Form.create({
    name: 'tab-address'
})(TabAddress);