import React, { Component } from 'react';

import { Alert } from 'antd';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from './model';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit } = LoginComponents;
interface LoginProps {
  dispatch: Dispatch<any>;
  userLogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
}
export interface FromDataType {
  UserName: string;
  Password: string;
  mobile: string;
  captcha: string;
}

@connect(
  ({
    userLogin,
    loading,
  }: {
    userLogin: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userLogin,
    submitting: loading.effects['userLogin/login'],
  }),
)
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
  };

  // Login User then select Company
  handleLogin = (err: any, values: FromDataType) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/login',
        payload: {
          ...values,
        },
      });
    }
  };

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onSubmit={this.handleLogin}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="Login">
            {status !== 'ok' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage('Invalid username or password')}
            <UserName
              name="UserName"
              placeholder="Your user name here."
              rules={[
                {
                  required: true,
                  message: 'Please enter your user name!',
                },
              ]}
            />
            <Password
              name="Password"
              placeholder="Your password here."
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
              ]}
              onPressEnter={() => this.loginForm && this.loginForm.validateFields(this.handleLogin)}
            />
          </Tab>
          <Submit loading={submitting}>Login</Submit>
          <div>
            <a style={{ float: 'right' }} href="../user/forgot">
              Forgot your password?
            </a>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
