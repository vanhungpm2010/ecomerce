import React from 'react';
import { Table, Form, Input, Row, Col, Button, Icon } from 'antd';
import { AddModalForm as TmpAddModalForm } from './AddModal.component';
import { columns } from './const.define';
import { roundFloat } from '@/utils/utils';
import { AddRecievedAmount } from '@/common/components/add-recieve.modal';
import { pattern, commonMsg } from '@/common/constants/const.define';

const AddModalForm: any = TmpAddModalForm;

class ChargeDetail extends React.Component<any, any> {
  state: any = {
    editingItem: {},
    data: [],
    subTotal: 0,
    gst: 0,
    gstPercent: 0,
    shipAndhandling: 0,
    taxAmt: 0,
    totalAmt: 0,
  };

  constructor(public props: any) {
    super(props);
    const { addInfo } = props;
    if (addInfo) {
      this.state.data = addInfo.CustomerQuotationDetails || [];

      this.state.gst = addInfo.GST;
      this.state.gstPercent = addInfo.GSTPercent;
      this.state.shipAndhandling = addInfo.ShippingHanding;

      const { shipAndhandling, gstPercent, data } = this.state;

      let subTotal = 0;
      for (let i = 0; i < (data || []).length; i++) {
        subTotal =
          subTotal +
          (Number(data[i].ARCCharge) || 0) +
          (Number(data[i].MRCCharge) || 0) +
          (Number(data[i].NRCCharge) || 0);
      }

      const gst: number = subTotal * ((Number(gstPercent) || 0) / 100) || 0;
      const taxAmtRate: number = (Number(addInfo ? addInfo.Tax : 0) || 0) / 100;
      const taxAmt = taxAmtRate * subTotal || 0;
      const totalAmt = subTotal + taxAmt + gst + (Number(shipAndhandling) || 0) || 0;

      this.state = { ...this.state, ...{ subTotal, gst, taxAmt, totalAmt } };
    }
  }

  componentWillReceiveProps(nextProps: any) {
    const { addInfo: tmpAddInfo } = nextProps;

    const addInfo = { ...tmpAddInfo };
    if (addInfo) {
      const value = {
        gst: addInfo.GST,
        gstPercent: addInfo.GSTPercent,
        shipAndhandling: addInfo.ShippingHanding,
      };

      this.setState({ value, data: addInfo.CustomerQuotationDetails || [] }, () =>
        this.calcTotalAmt(),
      );
    }
  }

  editAction = (item: any) => {
    this.setState({ editingItem: item });
  };

  deleteAction = (id: string) => {
    const { data } = this.state;
    const tmp: any = data.filter((item: any) => item.id !== id);
    this.setState({ data: tmp }, () => this.calcTotalAmt());
  };

  addToList = (data: any) => {
    if (!data) {
      return;
    }

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
      this.setState({ editingItem: {} }, () => this.calcTotalAmt());
    });
  };

  onSubmit = () => {
    const { gstPercent, shipAndhandling } = this.state;

    this.props.onSubmit(this.state.data, {
      // GST: gst,
      GSTPercent: gstPercent,
      ShippingHanding: shipAndhandling,
    });
  };

  valueChange = (event: any) => {
    const { name, value } = event.target;
    const tmpState = { ...this.state };

    tmpState[name] = value;

    this.setState(tmpState, () => this.calcTotalAmt());
  };

  calcTotalAmt = () => {
    const { shipAndhandling, gstPercent, data } = this.state;
    const { addInfo } = this.props;

    let subTotal = 0;
    for (let i = 0; i < (data || []).length; i++) {
      subTotal =
        subTotal +
        (Number(data[i].ARCCharge) || 0) +
        (Number(data[i].MRCCharge) || 0) +
        (Number(data[i].NRCCharge) || 0);
    }

    const gst: number = subTotal * ((Number(gstPercent) || 0) / 100) || 0;
    const taxAmtRate: number = (Number(addInfo ? addInfo.Tax : 0) || 0) / 100;
    const taxAmt = taxAmtRate * subTotal || 0;
    const totalAmt = subTotal + taxAmt + gst + (Number(shipAndhandling) || 0) || 0;

    this.setState({ subTotal, gst, taxAmt, totalAmt });
  };

  onSubmitRecievedAmount = (event: any) => {
    const { onSubmitRecievedAmount } = this.props;
    onSubmitRecievedAmount(event);
  };

  action = ({ action }: any) => {
    switch (action) {
      case 'end-edit': {
        this.setState({ editingItem: {} });
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    const { changeTabs, typeTab, recievedList, isShowAddRec, section } = this.props;
    const { data, editingItem } = this.state;

    const columnProps = {
      editAction: this.editAction,
      deleteAction: this.deleteAction,
      section,
    };

    const addModalProp = {
      addToList: this.addToList,
    };

    return (
      <Form>
        <Row>
          <h1 style={{ color: 'blue' }}>Proposal for:</h1>
          <AddModalForm
            {...addModalProp}
            data={editingItem}
            action={this.action}
            section={section}
          />
        </Row>

        <Row>
          <Table rowKey="id" dataSource={data || []} columns={columns(columnProps)}></Table>
        </Row>

        {/* line 1 */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <Form.Item label="Sub Total:">
              <Input disabled={true} value={this.state.subTotal} />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Item label="GST %:">
              <Input
                name="gstPercent"
                pattern={pattern.str_float}
                title={commonMsg.validate.number}
                value={this.state.gstPercent}
                onChange={this.valueChange}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Item label="GST:">
              <Input disabled={true} value={roundFloat(this.state.gst)} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={14} lg={6} xl={6}>
            <Form.Item label="Shipping And Handling:">
              <Input
                name="shipAndhandling"
                pattern={pattern.str_float}
                title={commonMsg.validate.number}
                value={this.state.shipAndhandling}
                onChange={this.valueChange}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Line 2 */}
        <Row>
          <Col xs={12} sm={12} md={10} lg={8} xl={6}>
            <Form.Item label={<span style={{ color: 'black', fontWeight: 700 }}>Tax Amt</span>}>
              <Input
                value={roundFloat(this.state.taxAmt)}
                disabled={true}
                style={{ color: 'black', fontWeight: 700 }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={10} lg={8} xl={6}>
            <Form.Item label={<span style={{ color: 'blue', fontWeight: 700 }}>Total Amt</span>}>
              <Input
                value={roundFloat(this.state.totalAmt)}
                disabled={true}
                style={{ color: 'blue', fontWeight: 700 }}
              />
            </Form.Item>
          </Col>

          {typeTab === 'invoice' ? (
            <Col xs={12} sm={12} md={10} lg={8} xl={6}>
              <Form.Item
                label={
                  <span style={{ color: 'green', fontWeight: 700 }}>
                    {section === 'vendorInvoice' ? 'Amount Paid' : 'Amount Rec.d'}
                  </span>
                }
              >
                <Input
                  value={roundFloat(this.state.TotalPaidAmt || 0)}
                  disabled={true}
                  style={{ color: 'green', fontWeight: 700 }}
                />
              </Form.Item>
            </Col>
          ) : (
            ''
          )}

          {isShowAddRec ? (
            <Col xs={12} sm={12} md={10} lg={8} xl={6}>
              <Form.Item label=" ">
                <AddRecievedAmount
                  deleteRecieveAction={(value: any) => {
                    this.props.deleteRecieveAction({
                      datalist: data,
                      send: value,
                    });
                  }}
                  datalist={recievedList}
                  onSubmit={this.onSubmitRecievedAmount}
                />
              </Form.Item>
            </Col>
          ) : (
            ''
          )}
        </Row>

        <Row>
          <Col span={24} className="btn-move-right">
            <Button type="default" onClick={() => changeTabs('2')}>
              <Icon type="left" /> Back
            </Button>
            <Button type="primary" onClick={() => this.onSubmit()}>
              <Icon type="save" /> Save
            </Button>
            {typeTab !== 'invoice' ? (
              <Button type="default" onClick={() => changeTabs('4')}>
                <Icon type="right" /> Next
              </Button>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}

export const ChargeDetailForm = Form.create({
  name: 'tab-charge-detail-form',
})((props: any) => <ChargeDetail {...props} onSubmit={props.onSubmit} />);
