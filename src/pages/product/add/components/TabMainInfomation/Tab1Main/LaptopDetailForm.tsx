import React from 'react';
import { Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import { pattern } from '@/common/constants/const.define';

const { Option } = Select;

class LaptopDetails extends React.Component<any, any> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { initValue: tmpInitValue } = this.props;
    const initValue: any = tmpInitValue || {};

    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Item label="Loại bộ vi xử lý">
          {getFieldDecorator('type', {
            initialValue: initValue.id,
            rules: [{ required: false }],
          })(<Input placeholder="Intel Core i5" />)}
        </Form.Item>
        <Form.Item label="Kích thước màn hình">
          {getFieldDecorator('size', {
            initialValue: initValue.id,
            rules: [{ required: false }],
          })(<Input placeholder="15 inch" />)}
        </Form.Item>
        <Form.Item label="Kích thước màn hình"></Form.Item>
      </Form>
    );
  }
}

export const LaptopDetailForm = Form.create({ name: 'laptop-form' })(LaptopDetails);
