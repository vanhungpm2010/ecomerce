import React from 'react';
import { Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import Countries from '../../../../../utils/data/countries';
import { pattern, commonMsg } from '@/common/constants/const.define';

const { Option } = Select;

class TabAddressDetail extends React.Component<any, any> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { initValue: tmpInitValue } = this.props;
    const initValue: any = tmpInitValue || {};

    return (
      <Form onSubmit={this.props.onSubmit}>
        {getFieldDecorator('id', {
          initialValue: initValue.id,
          rules: [{ required: false, message: commonMsg.validate.isRequire }],
        })(<Input style={{ display: 'none' }} />)}

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Address 1:">
              {getFieldDecorator('Address1', {
                initialValue: initValue.address1 || initValue.Address1,
                rules: [{ required: true, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Address 2:">
              {getFieldDecorator('Address2', {
                initialValue: initValue.address2 || initValue.Address2,
                rules: [{ required: true, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="City :">
              {getFieldDecorator('City', {
                initialValue: initValue.City,
                rules: [{ required: false, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="State :">
              {getFieldDecorator(
                // 'StateId'
                'State',
                {
                  initialValue: initValue.StateId,
                  rules: [{ required: false, message: commonMsg.validate.isRequire }],
                },
              )(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Country :">
              {getFieldDecorator('CountryId', {
                initialValue: initValue.CountryId,
                rules: [{ required: false, message: commonMsg.validate.isRequire }],
              })(
                <Select
                  showSearch
                  placeholder="Select a country"
                  // optionFilterProp="children"
                  // onChange={this.onChange}
                  // onFocus={this.onFocus}
                  // onBlur={this.onBlur}
                  // onSearch={this.onSearch}
                  filterOption={(input: string, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Countries.data.map(item => (
                    <Option key={item.code} value={item.code}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Postal Code :">
              {getFieldDecorator('PostalCode', {
                initialValue: initValue.PostalCode,
                rules: [{ required: false, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Phone 1">
              {getFieldDecorator('Phone1', {
                initialValue: initValue.Phone1,
                rules: [{ required: false, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Phone 2">
              {getFieldDecorator('Phone2', {
                initialValue: initValue.Phone2,
                rules: [{ required: false, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Fax Number :">
              {getFieldDecorator('Fax', {
                initialValue: initValue.Fax,
                rules: [{ required: false, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Email Address">
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
          <Icon type="plus" /> {initValue.id ? 'Update' : 'Add Address'}
        </Button>
      </Form>
    );
  }
}

export const TabAddressDetailForm = Form.create({
  name: 'tab-address-detail-form',
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
  return <TabAddressDetail {...props} onSubmit={onSubmit} />;
});
