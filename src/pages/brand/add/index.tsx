import { Button, Spin, Form, Input, Row, Upload, Col, Icon } from 'antd';

import React, { Component } from 'react';
import { connect } from 'dva';
import { errorMsg } from '@/common/services/highline.corner';
import styles from './style.less';
import { namespace } from '../model';
import { formItemLayout } from '@/common/constants/formItemLayout';
import { formatLang } from '@/common/constants/const.define';

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
class AddBrand extends Component<any, any> {
  state = {
    id: '',
    imageUrl: '',
    loading: false,
  };
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields({ force: true }, (err: any, values: any) => {
      console.log('values', values);
    });
  };

  renderBrandName = () => {
    const { form } = this.props;
    return form.getFieldDecorator('BrandName', {
      rules: [
        {
          required: true,
          message: 'Please enter your BrandName!',
        },
      ],
    })(<Input size="large" placeholder="Samsung" />);
  };

  renderTitle = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Title', {
      rules: [
        {
          required: false,
        },
      ],
    })(<Input size="large" placeholder={formatLang('component.titleVi.input')} />);
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
      <Input
        size="large"
        placeholder={formatLang('component.titleEng.input')}
        className="input-bottom"
      />,
    );
  };

  renderDescription = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Description', {
      rules: [
        {
          required: false,
        },
      ],
    })(<TextArea rows={4} placeholder={formatLang('component.descriptionVi.input')} />);
  };

  renderEngDescription = () => {
    const { form } = this.props;
    return form.getFieldDecorator('DescriptionEng', {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <TextArea
        rows={4}
        placeholder={formatLang('component.descriptionEng.input')}
        className="input-bottom"
      />,
    );
  };

  renderContent = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Content', {
      rules: [
        {
          required: false,
        },
      ],
    })(<TextArea rows={4} placeholder={formatLang('component.contentVi.input')} />);
  };

  renderEngContent = () => {
    const { form } = this.props;
    return form.getFieldDecorator('ContentEng', {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <TextArea
        rows={4}
        placeholder={formatLang('component.contentEng.input')}
        className="input-bottom"
      />,
    );
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
    const { submitting, loading } = this.props;
    const { id, imageUrl } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Spin spinning={loading !== undefined && loading} tip="Loading...">
        <div className={styles.main}>
          <h2>
            {id
              ? formatLang('component.submit-update.button')
              : formatLang('component.submit-add.button')}
          </h2>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="setting-boder">
            <FormItem label={formatLang('component.brand.label')}>
              {this.renderBrandName()}
            </FormItem>
            <FormItem label={formatLang('component.title.label')}>
              {this.renderTitle()}
              {this.renderEngTitle()}
            </FormItem>
            <FormItem label={formatLang('component.content.label')}>
              {this.renderContent()}
              {this.renderEngContent()}
            </FormItem>
            <FormItem label={formatLang('component.description.label')}>
              {this.renderDescription()}
              {this.renderEngDescription()}
            </FormItem>
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
            <FormItem label=" ">
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                {id
                  ? formatLang('component.submit-update.button')
                  : formatLang('component.submit-add.button')}
              </Button>
            </FormItem>
          </Form>
        </div>
      </Spin>
    );
  }
}

export default Form.create()(AddBrand);
