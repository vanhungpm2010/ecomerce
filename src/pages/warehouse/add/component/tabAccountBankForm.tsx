import React from 'react';
import { Form } from 'antd';

class TabAccountBank extends React.Component<any,any> {
    render(){
        return(
            <p>TabAccountBankForm</p>
        )
    }
}
export const TabAccountBankForm = Form.create({
    name: 'tab-account-bank'
})(TabAccountBank);