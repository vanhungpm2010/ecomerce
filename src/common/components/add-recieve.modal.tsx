import React from 'react';
import Form from 'antd/lib/form';
import moment from 'moment';

import { Modal, Row, Col, Input, Button, Table, DatePicker, Icon } from 'antd';
import { dateFormatList, pattern, commonMsg } from '../constants/const.define';

const { TextArea } = Input;

export const AddRecievedAmount = Form.create({ name: 'form_add_modal_step3' })(
  class extends React.Component<any, any> {
    state: any = {
      modalVisible: false,
      data: {},
      sending: false,
      datalist: [],
      isEditing: false,
    };

    componentDidMount() {
      const { datalist } = this.props;
      this.setState({ datalist });
    }

    componentWillReceiveProps(nextProps: any) {
      const { datalist } = nextProps;
      this.setState({ datalist });
    }

    onSubmit = (event: any) => {
      if (event) {
        event.preventDefault();
      }

      const { validateFields, resetFields } = this.props.form;
      const { datalist } = this.state;

      validateFields((err: any, values: any) => {
        if (!err) {
          this.props.onSubmit({ send: values, datalist });
          resetFields();
        }
      });
    };

    closeModal = ({ modalVisible }: any) => {
      const { resetFields } = this.props.form;

      resetFields();
      this.setState({ modalVisible });
    };

    editAction = (rowValue: any) => {
      console.log(this.state.datalist.find((item: any) => Number(rowValue.id) === Number(item.id)));

      this.setState({
        isEditing: true,
        data: this.state.datalist.find((item: any) => Number(rowValue.id) === Number(item.id)),
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const { data, sending } = this.state;

      const { deleteRecieveAction: deleteAction, editRecieveAction } = this.props;

      const inputVal: any = { ...(data || {}) };

      return (
        <div>
          <Button
            type="primary"
            className="btn-green"
            style={{ marginTop: '26px' }}
            size="small"
            onClick={() => this.closeModal({ modalVisible: true })}
          >
            Add Received Amount
          </Button>

          <Modal
            style={{ top: 20 }}
            title="Add Received Amount"
            visible={this.state.modalVisible}
            onCancel={e => this.closeModal({ modalVisible: false })}
            footer={null}
          >
            <Form onSubmit={this.onSubmit}>
              {getFieldDecorator('id', {
                initialValue: inputVal.id,
              })(<Input style={{ display: 'none' }} />)}

              <Row>
                <Col span={12}>
                  <Form.Item label="Amount">
                    {getFieldDecorator('Amounts', {
                      initialValue: inputVal.Amounts,
                      rules: [
                        {
                          required: true,
                          pattern: pattern.str_float,
                          message: commonMsg.validate.number,
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date">
                    {getFieldDecorator('PaymentDate', {
                      initialValue: inputVal.PaymentDate
                        ? moment(new Date(inputVal.PaymentDate), dateFormatList[0])
                        : '',
                      rules: [{ required: true }],
                    })(<DatePicker style={{ width: '100%' }} format={dateFormatList[0]} />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Comments">
                    {getFieldDecorator('Comment', {
                      initialValue: inputVal.Comment,
                    })(<TextArea />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24} className="btn-move-center">
                  <Button type="primary" className="btn-green" htmlType="submit" loading={sending}>
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>

            <Table
              dataSource={this.state.datalist || []}
              rowKey="id"
              columns={[
                {
                  title: 'Action',
                  dataIndex: 'id',
                  key: 'id',
                  render: (value: any, rowValue: any) => (
                    <div>
                      <Icon
                        type="delete"
                        style={{ color: 'blue' }}
                        onClick={() => (deleteAction ? deleteAction(rowValue) : '')}
                      />

                      <Icon
                        type="edit"
                        style={{ color: 'blue' }}
                        onClick={() => this.editAction(rowValue)}
                      />
                    </div>
                  ),
                },
                {
                  title: 'Date',
                  dataIndex: 'PaymentDate',
                  key: 'PaymentDate',
                  render: (value: any) => (value ? moment(value).format(dateFormatList[0]) : ''),
                },
                {
                  title: 'Total Amount',
                  dataIndex: 'Amounts',
                  key: 'Amounts',
                },
                {
                  title: 'Comments',
                  dataIndex: 'Comment',
                  key: 'Comment',
                },
              ]}
            ></Table>
          </Modal>
        </div>
      );
    }
  },
);
