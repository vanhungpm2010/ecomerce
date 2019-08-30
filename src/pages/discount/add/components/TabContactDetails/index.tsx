import React from 'react';
import { Row, Col, Button, Table, Icon } from 'antd';
import { ContactDetailForm } from './ContactDetailForm';
import { columns } from './const.define';

export default class TabContactDetails extends React.Component<any, any> {
  state: any = {
    data: [],
    editingItem: {},
  };

  componentDidMount() {
    const { addInfo } = this.props;

    if (addInfo && addInfo.ContactDetails && addInfo.ContactDetails.length > 0) {
      this.setState({ data: addInfo.ContactDetails });
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
    this.setState({ ...this.state, editingItem: item });
  };

  deleteAction = (id: string) => {
    const { data } = this.state;
    const tmp: any = data.filter((item: any) => item.id !== id);

    this.setState({ ...this.state, data: tmp });
  };

  render() {
    const { changeTabs, currentTabNum: tmpCurrentTabNum } = this.props;
    const currentTabNum = tmpCurrentTabNum || '3';
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
          <h1 style={{ textAlign: 'center' }}>Contacts</h1>
        </Row>

        <ContactDetailForm onSubmit={this.addToList} {...addFormProps} />

        <Row>
          <Table columns={columns(columnProps)} dataSource={data} />
        </Row>

        <Row>
          <Col span={24} className="btn-move-right">
            <Button
              type="default"
              onClick={() => changeTabs(String(Number(currentTabNum) - 1), { ListContacts: data })}
            >
              <Icon type="left" /> Back
            </Button>
            <Button
              type="primary"
              onClick={() => changeTabs(currentTabNum, { ListContacts: data })}
            >
              <Icon type="save" /> Save
            </Button>
            <Button
              type="default"
              onClick={() => changeTabs(String(Number(currentTabNum) + 1), { ListContacts: data })}
            >
              <Icon type="right" /> Next
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
