import React from 'react';
import { Row, Col, Button, Table, Icon } from 'antd';
import { BankingDetailForm as TmpBankingDetailForm } from './BankingDetailForm';
import { columns } from './const.define';

const BankingDetailForm = TmpBankingDetailForm;

export default class TabBankingDetail extends React.Component<any, any> {
  state: any = {
    data: [],
    editingItem: {},
  };

  componentDidMount() {
    const { addInfo } = this.props;

    if (addInfo && addInfo.BankDetails && addInfo.BankDetails.length > 0) {
      this.setState({ data: addInfo.BankDetails });
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

    changeTabs('3', { BankingDetails: tmp });
  };

  editAction = (item: any) => {
    this.setState({ editingItem: item });
  };

  deleteAction = (id: string) => {
    const { data } = this.state;
    const tmp: any = data.filter((item: any) => item.id !== id);
    this.setState({ data: tmp });
  };

  render() {
    const { changeTabs, currentTabNum: tmpCurrentTabNum } = this.props;
    const currentTabNum = tmpCurrentTabNum || '4';

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
          <h1 style={{ textAlign: 'center' }}>Banking Details</h1>
        </Row>

        <BankingDetailForm onSubmit={this.addToList} {...addFormProps} />

        <Row>
          <Table columns={columns(columnProps)} dataSource={data} />
        </Row>

        <Row>
          <Col span={24} className="btn-move-right">
            <Button
              type="default"
              onClick={() =>
                changeTabs(String(Number(currentTabNum) - 1), { ListBankDetails: data })
              }
            >
              <Icon type="left" /> Back
            </Button>
            <Button
              type="primary"
              onClick={() => changeTabs(String(currentTabNum), { ListBankDetails: data })}
            >
              <Icon type="save" /> Save
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
