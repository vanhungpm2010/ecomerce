import React, { Component } from 'react';
import { formItemLayout } from '@/common/constants/formItemLayout';
import { Form, Row, Col, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';

export default class TabGeneral extends Component<any,any> {
    render(){
        const { addInfo } = this.props;
        
        return(
            <Form {...formItemLayout} className="setting-boder">
                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <FormItem label="ID người dùng">
                            {addInfo.id}
                        </FormItem>
                        <FormItem label="Mã gian hàng">
                            {addInfo.StoreId}
                        </FormItem>
                        <FormItem label="Tên gian hàng">
                            {addInfo.WarehouseName}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <FormItem label="Email người dùng">
                            {addInfo.Email}
                        </FormItem>
                        <FormItem label="Số điện thoại">
                            {addInfo.PhoneNumber}
                        </FormItem>
                        <FormItem label="Địa chỉ">
                            {addInfo.Address}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}