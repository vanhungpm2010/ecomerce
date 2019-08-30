import React from 'react';
import { Table, Form, Row, Col, Input, Button, Upload, Icon } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { docColumns } from './const.define';

const InputGroup = Input.Group;

class DocumentDetail extends React.Component<any, any> {
  state = {
    fileList: [],
    uploading: false,
    inputVal: {},
    data: [],
    docName: '',
  };

  handelChange = (e: any) => {
    const { name: key, value } = e.target;

    this.setState(({ inputVal }: any) => {
      const tmpInput = { ...inputVal };
      tmpInput[key] = value;
      return { inputVal: tmpInput };
    });
  };

  onChange = (e: any) => {
    const { value } = e.target;
    this.setState({ docName: value });
  };

  handelAdd = () => {
    this.setState({ data: [...this.state.data, this.state.inputVal], inputVal: {} });
  };

  editDocAction = (rowValue: any) => {
    alert('edti doc');
  };

  removeDocAction = (id: string) => {
    const { updateModel, addInfo } = this.props;

    const cpyInfo = { ...addInfo };
    cpyInfo.CustomerQuotationDocuments = (cpyInfo.CustomerQuotationDocuments || []).filter(
      (item: any) => item.id !== id,
    );
    updateModel({ addInfo: cpyInfo });
  };

  previewDocAction = (rowValue: any) => {
    window.open(rowValue.FileName, 'myWindow', 'width=800,height=600');
  };

  onSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
    }

    const { onSubmit, addInfo } = this.props;
    if (onSubmit) {
      onSubmit((addInfo || {}).CustomerQuotationDocuments || []);
    }
  };

  render() {
    const columnsProps = {
      editAction: this.editDocAction,
      deleteAction: this.removeDocAction,
      preview: this.previewDocAction,
    };

    const { addInfo: data, changeTabs } = this.props;
    const addInfo = data || {};

    const propsUpload = {
      action: '',
      onRemove: (file: UploadFile) => {
        const { fileList } = this.props;

        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);

        this.props.updateModel({ fileList: newFileList });
      },
      beforeUpload: (file: UploadFile) => {
        this.props.updateModel({ fileList: [file] });
        return false;
      },
      fileList: this.props.fileList,
    };

    console.log(addInfo);

    return (
      <Form onSubmit={this.onSubmit}>
        <h1 style={{ color: 'blue' }}>If Any/ Network Diagram/ Additional Information:</h1>
        <Table
          dataSource={addInfo.CustomerQuotationDocuments || []}
          columns={docColumns(columnsProps)}
          rowKey="id"
        ></Table>

        <Row style={{ marginTop: '5px' }}>
          <Col span={6}>
            <Upload {...propsUpload}>
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
          </Col>
          <Col span={18}>
            <InputGroup compact>
              <Input
                placeholder="Document Name"
                onChange={this.onChange}
                style={{ width: '80%', marginTop: 0 }}
              />
              <Button
                style={{ width: '20%' }}
                type="primary"
                onClick={() => this.props.handleUpload({ docName: this.state.docName })}
                disabled={this.props.fileList ? this.props.fileList.length === 0 : true}
                loading={this.props.uploadingDoc}
              >
                {this.props.uploadingDoc ? 'Uploading' : 'Upload & Add'}
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="btn-move-right">
            <Button type="default" onClick={() => changeTabs('3')}>
              <Icon type="left" /> Back
            </Button>
            <Button htmlType="submit" type="primary">
              <Icon type="save" /> Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const DocumentDetailForm = Form.create({
  name: 'tab-document-detail-form',
})((props: any) => <DocumentDetail {...props} onSubmit={props.onSubmit} />);
