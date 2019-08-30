import React from 'react';
import { Form, Select, Input, Row, Col, DatePicker, Button, Icon } from 'antd';
import { currencyCode, dateFormatList, pattern, commonMsg } from '@/common/constants/const.define';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

interface StateType {
  editData: any;
  isEditing: boolean;
  BankingDetailId?: number;
}

class QuotationDetail extends React.Component<any, any> {
  state: StateType = {
    editData: {},
    isEditing: false,
  };

  // constructor(public props: any) {
  //   super(props);
  //   const { editInfo } = props;
  //   console.log('constructor', props);

  //   this.state.editData = editInfo;
  // }

  onSelectChange = ({ value, fieldName }: any) => {
    this.setState({ [fieldName]: value }, () => {
      console.log(this.state);
    });
  };

  render() {
    const { changeTabs, section } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { addInfo, showBank } = this.props;
    const editData = addInfo || {};

    console.log(editData);

    return (
      <Form onSubmit={this.props.onSubmit}>
        <Row>
          <h1 style={{ textAlign: 'center', color: 'blue' }}>
            Thank you for the enquiry. We are please to quote for the following
          </h1>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label={section === 'vendorPO' ? 'Purchase Validity' : 'Quotation Validity'}>
              {getFieldDecorator('QuotationValidity', {
                initialValue: editData.QuotationValidity
                  ? moment(new Date(editData.QuotationValidity), dateFormatList[0])
                  : '',
                rules: [{ required: true, message: commonMsg.validate.isRequire }],
              })(<DatePicker style={{ width: '100%' }} format={dateFormatList[0]} />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="SLA:">
              {getFieldDecorator('SLA', {
                initialValue: editData.SLA,
              })(<Input placeholder="SLA" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Contract Term:">
              {getFieldDecorator('ContractTerm', {
                initialValue: editData.ContractTerm,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Operations & Maintenance:">
              {getFieldDecorator('OperationsMaintenance', {
                initialValue: editData.OperationsMaintenance,
                rules: [{ required: true, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Billing Cycle/ Payment Term:">
              {getFieldDecorator('PaymentTerm', {
                initialValue: editData.PaymentTerm,
                rules: [{ required: true, message: 'This field is required !!' }],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Service Availability/ Lead Time:">
              {getFieldDecorator('ServiceAvailability', {
                initialValue: editData.ServiceAvailability,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Currency:">
              {getFieldDecorator('Currency', {
                initialValue: editData.Currency || '',
              })(
                <Select
                  showSearch
                  placeholder="Select a currency"
                  filterOption={(input: string, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {currencyCode
                    ? currencyCode.map((item: any) => (
                        <Option key={item.code} value={item.code}>
                          {item.name}
                        </Option>
                      ))
                    : ''}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Warranty:">
              {getFieldDecorator('Warranty', {
                initialValue: editData.Warranty,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Tax(%):">
              {getFieldDecorator('Tax', {
                initialValue: editData.Tax,
                rules: [
                  {
                    pattern: pattern.float,
                    message: commonMsg.validate.number,
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Transfer of Title:">
              {getFieldDecorator('TransferOfTitle', {
                initialValue: editData.TransferOfTitle,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Termination Notice:">
              {getFieldDecorator('TerminationNotice', {
                initialValue: editData.TerminationNotice,
                rules: [{ required: true, message: commonMsg.validate.isRequire }],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Shipping Term:">
              {getFieldDecorator('ShippingTerm', {
                initialValue: editData.ShippingTerm,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Termination Penalty:">
              {getFieldDecorator('TerminationPenalty', {
                initialValue: editData.TerminationPenalty,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Shipping Method:">
              {getFieldDecorator('ShippingMethod', {
                initialValue: editData.ShippingMethod,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h1>Additional Information (if any): </h1>
          </Col>

          <Col span={24}>
            {getFieldDecorator('AdditionalInformation', {
              initialValue: editData.AdditionalInformation,
            })(<TextArea placeholder="" autosize={{ minRows: 6, maxRows: 12 }} />)}
          </Col>
        </Row>
        <Row>
          <Col span={5}>Note(s)/ Terms & Conditions</Col>
          <Col span={19}>
            1. Please send a copy of your invoice. All priced in currency specified above.
            <br />
            2. Entered This order in accordance with the prices and your quotation to us.
            <br />
            3. Please notify us immediately if you are unable to ship/deliver/activate as specified.
            <br />
            4. NRC = Non Recurring Charge
            <br />
            5. OTC = One Time Charge
            <br />
            6. MRC = Monthly Recurring Charge
            <br />
            7. ARC = Annual Recurring Charge
            <br />
          </Col>
        </Row>

        {editData && editData.BankDetails && showBank ? (
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item label="Banking Details:">
                {getFieldDecorator('BankingDetailId', {
                  initialValue: this.state.BankingDetailId,
                  onChange: (value: any) =>
                    this.onSelectChange({ value, fieldName: 'BankingDetailId' }),
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
                    {editData.BankDetails
                      ? editData.BankDetails.map((item: any) => (
                          <Option key={item.code} value={item.code}>
                            {item.BankName} :: {item.BankAddress}
                          </Option>
                        ))
                      : ''}
                  </Select>,
                )}
                {/* <Option value="1">MYT bank :: Malaysia</Option> */}
              </Form.Item>
            </Col>
          </Row>
        ) : (
          ''
        )}

        <Row>
          <Col span={24} className="btn-move-right">
            <Button type="default" onClick={() => changeTabs('1')}>
              <Icon type="left" /> Back
            </Button>
            <Button type="primary" htmlType="submit">
              <Icon type="save" /> Save
            </Button>
            <Button type="default" onClick={() => changeTabs('3')}>
              <Icon type="right" /> Next
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const QuotationDetailForm = Form.create({
  name: 'tab-contact-detail-form',
})((props: any) => {
  // this will be called on every submit
  const onSubmit = (event: any) => {
    const { validateFields, resetFields } = props.form;
    event.preventDefault();
    validateFields((err: any, values: any) => {
      if (!err) {
        props.onSubmit(values);
        // resetFields();
      }
    });
  };
  return <QuotationDetail {...props} onSubmit={onSubmit} />;
});
