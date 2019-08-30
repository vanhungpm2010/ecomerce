import { Button, Spin, Form, Row, Col, Input, Checkbox, Icon, Upload, Cascader } from 'antd';

import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import './index.less';
import 'antd/dist/antd.css';
import { errorMsg } from '@/common/services/highline.corner';
import { namespace } from '../model';
import { formItemLayout } from '@/common/constants/formItemLayout';

const FormItem = Form.Item;
const { TextArea } = Input;

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
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
const residences = [
  {
    value: 'zhejiang',
    label: 'Giày dép & Quần áo nữ',
    children: [
      {
        value: 'hangzhou',
        label: 'Tivi & Viddeo',
        children: [
          {
            value: 'xihu',
            label: 'Tivi & Viddeo',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Máy vi tính & Laptop',
    children: [
      {
        value: 'nanjing',
        label: 'Máy ảnh & Máy bay camera',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Máy ảnh & Máy bay camera',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu1',
    label: 'Điện thoại & Máy tính bảng',
    children: [
      {
        value: 'nanjing1',
        label: 'Đồ chơi',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Đồ chơi',
          },
        ],
      },
    ],
  },
];
const mapStateToProps = (state: any) => {
  const { loading } = state;
  const tmpState = {
    ...state[namespace],
    ...{ loading: loading.effects[`${namespace}/readData`] || false },
    ...{
      submiting:
        loading.effects[`${namespace}/createData`] || loading.effects[`${namespace}/updateData`],
    },
  };
  return tmpState;
};

@connect(mapStateToProps)
class AddSetting extends Component<any, any> {
  state = {
    id: '',
    loading: false,
    imageUrl: '',
  };
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;

    form.validateFields({ force: true }, (err: any, values: any) => {});
  };

  renderKeyPage = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Key', {
      rules: [
        {
          required: true,
          message: 'Please enter your Key page!',
        },
      ],
    })(<Input size="large" placeholder="Home" />);
  };

  renderTitle = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Title', {
      rules: [
        {
          required: false,
        },
      ],
    })(<Input size="large" placeholder="Tiêu đề" />);
  };

  renderEngTitle = () => {
    const { form } = this.props;
    return form.getFieldDecorator('TitleEng', {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <Input size="large" placeholder="Tiêu đề bằng tiếng anh(nếu có)" className="input-bottom" />,
    );
  };

  renderIsActive = () => {
    const { form } = this.props;
    return form.getFieldDecorator('isActive', {
      valuePropName: 'checked',
      rules: [
        {
          required: false,
        },
      ],
    })(<Checkbox />);
  };

  renderDescription = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Description', {
      rules: [
        {
          required: false,
        },
      ],
    })(<TextArea rows={4} placeholder="Miêu tả" />);
  };

  renderEngDescription = () => {
    const { form } = this.props;
    return form.getFieldDecorator('DescriptionEng', {
      rules: [
        {
          required: false,
        },
      ],
    })(<TextArea rows={4} placeholder="Miêu tả bằng tiếng anh(nếu có)" className="input-bottom" />);
  };
  renderParentName = () => {
    const { form } = this.props;
    return form.getFieldDecorator('ParentId', {
      rules: [{ type: 'array', required: false, message: 'Please select parent category!' }],
    })(<Cascader options={residences} changeOnSelect />);
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  render() {
    const { submitting, loading, form } = this.props;
    const { imageUrl } = this.state;
    const { id } = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Spin spinning={loading !== undefined && loading} tip="Loading...">
        <div className={styles.main}>
          <h2>{id ? 'Sửa' : 'Thêm mới'}</h2>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="setting-boder">
            <FormItem label="Nơi hiển thị">{this.renderParentName()}</FormItem>
            <FormItem label="Tiêu đề">
              {this.renderTitle()}
              {this.renderEngTitle()}
            </FormItem>
            <FormItem label="Miêu tả">
              {this.renderDescription()}
              {this.renderEngDescription()}
            </FormItem>
            <Form.Item label="Hiển thị" style={{ textAlign: 'left' }}>
              {this.renderIsActive()}
            </Form.Item>
            <Row>
              <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                <p style={{ textAlign: 'left', color: '#000' }}>Hình ảnh:</p>
              </Col>
              <Col xs={24} sm={24} md={12} lg={6} xl={18}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
            </Row>
            {/* </Form.Item> */}
            {/* <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                style={{ display: 'inline' }}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload> */}

            <Row>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                {id ? 'Update' : 'Thêm mới'}
              </Button>
            </Row>
          </Form>
        </div>
      </Spin>
    );
  }
}

export default Form.create()(AddSetting);
