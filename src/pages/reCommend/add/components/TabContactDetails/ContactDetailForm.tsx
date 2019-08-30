import React from 'react';
import { Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import { pattern } from '@/common/constants/const.define';

const { Option } = Select;

class ContactDetail extends React.Component<any, any> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { initValue: tmpInitValue } = this.props;
    const initValue: any = tmpInitValue || {};

    return (
      <Form onSubmit={this.props.onSubmit}>
        {getFieldDecorator('id', {
          initialValue: initValue.id,
          rules: [{ required: false }],
        })(<Input style={{ display: 'none' }} />)}
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Prefix :">
              {getFieldDecorator('Prefix', {
                initialValue: initValue.Prefix || 'master',
                rules: [{ required: true, message: 'This field is required !!' }],
              })(
                <Select
                  showSearch
                  placeholder="Select a item"
                  filterOption={(input: string, option: any) =>
                    option.props.children
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  <Option value="master">Master</Option>
                  <Option value="miss">Miss</Option>
                  <Option value="mr">Mr</Option>
                  <Option value="mrs">Mrs</Option>
                  <Option value="ms">Ms</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="First Name :">
              {getFieldDecorator('FirstName', {
                initialValue: initValue.FirstName,
                rules: [{ required: true, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Middle Name :">
              {getFieldDecorator('MiddelName', {
                initialValue: initValue.MiddelName,
                rules: [{ required: false, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Last Name :">
              {getFieldDecorator('LastName', {
                initialValue: initValue.LastName,
                rules: [{ required: true, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Designation :">
              {getFieldDecorator('Designation', {
                initialValue: initValue.Designation,
                rules: [{ required: false, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Department">
              {getFieldDecorator('Department', {
                initialValue: initValue.Department,
                rules: [{ required: false, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Phone 1 :">
              {getFieldDecorator('Tel', {
                initialValue: initValue.Tel,
                rules: [{ required: true, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Phone 2 :">
              {getFieldDecorator('Phone', {
                initialValue: initValue.Phone,
                rules: [{ required: false, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Fax Number :">
              {getFieldDecorator('Fax', {
                initialValue: initValue.Fax,
                rules: [{ required: false, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Email Address :">
              {getFieldDecorator('Email', {
                initialValue: initValue.Email,
                rules: [
                  {
                    pattern: pattern.email,
                    required: true,
                    message: 'This field is required and follow with "abc@xyz.com" pattern',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          <Icon type="plus" /> {initValue.id ? 'Update' : 'Add Contract'}
        </Button>
      </Form>
    );
  }
}

export const ContactDetailForm = Form.create({
  name: 'tab-contact-detail-form',
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
  return <ContactDetail {...props} onSubmit={onSubmit} />;
});
