import React from 'react';
import { Form, Input, Row, Col, Button, Icon } from 'antd';

class BankingDetail extends React.Component<any, any> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { initValue: tmpInitValue } = this.props;
    const initValue: any = tmpInitValue || {};

    return (
      <Form onSubmit={this.props.onSubmit}>
        {getFieldDecorator('id', {
          initialValue: initValue.id,
          rules: [{ required: false, message: 'This field is required !!' }],
        })(<Input style={{ display: 'none' }} />)}
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Bank Name :">
              {getFieldDecorator('BankName', {
                initialValue: initValue.BankName,
                rules: [{ required: true, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Bank Address :">
              {getFieldDecorator('BankAddress', {
                initialValue: initValue.BankAddress,
                rules: [{ required: false, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="AccountNumber :">
              {getFieldDecorator('AccountNumber', {
                initialValue: initValue.AccountNumber,
                rules: [{ required: true, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="SWIFT Code :">
              {getFieldDecorator('SWIFTCode', {
                initialValue: initValue.SWIFTCode,
                rules: [{ required: false, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          <Icon type="plus" /> {initValue.id ? 'Update' : 'Add Bank'}
        </Button>
      </Form>
    );
  }
}

export const BankingDetailForm = Form.create({
  name: 'tab-banking-detail-form',
})((props: any) => {
  // this will be called on every submit
  const onSubmit = (event: any) => {
    const { validateFields, resetFields } = props.form;
    event.preventDefault();
    validateFields((err: any, values: any) => {
      if (!err) {
        props.onSubmit(values);

        resetFields();
      }
    });
  };
  return <BankingDetail {...props} onSubmit={onSubmit} />;
});
