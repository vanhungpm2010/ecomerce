import React from 'react';
import { Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

interface StateType {
  addInfo: any;
}
class TabGeneralDeails extends React.Component<any, StateType> {
  state: StateType = {
    addInfo: {
      AccountType: '1',
    },
  };

  constructor(public props: any) {
    super(props);
    this.state.addInfo.AccountType = '1';
  }

  componentWillReceiveProps(nextProps: any) {
    const { addInfo: tmpInfo } = nextProps;
    if (tmpInfo) {
      const tmp = { ...this.state.addInfo, ...tmpInfo };
      this.setState({ addInfo: tmp });
    }
  }

  onChangeValue = (e: any) => {
    const { value, name } = e.target;
    const tmp = { ...this.state };
    tmp.addInfo[name] = value;

    this.setState(
      { ...this.state, addInfo: tmp.addInfo },
      // () => {
      //   const { changeTabs } = this.props;
      //   changeTabs('1', this.state.addInfo); // save data only
      // }
    );
  };

  changeSelectValue = (value: any) => {
    const tmp = { ...this.state };
    tmp['addInfo']['AccountType'] = value;

    this.setState({ ...this.state, ...tmp });
  };

  onSubmit = (event: any) => {
    event.preventDefault();

    const { changeTabs } = this.props;
    changeTabs('2', this.state.addInfo); // save data only
  };
  renderTitle = () => {};
  render() {
    const { addInfo } = this.state;
    const { AccountType } = this.state.addInfo;
    const { form } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <Row>
          <Form.Item required label="Tiêu đề:">
            {form.getFieldDecorator('title', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input placeholder="Nhập tiêu đề" />)}
          </Form.Item>
        </Row>
        <Row>
          <Form.Item required label="Nội dung:">
            {form.getFieldDecorator('content', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<TextArea rows={4} placeholder="Nhập nội dung" />)}
          </Form.Item>
        </Row>
        <Row>
          <Form.Item required label="Mô tả:">
            {form.getFieldDecorator('description', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<TextArea rows={4} placeholder="Nhập mô tả" />)}
          </Form.Item>
        </Row>

        <Row>
          <Col span={24} className="btn-move-right">
            <Button type="primary" htmlType="submit">
              <Icon type="save" /> Save & Next
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
export const TabGeneralDeailsForm = Form.create({ name: 'Genaral-form' })(TabGeneralDeails);
