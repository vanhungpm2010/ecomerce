import {
  Button,
  Spin,
  Form,
  Row,
  Col,
  Input,
  Popover,
  Icon,
  Upload,
  DatePicker,
  Progress,
} from 'antd';

import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import styles from './style.less';
import moment from 'moment';
import './index.less';
import 'antd/dist/antd.css';
import { errorMsg } from '@/common/services/highline.corner';
import { namespace } from '../model';
import { formItemLayout } from '@/common/constants/formItemLayout';
import { dateFormatList, formatLang } from '@/common/constants/const.define';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: <div className={styles.success}>Strength: strong</div>,
  pass: <div className={styles.warning}>Strength: medium</div>,
  poor: <div className={styles.error}>Strength: too short</div>,
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const mapStateToProps = (state: any) => {
  const { loading } = state;
  console.log(state);
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
    help: '',
    id: '',
    loading: false,
    imageUrl: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.location.query;
    if (id) {
      this.setState({ id });
      dispatch({
        type: `${namespace}/readData`,
        payload: { id },
      }).then(() => {
        const { form, addInfo } = this.props;
        if (addInfo) {
          this.setState({ imageUrl: addInfo.Avatar });
          form.setFieldsValue({
            Address: addInfo.Address,
            BirthDate: moment(addInfo.BirthDate) || null,
            FullName: addInfo.FullName,
            PhoneNumber: addInfo.PhoneNumber,
            UserName: addInfo.UserName,
            Email: addInfo.Email,
          });
        }
      });
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch, addInfo } = this.props;
    const { id, imageUrl } = this.state;
    form.validateFields({ force: true }, (err: any, values: any) => {
      if (!err) {
        // const date = values.BirthDate.format(dateFormatList[3]) || null;

        const data = { ...addInfo, ...values, UserRole: 1, Avatar: imageUrl };
        dispatch({
          type: id ? `${namespace}/updateData` : `${namespace}/createData`,
          payload: { id, body: data },
        }).then((res: any) => {
          console.log(res);
        });

        router.push({
          pathname: '/userManage/register-result',
          state: { email: values.Email },
        });
      }
    });
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('Password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  renderUserName = () => {
    const { form } = this.props;
    return form.getFieldDecorator('UserName', {
      rules: [
        {
          required: true,
          message: 'Please enter Username!',
        },
      ],
    })(<Input size="large" placeholder="Admin" />);
  };

  renderFullName = () => {
    const { form } = this.props;
    return form.getFieldDecorator('FullName', {
      rules: [
        {
          required: false,
        },
      ],
    })(<Input size="large" placeholder="John" />);
  };

  renderPassword = () => {
    const { form } = this.props;
    // const { id } = this.state;

    return (
      <Popover
        getPopupContainer={node => {
          if (node && node.parentNode) {
            return node.parentNode as HTMLElement;
          }
          return node;
        }}
        trigger="focus"
        content={
          <div style={{ padding: '4px 0' }}>
            {passwordStatusMap[this.getPasswordStatus()]}
            {this.renderPasswordProgress()}
            <div style={{ marginTop: 10 }}>
              Please enter at least 6 characters and do not use passwords that are easy to guess.
            </div>
          </div>
        }
        overlayStyle={{ width: 240 }}
        placement="bottom"
      >
        {form.getFieldDecorator('Password', {
          rules: [
            {
              required: true,
              validator: this.checkPassword,
            },
          ],
        })(<Input size="large" type="password" placeholder="password" />)}
      </Popover>
    );
  };

  renderConfirm = () => {
    const { form } = this.props;
    const { id } = this.state;
    return form.getFieldDecorator('Confirm', {
      rules: [
        {
          required: !id,
          message: 'Please confirm your password!',
        },
        {
          validator: this.checkConfirm,
        },
      ],
    })(<Input size="large" type="password" placeholder="Password confirm" />);
  };
  checkConfirm = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('Password')) {
      callback('The passwords entered twice do not match!');
    } else {
      callback();
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={Math.round(value.length * 10 > 100 ? 100 : value.length * 10)}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  checkPassword = (rule: any, value: string, callback: (messgae?: string) => void) => {
    if (!value) {
      this.setState({
        help: 'Please enter your password!',
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (value.length < 6) {
        callback('error');
      } else {
        callback();
      }
    }
  };

  renderEmail = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Email', {
      rules: [
        {
          required: true,
          message: 'Please enter Email !!',
        },
      ],
    })(<Input type="email" size="large" placeholder="example@gmail.com" />);
  };

  renderPhoneNumber = () => {
    const { form } = this.props;
    return form.getFieldDecorator('PhoneNumber', {
      rules: [
        {
          required: false,
        },
      ],
    })(<Input size="large" placeholder="012345678" />);
  };

  renderAddress = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Address', {
      rules: [
        {
          required: false,
        },
      ],
    })(<Input size="large" placeholder="HCM city" />);
  };

  renderBirthDate = () => {
    const { form } = this.props;
    return form.getFieldDecorator('BirthDate', {
      rules: [
        {
          required: false,
        },
      ],
    })(<DatePicker format={dateFormatList[3]} size="large" style={{ width: '100%' }} />);
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { Avatar } = this.props.addInfo;

      this.setState({
        imageUrl: Avatar,
        loading: false,
      });
    }
  };
  beforeUpload = (file: any) => {
    const { dispatch } = this.props;

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      errorMsg({ msg: 'You can only upload JPG/PNG file!' });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMsg({ msg: 'Image must smaller than 2MB!' });
    } else {
      dispatch({ type: `${namespace}/uploadFile`, payload: file });
    }
    return isJpgOrPng && isLt2M;
  };

  render() {
    const { submitting, loading } = this.props;
    const { imageUrl, id, help } = this.state;

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
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem label={formatLang('component.UserName.label')}>
                  {this.renderUserName()}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem label="Email">{this.renderEmail()}</FormItem>
                {/* <FormItem label={formatLang('component.UserType.label')}>{this.renderUserRole()}</FormItem> */}
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem label={formatLang('component.Password.label')} help={help}>
                  {this.renderPassword()}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem label={formatLang('component.ConfirmPassword.label')}>
                  {this.renderConfirm()}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem label={formatLang('component.FullName.label')}>
                  {this.renderFullName()}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem label={formatLang('component.PhoneNumber.label')}>
                  {this.renderPhoneNumber()}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem label={formatLang('component.Address.label')}>
                  {this.renderAddress()}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem label={formatLang('component.BirthDate.label')}>
                  {this.renderBirthDate()}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xs={5} sm={6} md={3} lg={3} xl={3}>
                <p style={{ textAlign: 'left', color: '#000' }}>
                  {formatLang('component.image.label')}
                </p>
              </Col>
              <Col xs={19} sm={18} md={21} lg={21} xl={21}>
                {/* <FormItem label={formatLang('component.image.label')}>
                 */}
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
                {/* </FormItem> */}
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
