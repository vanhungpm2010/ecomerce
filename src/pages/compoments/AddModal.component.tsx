import React from 'react';
import Form from 'antd/lib/form';
import { Modal, Row, Col, Input, Button, Icon } from 'antd';
import { pattern, commonMsg } from '@/common/constants/const.define';

const { TextArea } = Input;

export const AddModalForm = Form.create({ name: 'form_add_modal_step3' })(
  class extends React.Component<any, any> {
    state: any = {
      modalVisible: false,
      data: {},
    };

    componentWillReceiveProps(nextProps: any) {
      const { data } = nextProps;
      if (data && data.id) {
        this.setState({ data, modalVisible: true });
      } else {
        this.setState({ data });
      }
    }

    onSubmit = (event: any) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      const { form, addToList } = this.props;
      form.validateFields((err: any, values: any) => {
        if (err) {
          return;
        }

        addToList(values);
        form.resetFields();

        this.closeModal({ modalVisible: false });
      });
    };

    closeModal = ({ modalVisible }: any) => {
      const { resetFields } = this.props.form;
      const { addToList, action } = this.props;

      addToList(null);

      this.setState({ modalVisible }, () => {
        action({ action: 'end-edit' });
        resetFields();
      });
    };

    render() {
      const { section } = this.props;
      const { getFieldDecorator } = this.props.form;
      const { data } = this.state;
      const inputVal: any = { ...(data || {}) };

      return (
        <div>
          <Button
            type="primary"
            style={{ marginBottom: '10px' }}
            onClick={() => this.closeModal({ modalVisible: true })}
          >
            <Icon type="plus" /> Add
          </Button>

          <Modal
            title="Proposal for:"
            centered
            visible={this.state.modalVisible}
            // onOk={this.handleOk}
            onCancel={e => this.closeModal({ modalVisible: false })}
            footer={null}
          >
            <Form onSubmit={this.onSubmit}>
              {getFieldDecorator('id', {
                initialValue: inputVal.id,
                rules: [{ required: false }],
              })(<Input name="id" style={{ display: 'none' }} />)}

              {section === 'vendorPO' ? (
                <Row>
                  <Col span={24}>
                    <Form.Item label="CID">
                      {getFieldDecorator('CID', {
                        initialValue: inputVal.CID,
                        rules: [{ required: true }],
                      })(<Input />)}
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                ''
              )}

              <Row>
                <Col span={24}>
                  <Form.Item label="Description:">
                    {getFieldDecorator('Description', {
                      initialValue: inputVal.Description,
                      rules: [{ required: true }],
                    })(
                      <TextArea
                        name="Description"
                        placeholder=""
                        autosize={{ minRows: 4, maxRows: 8 }}
                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Bandwidth/ Part No:">
                    {getFieldDecorator('PartNo', {
                      initialValue: inputVal.PartNo,
                      rules: [
                        {
                          required: false,
                          pattern: pattern.float,
                          message: commonMsg.validate.number,
                        },
                      ],
                    })(<Input name="PartNo" placeholder="Bandwidth/ Part No" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                  <Form.Item label="Capacity:" style={{ paddingRight: '10px' }}>
                    {getFieldDecorator('Capacity', {
                      initialValue: inputVal.Capacity,
                      rules: [
                        {
                          pattern: pattern.float,
                          message: `${commonMsg.validate.isRequire} ${commonMsg.validate.number}`,
                        },
                      ],
                    })(<Input name="Capacity" placeholder="Capacity" />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <Form.Item label="Qty:">
                    {getFieldDecorator('Quantity', {
                      initialValue: inputVal.Quantity,
                      rules: [
                        {
                          required: true,
                          pattern: pattern.float,
                          message: `${commonMsg.validate.isRequire} ${commonMsg.validate.number}`,
                        },
                      ],
                    })(<Input name="Quantity" placeholder="Qty" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  <Form.Item label="NRC" style={{ paddingRight: '10px' }}>
                    {getFieldDecorator('NRCCharge', {
                      initialValue: inputVal.NRCCharge,
                      rules: [
                        {
                          pattern: pattern.float,
                          message: commonMsg.validate.number,
                        },
                      ],
                    })(<Input name="NRCCharge" placeholder="NRCCharge" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="MRC" style={{ paddingRight: '10px' }}>
                    {getFieldDecorator('MRCCharge', {
                      initialValue: inputVal.MRCCharge,
                      rules: [
                        {
                          pattern: pattern.float,
                          message: commonMsg.validate.number,
                        },
                      ],
                    })(<Input name="MRCCharge" placeholder="MRCCharge" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="ARC">
                    {getFieldDecorator('ARCCharge', {
                      initialValue: inputVal.ARCCharge,
                      rules: [
                        {
                          pattern: pattern.float,
                          message: commonMsg.validate.number,
                        },
                      ],
                    })(<Input name="ARCCharge" placeholder="ARCCharge" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24} className="btn-move-right">
                  <Button type="default" onClick={() => this.closeModal({ modalVisible: false })}>
                    <Icon type="close" /> Close
                  </Button>
                  <Button type="primary" htmlType="submit">
                    <Icon type="plus-circle" /> Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
      );
    }
  },
);
