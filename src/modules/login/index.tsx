import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { useHistory } from 'react-router';

import { useUserInfo } from 'hooks/user-info';
import './index.scss';

const Login = (): JSX.Element => {
  const history = useHistory();
  const { onLogin } = useUserInfo();

  const onFinish = async ({ password, username }: Iobject) => {
    onLogin(password, username);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Card
        bordered={false}
        style={{
          width: '400px',
          margin: 'auto',
          borderRadius: '10px',
          boxShadow:
            '0 4px 8px -4px rgba(0,0,0,.13), 0 6px 16px 0 rgba(0,0,0,.08), 0 12px 24px 16px rgba(0,0,0,.04)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          「班级管理系统」
        </div>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name='username' rules={[{ required: true, message: '请输入账户名' }]}>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='请输入账户名'
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='请输入密码'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <a className='login-form-forgot' href=''>
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
