import React from 'react';
import { Form, Input, Row, Col, Select, Button, Icon } from 'antd';

const { Option } = Select;

interface StateType {
  addInfo: any;
}

export default class TabGeneralDeails extends React.Component<any, StateType> {
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
    changeTabs('1', this.state.addInfo); // save data only
  };

  render() {
    const { addInfo } = this.state;
    const { AccountType } = this.state.addInfo;

    return (
      <Form onSubmit={this.onSubmit}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Account Type:">
              <Select
                showSearch
                placeholder="Select a item"
                filterOption={(input: string, option: any) =>
                  option.props.children
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={AccountType ? AccountType.toString() : ''}
                onChange={this.changeSelectValue}
              >
                <Option key="1" value="1">
                  Customer
                </Option>
                <Option key="2" value="2">
                  Vendor
                </Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item required label="Account Name: ">
              <Input
                name="AccountName"
                required
                value={addInfo.AccountName}
                onChange={this.onChangeValue}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Accounting Software Reference Code:">
              <Input
                name="ReferenceCode"
                value={addInfo.ReferenceCode}
                onChange={this.onChangeValue}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="btn-move-right">
            <Button type="primary" htmlType="submit">
              <Icon type="save" /> Save
            </Button>
            <Button type="default" onClick={() => this.props.changeTabs('2', this.state.addInfo)}>
              <Icon type="right" /> Next
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
