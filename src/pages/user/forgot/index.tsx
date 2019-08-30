import { Button, Col, Form, Input, Row } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import React from 'react';
import styles from './style.less';
import request from '@/common/services/CMRequest';

const FormItem = Form.Item;

export default Form.create({ name: 'forgot' })((props: any) => {
  const { form } = props;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields({ force: true }, (err: any, values: any) => {
      if (!err) {
        request('/user/reset', {
          method: 'POST',
          data: { ...values },
        })
          .then((res: any) => {
            if (res.status === 'ok') {
              router.push('/result/success');
            } else {
              router.push('/result/fail');
            }
          })
          .catch(() => {
            router.push('/result/fail');
          });
      }
    });
  };

  return (
    <div className={styles.main}>
      <h3 style={{ padding: '16px 0px' }}>Please Enter Your Email Address.</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Item label="">
            {form.getFieldDecorator('Email', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your email address',
                },
                {
                  type: 'email',
                  message: 'The email address is invalid!',
                },
              ],
            })(<Input size="large" placeholder="email@gmail.com" />)}
          </Form.Item>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem>
              <Link to="/user/login">Back</Link>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem style={{ float: 'right' }}>
              <Button size="large" type="primary" htmlType="submit">
                Reset Password
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
});
