// import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import { Button, Spin } from 'antd';
import Link from 'umi/link';
import React from 'react';
import Result from './Result';
import styles from './style.less';
import { userActivation } from '../service';

const actions = (
  <div className={styles.actions}>
    {/* <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="user-register-result.register-result.view-mailbox" />
      </Button>
    </a> */}
    <Link to="/user/login">
      <Button size="large">Go To Login</Button>
    </Link>
  </div>
);

interface ActivationProps {
  location: any;
}

interface ActivationState {
  success: boolean;
  loading: boolean;
  message: string;
}

class RegisterResult extends React.Component<ActivationProps, ActivationState> {
  state = {
    success: true,
    loading: true,
    message: '',
  };

  componentDidMount() {
    const { search } = window.location;
    if (!search) {
      this.setState({ loading: false, success: false, message: 'Unknown User' });
    }
    const [, id] = search.split('=');
    if (!id) {
      this.setState({ loading: false, success: false, message: `Unknown User with id: ${id}` });
    }

    userActivation(id)
      .then(res => {
        if (res.status === 'ok') {
          this.setState({ loading: false, success: true, message: res.message });
        } else {
          this.setState({
            loading: false,
            success: false,
            message: res.message || 'Sorry! There are some unknown error.',
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          success: false,
          message: err.message || 'Sorry! There are some unknown error.',
        });
      });
  }

  render() {
    const { loading, success, message } = this.state;
    return (
      <Spin spinning={loading !== undefined && loading} tip="Loading...">
        <Result
          className={styles.registerResult}
          type={success ? 'success' : 'error'}
          title={
            <div className={styles.title}>
              <h1>{`User activation ${success ? 'success' : 'error'}!`}</h1>
            </div>
          }
          description={message}
          actions={actions}
          style={{ marginTop: 56 }}
        />
      </Spin>
    );
  }
}

export default RegisterResult;
