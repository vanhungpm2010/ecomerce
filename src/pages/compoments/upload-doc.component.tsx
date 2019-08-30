import { Row, Col, Form, Input, Button, Upload, Icon } from 'antd';
import React from 'react';

export const UploadDocComponent = () => {
  const uploading = false;
  let fileList: any = [];

  const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      fileList = newFileList;
    },
    beforeUpload: (file: any) => {
      fileList = [file];

      return false;
    },
    fileList,
  };

  const dataValue: any = {};
  const onChangeAction = (e: any) => console.log('onchange doc', e);
  const onAddAction = (e: any) => console.log('onchange doc', e);

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={12} xl={4}>
        <Form.Item label="Document Type:">
          <Input
            name="documentType"
            value={dataValue.documentType}
            onChange={onChangeAction}
            placeholder="Document Type"
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={4}>
        <Form.Item label="Document Name:">
          <Input
            name="documentName"
            value={dataValue.documentName}
            onChange={onChangeAction}
            placeholder="Document Name"
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Form.Item label="Upload File">
          <Button
            style={{ marginRight: '5px' }}
            type="primary"
            onClick={onChangeAction}
            disabled={fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>

          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </Form.Item>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={4}>
        <Form.Item label="Action">
          <Button type="primary" onClick={onAddAction}>
            Add
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );
};
