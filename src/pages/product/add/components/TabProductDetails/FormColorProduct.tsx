import React from 'react';
import { Form, Row, Col, Icon, Select, Upload, Modal } from 'antd';
import { errorMsg } from '@/common/services/highline.corner';

const { Option } = Select;

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    errorMsg({ msg: 'You can only upload JPG/PNG file!' });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    errorMsg({ msg: 'Image must smaller than 2MB!' });
  }
  return isJpgOrPng && isLt2M;
}

export default class ColorProduct extends React.Component<any, any> {
  state: any = {
    fileList: [],
    previewVisible: false,
    previewImage: '',
    loading: false,
  };

  handleCancel = () => this.setState({ previewVisible: false });

  // handlePreview = async (file: any) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //   });
  // };

  handleChange = (info: any) => {
    const { fileList } = info;

    if (info.file.status === 'uploading' || info.file.status === 'removed') {
      this.setState({ loading: true, fileList });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false,
      });
    }
  };
  render() {
    const { fileList, previewVisible, previewImage } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const colors = [
      {
        id: 1,
        colorName: 'Màu cherry',
      },
      {
        id: 2,
        colorName: 'Màu ngân hà',
      },
      {
        id: 3,
        colorName: 'Màu xanh dương',
      },
      {
        id: 4,
        colorName: 'Trái xoài',
      },
      {
        id: 5,
        colorName: 'Màu xanh lá',
      },
      {
        id: 6,
        colorName: 'Màu dạ quang',
      },
    ];
    return (
      <Form className="setting-boder">
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Nhóm màu:">
              <Select>
                {colors.map((item: any) => {
                  return (
                    <Option key={item.id} value={item.colorName}>
                      {item.colorName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Upload
            multiple={true}
            name="avatar"
            listType="picture-card"
            fileList={fileList}
            // onPreview={this.handlePreview}
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            style={{ display: 'inline' }}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Row>
      </Form>
    );
  }
}
