import React from 'react';
import { Row, Col, Button, Table, Form, Icon } from 'antd';
import { columns } from './const.define';
import { TabAddressDetailForm as TmpTabAddressDetailForm } from './TabAddressDetailForm';
import { warningMsg } from '@/common/services/highline.corner';

const TabAddressDetailForm: any = TmpTabAddressDetailForm;

export default class TabAddressDetails extends React.Component<any, any> {
  state: any = {
    data: [],
    editingItem: {},
    isEditing: false,
  };

  componentDidMount() {
    const { addInfo } = this.props;

    if (addInfo && addInfo.AddressDetails && addInfo.AddressDetails.length > 0) {
      this.setState({ data: addInfo.AddressDetails });
    }
  }

  addToList = (data: any) => {
    const tmp: any = { ...this.state };
    const tmpData = { ...data };

    if (!tmp.data) {
      tmp.data = [];
    }

    if (!tmpData.id) {
      const tmpId = new Date().getTime();
      tmpData.id = `tmp-${tmpId}`;
      tmp.data.push(tmpData);
    } else {
      tmp.data = tmp.data.map((item: any) => {
        if (item.id == tmpData.id) {
          return tmpData;
        }

        return item;
      });
    }

    this.setState({ data: tmp.data }, () => {
      // this.saveData(tmp.data);
    });
    this.setState({ editingItem: {} });
  };

  editAction = (item: any) => {
    this.setState({ editingItem: item });
  };

  deleteAction = (id: string) => {
    const { data } = this.state;
    const tmp: any = data.filter((item: any) => item.id !== id);

    this.setState({ data: tmp });
  };

  saveData = (listData: any) => {
    const { changeTabs } = this.props;

    const tmp = [];
    for (let i = 0; i < listData.length; i++) {
      const item = listData[i];

      if (item.id && typeof item.id === 'string' && item.id.match(/^tmp-/)) {
        item.id = undefined;
      }

      tmp.push(item);
    }

    changeTabs('2', { ListAddressDetails: tmp });
  };

  onSubmit = () => {
    const { changeTabs, currentTabNum: tmpCurrentTabNum } = this.props;
    const currentTabNum = tmpCurrentTabNum || '2';
    const { data } = this.state;

    if (data && data.length > 0) {
      changeTabs(String(currentTabNum), { ListAddressDetails: data });
    } else {
      warningMsg({ msg: 'Please to enter value to list!' });
    }
  };

  render() {
    const { changeTabs, currentTabNum: tmpCurrentTabNum } = this.props;
    const currentTabNum = tmpCurrentTabNum || '2';

    const { data, editingItem } = this.state;
    const columnProps = {
      editAction: this.editAction,
      deleteAction: this.deleteAction,
    };

    const addFormProps = {
      initValue: editingItem,
    };

    return (
      <div>
        <Row>
          <h1 style={{ textAlign: 'center' }}>Address</h1>
        </Row>

        <TabAddressDetailForm onSubmit={this.addToList} {...addFormProps} />

        <Row>
          <Table columns={columns(columnProps)} dataSource={data} />
        </Row>

        <Row>
          <Col span={24} className="btn-move-right">
            <Button
              type="default"
              onClick={() =>
                changeTabs(String(Number(currentTabNum) - 1), { ListAddressDetails: data })
              }
            >
              <Icon type="left" /> Back
            </Button>
            <Button type="primary" onClick={() => this.onSubmit()}>
              <Icon type="save" /> Save
            </Button>
            <Button
              type="default"
              onClick={() =>
                changeTabs(String(Number(currentTabNum) + 1), { ListAddressDetails: data })
              }
            >
              <Icon type="right" /> Next
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
