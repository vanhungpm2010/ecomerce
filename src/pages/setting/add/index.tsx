import { Button, Spin, Form, Row, Col, Input, Icon, Upload } from 'antd';

import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import styles from './style.less';
import './index.less';
import 'antd/dist/antd.css';
import { errorMsg } from '@/common/services/highline.corner';
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
  console.log('tmpState', tmpState);
  return tmpState;
};

@connect(mapStateToProps)
class AddSetting extends Component<any, any> {
  state = {
    addInfo: '',
    loading: false,
    imageUrl: '',
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch, addInfo } = this.props;
    const { id } = this.props.location.query;

    form.validateFields({ force: true }, (err: any, values: any) => {
      if (!err) {
        const data = { ...addInfo, ...values };
        dispatch({
          type: id ? `${namespace}/updateData` : `${namespace}/createData`,
          payload: { id, body: data },
        }).then(() => {
          router.push({ pathname: '/setting/list' });
        });
      }
    });
  };
  componentDidMount() {
    this.resetModel();
    this.fetch();
  }
  fetch = () => {
    const { id } = this.props.location.query;
    const { dispatch, form } = this.props;

    if (id) {
      dispatch({ type: `${namespace}/readData`, payload: { id } }).then((addInfo: any) => {
        form.setFieldsValue({
          key: addInfo.key,
          titleVi: addInfo.titleVi,
          titleEn: addInfo.titleEn,
          descriptionVi: addInfo.descriptionVi,
          descriptionEn: addInfo.descriptionEn,
          image: addInfo.image,
        });
        this.setState({
          imageUrl: addInfo.image,
          loading: false,
        });
      });
    }
  };

  resetModel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/resetModelData`,
    });
  };

  renderKeyPage = () => {
    const { form } = this.props;
    return form.getFieldDecorator('key', {
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
    return form.getFieldDecorator('titleVi', {
      rules: [
        {
          required: false,
        },
      ],
    })(<Input size="large" placeholder={formatLang('component.titleVi.input')} />);
  };

  renderEngTitle = () => {
    const { form } = this.props;
    return form.getFieldDecorator('titleEn', {
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
    return form.getFieldDecorator('descriptionVi', {
      rules: [
        {
          required: false,
        },
      ],
    })(<TextArea rows={4} placeholder={formatLang('component.descriptionVi.input')} />);
  };

  renderEngDescription = () => {
    const { form } = this.props;
    return form.getFieldDecorator('descriptionEn', {
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

  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  beforeUpload = (file: any) => {
    const { dispatch } = this.props;

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt1M = file.size / 1024 / 1024 < 1;

    if (!isJpgOrPng || !isLt1M) {
      errorMsg({
        msg:
          'You can only upload JPG/PNG file and must smaller than 1MB, should be in JPG format !!',
      });
    } else {
      dispatch({ type: `${namespace}/uploadFile`, payload: file });
    }

    return isJpgOrPng && isLt1M;
  };

  render() {
    const { submitting, loading } = this.props;
    const { id } = this.props.location.query;
    const { imageUrl } = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
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
            <FormItem label="Key page">{this.renderKeyPage()}</FormItem>
            <FormItem label={formatLang('component.title.label')}>
              {this.renderTitle()}
              {this.renderEngTitle()}
            </FormItem>
            <FormItem label={formatLang('component.description.label')}>
              {this.renderDescription()}
              {this.renderEngDescription()}
            </FormItem>
            <Row>
              <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                <p style={{ textAlign: 'left', color: '#000' }}>
                  {formatLang('component.image.label')}
                </p>
              </Col>
              <Col xs={24} sm={24} md={12} lg={6} xl={18}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
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

            <Row>
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
            </Row>
          </Form>
        </div>
      </Spin>
    );
  }
}

export default Form.create()(AddSetting);
