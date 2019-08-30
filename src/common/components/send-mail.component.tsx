import React from 'react';
import Form from 'antd/lib/form';

import 'react-quill/dist/quill.snow.css'; // ES6

import { Modal, Row, Col, Input, Button, Icon, Upload } from 'antd';
import Editor from './editor.component';
import { BASE_URL, UploadedFolderType } from '@/common/constants/const.define';
import { getToken } from '@/utils/authority';
import { getCompanyId } from '@/utils/utils';
import { successMsg, errorMsg } from '@/common/services/highline.corner';
import { sendEmail } from './services';

import('@/pages/setting-term-condition/index.less');

const emailFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

interface EmailData {
  from: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
  invoiceNumber: string;
}

const uploadProps = {
  action: `${BASE_URL}/upload`,
  headers: {},
  data: { folderType: null },
  multiple: true,
  name: 'filePost',
};

export const SendEmailModalForm: any = Form.create({ name: 'form_add_modal_step3' })(
  class extends React.Component<any, any> {
    state: any = {
      modalVisible: false,
      data: {},
      sending: false,
    };

    componentDidMount() {
      const { folderType, pathPDF } = this.props;
      const Authorization = getToken();
      const CompanyId = getCompanyId();
      uploadProps.headers = {
        Authorization,
        CompanyId,
      };
      uploadProps.data = {
        folderType,
      };
    }

    componentWillReceiveProps(nextProps: any) {
      const { data } = nextProps;
      if (data && data.id) {
        this.setState({ data, modalVisible: true });
      }
    }

    onSubmit = (event: any) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      const { form } = this.props;
      form.validateFields((err: any, values: any) => {
        if (err) {
          return;
        }
        const { fileAttach } = values;
        const files: any = [];
        if (fileAttach) {
          fileAttach.forEach((file: any) => {
            if (file.response && file.response.status === 'ok') {
              const { data } = file.response;
              files.push(data.fileName);
            }
          });
        }
        this.setState({ sending: true });
        const params = {
          from: values.from,
          to: values.to,
          cc: values.cc,
          bcc: values.bcc,
          subject: values.subject,
          body: this.state.body,
          attachs: files,
          id: this.props.id,
          Rev: this.props.Rev,
          pathParent: this.props.pathParent,
          pathChild: this.props.pathChild,
        };
        sendEmail(params)
          .then(res => {
            this.setState({ sending: false });
            if (res.status === 'ok') {
              successMsg({ msg: res.message });
              form.resetFields();
            } else {
              errorMsg({ msg: res.message });
            }
          })
          .catch(error => {
            this.setState({ sending: false });
            errorMsg({ msg: error.message });
          });
      });
    };

    closeModal = ({ modalVisible }: any) => {
      const { resetFields } = this.props.form;

      resetFields();
      this.setState({ modalVisible });
    };

    normFile = (e: any) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };

    handleChangeBody = (value: any) => {
      console.log('value; ', value);
      this.setState({ body: value });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const { data, sending } = this.state;

      const inputVal: EmailData = { ...(data || {}) };

      if (inputVal && !inputVal.from) {
        inputVal.from = 'johndoe@bruhaas.com';
      }

      return (
        <div>
          <Button
            type="primary"
            size="small"
            // style={{ marginBottom: '10px' }}
            onClick={() => this.closeModal({ modalVisible: true })}
          >
            <Icon type="mail" /> Send Email
          </Button>

          <Modal
            style={{ top: 20 }}
            width="80vw"
            title="Send Email"
            visible={this.state.modalVisible}
            onCancel={e => this.closeModal({ modalVisible: false })}
            footer={null}
          >
            <Form onSubmit={this.onSubmit} {...emailFormItemLayout}>
              <Row>
                <Col span={24}>
                  <Form.Item label="From:">
                    {getFieldDecorator('from', {
                      initialValue: inputVal.from,
                      rules: [{ required: false }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="To:">
                    {getFieldDecorator('to', {
                      initialValue: inputVal.to,
                      rules: [{ required: false }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="CC:">
                    {getFieldDecorator('cc', {
                      initialValue: inputVal.cc,
                      rules: [{ required: false }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="BCC:">
                    {getFieldDecorator('bcc', {
                      initialValue: inputVal.bcc,
                      rules: [{ required: false }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Subject:">
                    {getFieldDecorator('subject', {
                      initialValue: inputVal.subject,
                      rules: [{ required: false }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Body:">
                    {/* {getFieldDecorator('body', {
                      initialValue: inputVal.body,
                      rules: [{ required: false }],
                    })( */}
                    <Editor
                      value={this.state.body}
                      handleChange={this.handleChangeBody}
                      placeholder="Write something..."
                    />
                    {/* )} */}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Attachment">
                    {getFieldDecorator('fileAttach', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload name="Attachment" {...uploadProps}>
                        <Button>
                          <Icon type="upload" /> Click to upload
                        </Button>
                      </Upload>,
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24} className="btn-move-right">
                  <Button type="default" onClick={() => this.closeModal({ modalVisible: false })}>
                    <Icon type="close" /> Close
                  </Button>
                  <Button type="primary" htmlType="submit" loading={sending}>
                    <Icon type="mail" /> Send
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
