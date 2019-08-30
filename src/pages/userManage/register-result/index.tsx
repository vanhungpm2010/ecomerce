import { Button } from 'antd';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
// import { RouteChildrenProps } from 'react-router';
import Result from './Result';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        View mailbox
      </Button>
    </a>
    <Link to="/">
      <Button size="large">Back to home</Button>
    </Link>
  </div>
);

interface ResultProps {
  location: any;
  dispatch: any;
}

@connect()
class RegisterResult extends React.PureComponent<ResultProps> {
  render() {
    const { state } = this.props.location;
    return (
      <Result
        className={styles.registerResult}
        type="success"
        title={
          <div className={styles.title}>
            {`Account：registered at ${state ? state.email : 'Unknown'}`}
          </div>
        }
        description="The activation email has been sent to your email address and is valid for 24 hours. Please log in to the email in time and click on the link in the email to activate the account."
        actions={actions}
        style={{ marginTop: 56 }}
      />
    );
  }
}

export default RegisterResult;
